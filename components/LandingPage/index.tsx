import { Button, Container, Image, Spacer, Text } from "@nextui-org/react";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-4 h-70 py-20 md:py-36">
        <Text
          h1
          className="text-center font-semibold text-4xl md:text-6xl leading-tight pb-20"
        >
          Let&apos;s Link makes organizing easy!
        </Text>
        <Text h4 className="text-center max-w-3xl ">
          Making hosting and organizing in-person and virtual activities,
          gatherings, and events for people and communities of similar
          interests, hobbies, and professions easy.
        </Text>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full self-center max-w-3xl mx-auto">
        <Button shadow color="secondary">
          Get Started
        </Button>
        <Spacer />
        <Button shadow color="secondary">
          Learn More
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
