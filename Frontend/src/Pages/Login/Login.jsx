import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import TextInputField from "../../Componants/Shared/TextInputField";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../Componants/firebase.init";
import useToken from "../../Componants/Hook/useToken";

const schema = yup
  .object({
    email: yup.string().email("Incorrect email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export function LoginCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/"

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLoginForm = (data) => {
    signInWithEmailAndPassword(data.email, data.password);

    reset();
  };

  const [token] = useToken(user)

  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLoginForm)}>
          <CardBody className="flex flex-col gap-4">
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
            {error && <small className="text-red-500">{error.code}</small>}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Log In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="div"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <Link to="/register">Registration</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}