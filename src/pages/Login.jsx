import { yupResolver } from "@hookform/resolvers/yup";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const t = Yup.object().shape({
    email: Yup.string().required("feeen email").email("not valid"),

    password: Yup.string()
      .min(8, "most be 8 or more")
      .required("ffen password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(t),
  });
  const onSubmit = (data) => {
    console.log(data);
    handelLogin(data.email);
  };

  const err = (data) => {
    console.log(data);
  };
  const handelLogin = (name) => {
    Cookies.set("login", true);
    Cookies.set("nameLogin", name);
    navigate('/')
  };

  return (
    <div className="add">
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleSubmit(onSubmit, err)}>
        {/* include validation with required or other standard HTML validation rules */}
        <TextInput
          label="Email"
          placeholder="Enter Your Email "
          {...register("email")}
          radius="md"
          error={errors.email?.message}
        />
        <PasswordInput
          label="password"
          placeholder="Enter Your Password"
          radius="md"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" className="submit">
          LogIn
        </Button>
      </form>
    </div>
  );
}

export default Login;
