import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useSignUpEmailPassword } from "@nhost/nextjs";

import Modal from "../UI/Modal";
import { useRouter } from "next/router";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();
  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await signUpEmailPassword(email, password, {
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName,
      },
    });
  };
  if (isSuccess) {
    // router.push("/all-meetups");
    return null;
  }
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button
        color={"secondary"}
        auto
        flat
        as={Link}
        onClick={() => setIsOpen(true)}
      >
        Sign Up
      </Button>

      <Modal modalTitle="Sign Up" onOpen={isOpen} onClose={closeHandler}>
        <form onSubmit={handleOnSubmit}>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Spacer />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <Spacer />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Spacer />
          <Row justify="flex-end">
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
            <Spacer />
            <Button
              type="submit"
              color="secondary"
              auto
              shadow
              onClick={closeHandler}
            >
              Sign Up
            </Button>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default SignUp;
