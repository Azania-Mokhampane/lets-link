import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useSignUpEmailPassword } from "@nhost/nextjs";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import LoginSvg from "../../components/UI/SVG/login";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const schema = Yup.object({
  firstName: Yup.string().required("Please enter your name"),
  lastName: Yup.string().required("Please type a message"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .required("Password is required"),
  confirmedPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword();
  const handleOnSubmit = async (values: SignUpFormValues) => {
    try {
      await signUpEmailPassword(values.email, values.password, {
        displayName: `${values.firstName} ${values.lastName}`.trim(),
        metadata: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });
      toast.success(
        "Signing up was successful, please check your email to verify your account"
      );
    } catch (error) {
      //@ts-ignore
    }
    if (isError) {
      //@ts-ignore
      toast.error(error?.message);
    }
  };
  if (isSuccess) {
    router.push("/all-meetups");
    return null;
  }

  return (
    <>
      <Toaster />
      <Head>
        <title>Let&apos;s Link | Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Grid.Container gap={2} justify="center">
        <Grid xs={6} justify={"center"}>
          <Card
            css={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Header css={{ justifyContent: "center", mb: 20 }}>
              <Text h2> Sign Up An Account</Text>
            </Card.Header>
            <div style={{ maxWidth: "50%" }}>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  labelPlaceholder="First Name"
                  css={{ mt: 20 }}
                  {...register("firstName")}
                />
                {errors.firstName ? (
                  <Text color="error">{errors.firstName.message}</Text>
                ) : null}
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  labelPlaceholder="Last Name"
                  css={{ mt: 30 }}
                  {...register("lastName")}
                />
                {errors.lastName ? (
                  <Text color="error">{errors.lastName.message}</Text>
                ) : null}
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  labelPlaceholder="Email"
                  css={{ mt: 30 }}
                  {...register("email")}
                />
                {errors.email ? (
                  <Text color="error">{errors.email.message}</Text>
                ) : null}
                <Input.Password
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  labelPlaceholder="Password"
                  css={{ mt: 30 }}
                  {...register("password")}
                />
                {errors.password ? (
                  <Text color="error">{errors.password.message}</Text>
                ) : null}
                <Input.Password
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  type={"password"}
                  labelPlaceholder="Confirm Password"
                  css={{ mt: 30 }}
                  {...register("confirmedPassword")}
                />
                {errors.confirmedPassword ? (
                  <Text color="error">{errors.confirmedPassword.message}</Text>
                ) : null}
                <Row justify="center">
                  <Button
                    type="submit"
                    color="secondary"
                    shadow
                    css={{ mt: 25 }}
                  >
                    {isLoading ? (
                      <Row justify="space-evenly">
                        <Text color={"white"}>Signing Up</Text>
                        <Spacer />
                        <Loading type="spinner" color={"white"} size="lg" />
                      </Row>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </Row>
              </form>
            </div>
            <Card.Footer css={{ justifyContent: "center", mt: 20 }}>
              Already a user?{" "}
              <Text
                onClick={() => router.push("/auth/login")}
                color="secondary"
                as={"span"}
                css={{ cursor: "pointer" }}
              >
                Login
              </Text>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid justify="center" xs={6}>
          <LoginSvg />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default SignUp;
