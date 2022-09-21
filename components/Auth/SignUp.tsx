import {
  Button,
  Checkbox,
  Input,
  Link,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { useState } from "react";
import Modal from "../UI/Modal";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Username"
          // contentLeft={<Mail fill="currentColor" />}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          // contentLeft={<Password fill="currentColor" />}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          // contentLeft={<Password fill="currentColor" />}
        />
        {/* <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row> */}
        <Row justify="flex-end">
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Spacer />
          <Button color="secondary" auto shadow onClick={closeHandler}>
            Sign Up
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default SignUp;
