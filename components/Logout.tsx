import React, { useState } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useSignOut } from "@nhost/nextjs";
import { useRouter } from "next/router";
import Modal from "./UI/Modal";

const Logout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { signOut } = useSignOut();
  const signOutHandler = () => {
    signOut();
    push("/");
    console.log("Logged out");
  };
  console.log("boolean :", open);

  const { push } = useRouter();
  return (
    <>
      <Button auto shadow onClick={() => setOpen(true)} color="error">
        Log Out
      </Button>

      <Modal
        onOpen={open}
        onClose={() => {
          console.log("Closed");
          setOpen(false);
        }}
        modalTitle="Confirm Logout"
      >
        <Card.Body css={{ py: "$10" }}>
          <Text css={{ textAlign: "center", fontSize: "30px" }}>
            Are you sure?
          </Text>
        </Card.Body>
        <Card.Footer>
          <Row justify="space-evenly">
            <Button size="sm" light>
              Cancel
            </Button>
            <Button
              onClick={signOutHandler}
              auto
              shadow
              color={"secondary"}
              size="sm"
            >
              Confirm
            </Button>
          </Row>
        </Card.Footer>
      </Modal>
    </>
  );
};

export default Logout;
