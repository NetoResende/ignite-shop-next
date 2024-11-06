import type { AppProps } from "next/app";
import { Globalstyles } from "../styles/global";

import Image from "next/image";
import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app";


Globalstyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <a href="/">
         <Image src={logoImg} alt=""/>
        </a>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
