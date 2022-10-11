import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Modal from "./UI/Modal";
import * as Yup from "yup";
import { useResetPassword } from "@nhost/nextjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailSent from "./UI/SVG/emailSent";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
});

interface IForgotPasswordFormProps {
  email: string;
}

const ForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgotPasswordFormProps>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const { resetPassword, isLoading, isSent, isError, error } =
    useResetPassword();

  const handleFormSubmit = async (values: IForgotPasswordFormProps) => {
    try {
      await resetPassword(values.email, {
        redirectTo: "http://localhost:3000/settings/change-password",
      });
    } catch (error) {}
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
        modalTitle={isSent ? "Check your emails" : "Reset Password"}
      >
        {isSent ? (
          <Row
            justify="center"
            css={{ flexDirection: "column", alignItems: "center" }}
          >
            <EmailSent className="w-5/6" />
            <Text css={{ textAlign: "center" }}>
              We have sent you a passwork recovery link, to your email.
            </Text>
          </Row>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card.Body css={{ py: "$10" }}>
              <Input
                clearable
                bordered
                fullWidth
                placeholder="Please enter you email"
                {...register("email")}
              />
              {errors.email ? (
                <Text color="error">{errors.email.message}</Text>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <Row justify="space-evenly">
                <Button size="sm" light onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Row
                  justify="center"
                  css={{ flexDirection: "column", alignItems: "center" }}
                >
                  <Button
                    type={"submit"}
                    auto
                    shadow
                    color={"secondary"}
                    size="sm"
                  >
                    {isLoading ? (
                      <Row justify="space-evenly">
                        <Text color={"white"}>Sending</Text>
                        <Spacer />
                        <Loading type="spinner" color={"white"} size="lg" />
                      </Row>
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                  {isError ? <Text color="error">{error?.message}</Text> : null}
                </Row>
              </Row>
            </Card.Footer>{" "}
          </form>
        )}
      </Modal>
    </>
  );
};

export default ForgotPassword;
