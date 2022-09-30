import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostClient, NhostNextProvider } from "@nhost/nextjs";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
