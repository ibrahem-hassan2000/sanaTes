import { yupResolver } from "@hookform/resolvers/yup";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { user } from "../../atoms";

function Login() {
  const [FoundUser, setFoundUser] = useRecoilState(user);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const sh = Yup.object().shape({
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
    resolver: yupResolver(sh),
  });
  const onSubmit = (data) => {
    handelLogin(data.email);
  };

  const err = (data) => {
    console.log(data);
  };
  const handelLogin = (name) => {
    Cookies.set("login", true);
    Cookies.set("nameLogin", name);
    setFoundUser(true);
    navigate("/");
  };
  console.log(Cookies.get("login"));
  return (
    <div className="add">
      <h2 style={{ textAlign: "center" }}>{t("login.title")}</h2>
      {FoundUser ? (
        <Button
          onClick={() => {
            Cookies.remove("nameLogin");
            Cookies.set("login", false);
            setFoundUser(false);
          }}
          className="logoutbtn bg-red-400 mx-auto  "
          style={{ backgroundColor: "#f87171" }}
        >
          {t("login.Logout")}
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit, err)}>
          {/* include validation with required or other standard HTML validation rules */}
          <TextInput
            label={t("login.email")}
            placeholder={t("login.enterEmail")}
            {...register("email")}
            radius="md"
            error={errors.email?.message}
          />
          <PasswordInput
            label={t("login.password")}
            placeholder={t("login.enterPassword")}
            radius="md"
            {...register("password")}
            error={errors.password?.message}
          />
          {!FoundUser && (
            <Button type="submit" className="submit">
              {t("login.title")}
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;
