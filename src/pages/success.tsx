import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import camisetaLogo from "../assets/camisa01.png.png";
import Head from "next/head";

export default function Success() {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop </title>   
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <img src={camisetaLogo.src} width={200} height={180} alt="" />
        </ImageContainer>
        <p>
          Uhuul <strong>Neto Resende</strong>, sua <strong>Camiseta</strong> já
          está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}
