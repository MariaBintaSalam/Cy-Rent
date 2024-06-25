/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import * as yup from "yup";
import TextInputField from "../../Componants/Shared/TextInputField";
import auth from "../../Componants/firebase.init";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum 6 character")
      .required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password did not match"),
  })
  .required();

export function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line no-unused-vars
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const handleRegisterForm = async (data) => {
    const result = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    updateProfile({ displayName: data.name });
    if (result?.user?.email) {
      toast.success("Successfully Register!");
    } else {
      toast.error(error.code);
    }
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(handleRegisterForm)}>
          <CardBody className="flex flex-col gap-4">
            <TextInputField
              label="Name"
              type="text"
              name="name"
              size="lg"
              errors={errors}
              register={register}
            />

            <TextInputField
              label="Email"
              type="email"
              name="email"
              size="lg"
              errors={errors}
              register={register}
            />

            <TextInputField
              label="Password"
              type="password"
              name="password"
              size="lg"
              errors={errors}
              register={register}
            />

            <TextInputField
              label="Retype Password"
              type="password"
              name="retypePassword"
              size="lg"
              errors={errors}
              register={register}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Register
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <Link to="/login">Login</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
