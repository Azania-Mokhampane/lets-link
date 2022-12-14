import { useAuthenticationStatus } from "@nhost/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import NavBar from "../components/NavBar";

const About = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthenticationStatus();

  if (!isAuthenticated) {
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Let&apos;s Link | About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </>
  );
};

export default About;
