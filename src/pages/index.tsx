import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";

export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
    <Head>
      <title>Home | Ignite Shop </title>
    </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((porduct) => {
          return (
            <Link href={`/producto/${porduct.id}`} key={porduct.id}>
              <Product className="keenn-slider__slide">
                <Image src={porduct.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{porduct.name}</strong>
                  <span>{porduct.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pr-BR", {
        style: "currency",
        currency: "BRL",
      }).format(((price.unit_amount as number) / 100) as number),
    };
  });
  return {
    props: {
      products,
    },
  };
};
