import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/LandingPage";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Let&apos;s Link | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="w-100 relative h-full bg-cover bg-center bg-no-repeat bg-[url('/hero.svg')]"
        style={{ height: "100vh" }}
      >
        <NavBar />
        <LandingPage />
      </div>
    </>
  );
};

export default Home;
