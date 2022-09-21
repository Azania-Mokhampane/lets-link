import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";

const NewMeetupForm = () => {
  return (
    <>
      <Input
        label="Meetup Title"
        clearable
        bordered
        fullWidth
        color="default"
        size="lg"
        placeholder="Title"
        // contentLeft={<Mail fill="currentColor" />}
      />
      <Input
        label="Meetup Image"
        clearable
        bordered
        fullWidth
        color="default"
        size="lg"
        placeholder="Image"
        // contentLeft={<Password fill="currentColor" />}
      />
      <Input
        label="Address"
        clearable
        bordered
        fullWidth
        color="default"
        size="lg"
        placeholder="Address"
        // contentLeft={<Password fill="currentColor" />}
      />
      <Textarea
        rows={5}
        label="Description"
        bordered
        fullWidth
        size="lg"
        color="default"
        placeholder="Description"
      />
      <Button
        shadow
        color="secondary"
        auto
        onClick={() => console.log("Sbmitted")}
      >
        Add Meetup
      </Button>
    </>
  );
};

export default NewMeetupForm;
