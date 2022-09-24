import { useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ADD_MEETUP } from "../../graphql/mutations";
import { MEETUP_LIST } from "../../graphql/queries";

interface INewMeetupFormProps {
  onClose: () => void;
}

const NewMeetupForm: FC<INewMeetupFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const [addMeetup, { loading }] = useMutation(ADD_MEETUP, {
    refetchQueries: [{ query: MEETUP_LIST }, "MeetUpList"],
  });

  const addMeetupHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await addMeetup({
        variables: {
          object: {
            meetup_address: address,
            meetup_description: description,
            meetup_title: title,
            meetup_image: image,
          },
        },
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={addMeetupHandler}>
        <Input
          label="Meetup Title"
          clearable
          bordered
          fullWidth
          color="default"
          size="lg"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Meetup Image"
          clearable
          bordered
          fullWidth
          color="default"
          size="lg"
          placeholder="Image"
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Input
          label="Address"
          clearable
          bordered
          fullWidth
          color="default"
          size="lg"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Textarea
          rows={5}
          label="Description"
          bordered
          fullWidth
          size="lg"
          color="default"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          css={{ mb: 20 }}
        />
        <Row justify="center">
          <Button shadow color="secondary" auto type="submit">
            {loading ? (
              <Row justify="space-evenly">
                <Text color={"white"}>Loading</Text>
                <Spacer />
                <Loading type="spinner" color={"white"} size="lg" />
              </Row>
            ) : (
              "Add Meetup"
            )}
          </Button>
        </Row>
      </form>
    </>
  );
};

export default NewMeetupForm;
