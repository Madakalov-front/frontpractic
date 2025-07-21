import { setUser } from "@/app/reducers/user-reducer";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  onSubmitLogInUser,
  useAuthorizationForm,
} from "@/feature/authorization/model";
import type { FormDataAuthorization } from "@/feature/authorization/model/useAuthorizationForm";
import { Button, Input } from "@/shared";
import { Spinner } from "@/shared/ui";
import { SuccessForm } from "@/shared/ui/success-form/SuccessForm";
import { setFirstSymUpperCase } from "@/shared/utils";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
    setFocus,
  } = useAuthorizationForm();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wasLogout, login } = useAppSelector((state) => state.user);
  const [successForm, setSuccessForm] = useState<boolean>(false);
  const loginFirstUpperCase = login && setFirstSymUpperCase(login);

  useEffect(() => {
    setFocus("username");
    if (isSubmitSuccessful) {
      setSuccessForm(true);
    }
    if (successForm) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitSuccessful, reset, errors, navigate, successForm, setFocus]);

  const onSubmitWrapper = async (data: FormDataAuthorization) => {
    const user = await onSubmitLogInUser(data, setError);
    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <form
      className="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitWrapper)}
    >
      <Input
        {...register("username")}
        name="username"
        placeholder="Введите логин"
        errorText={errors.username?.message}
      />
      <Input
        type="password"
        {...register("password")}
        name="password"
        placeholder="Введите пароль"
        errorText={errors.password?.message}
      />
      <Button
        name="войти"
        type="submit"
        disabled={false}
        variant="submit"
        size="normal"
      />
      <div className="create-acc">
        <span>Нет аккаунта? - </span>
        <Link to={"/register"}>создать</Link>
      </div>
      {isSubmitting && <Spinner />}
      {wasLogout && (
        <SuccessForm text={`${loginFirstUpperCase}, вы авторизованы!`} />
      )}
    </form>
  );
};
