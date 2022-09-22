import React, { useState } from "react";
import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/nextjs";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";

import Modal from "../UI/Modal";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const router = useRouter();

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await signInEmailPassword(email, password);
  };
  if (isSuccess) {
    router.push("/all-meetups");
    return null;
  }
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button auto flat as={Link} onClick={() => setIsOpen(true)}>
        Login
      </Button>
      <Modal modalTitle="Login" onOpen={isOpen} onClose={closeHandler}>
        <form onSubmit={handleOnSubmit}>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
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
              Login
            </Button>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default Login;
