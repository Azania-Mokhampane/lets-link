import React, { useState } from "react";
import { Button, Card, Input, Row, Text } from "@nextui-org/react";
import Modal from "./UI/Modal";
import { useResetPassword } from "@nhost/nextjs";

const ForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { resetPassword, isLoading, isSent, isError, error } =
    useResetPassword();

  console.log({ isLoading, isSent, isError, error });

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await resetPassword(email, {
      redirectTo: "http://localhost:3000/settings/change-password",
    });
  };
  return (
    <>
      <Text
        css={{ cursor: "pointer" }}
        color={"secondary"}
        onClick={() => setOpen(true)}
      >
        Forgot password?
      </Text>

      <Modal
        onOpen={open}
        onClose={() => setOpen(false)}
        modalTitle="Reset Password"
      >
        {" "}
        <form onSubmit={handleFormSubmit}>
          <Card.Body css={{ py: "$10" }}>
            <Input
              clearable
              bordered
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter you email"
            />
          </Card.Body>
          <Card.Footer>
            <Row justify="space-evenly">
              <Button size="sm" light>
                Cancel
              </Button>
              <Button type={"submit"} auto shadow color={"secondary"} size="sm">
                Reset Password
              </Button>
            </Row>
          </Card.Footer>{" "}
        </form>
      </Modal>
    </>
  );
};

export default ForgotPassword;
