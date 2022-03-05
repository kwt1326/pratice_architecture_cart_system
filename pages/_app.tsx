import { AppProps } from 'next/app';
import { Fragment } from 'react';
import Header from '../components/Header';
import '../styles/globals.scss'

export const prefix =
  process.env.NODE_ENV === "production"
    ? "https://kwt1326.github.io/pratice_architecture_cart_system"
    : "";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} prefix={prefix} />
    </Fragment>
  )
}

export default MyApp
