import {
  onSubmitLogInUser,
  useAuthorizationForm,
} from "@/feature/authorization/model";
import type { FormDataAuthorization } from "@/feature/authorization/model/useAuthorizationForm";
import { Button, Input } from "@/shared";
import { Spinner } from "@/shared/ui";
import { SuccessForm } from "@/shared/ui/success-form/SuccessForm";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useAuthorizationForm();

  const [successForm, setSuccessForm] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSuccessForm(true);
      reset();
    }
  }, [isSubmitSuccessful, reset, errors]);

  const onSubmitWrapper = (data: FormDataAuthorization) =>
    onSubmitLogInUser(data, setError, reset);

  return (
    <form
      className="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitWrapper)}
    >
      <Input
        {...register("username")}
        name="username"
        errorText={errors.username?.message}
      />
      <Input
        type="password"
        {...register("password")}
        name="password"
        errorText={errors.password?.message}
      />
      <Button name="войти" type="submit" disabled={false} variant="submit" />
      <div className="create-acc">
        <span>Нет аккаунта? - </span>
        <Link to={"/register"}>создать</Link>
      </div>
      {isSubmitting && <Spinner />}
      {successForm && <SuccessForm text="UserName, вы авторизованы!" />}
    </form>
  );
};
