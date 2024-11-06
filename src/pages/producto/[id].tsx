import {
  ImagectContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import Image from "next/image";
import imageImg from "../../assets/camisa01.png.png";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

interface ProductProsp {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
}
interface ProductProspType {
  product: ProductProsp;
}
export default function Producto({ product }: ProductProspType) {
  function handlerBayProduct() {
    console.log(product.defaultPriceId);
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop </title>
      </Head>
      <ProductContainer>
        <ImagectContainer>
          <Image src={imageImg} alt="" />
        </ImagectContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button onClick={handlerBayProduct}>
            <a href="/success">Comprar agora</a>
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_R7s4f1zjcfRmjr" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}: any) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pr-BR", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};
