import {
  onSubmitCreateUser,
  useRegisterForm,
} from "@/feature/registerUser/model";
import { Button, Input } from "@/shared";
import { Spinner } from "@/shared/ui";
import { useEffect, useState } from "react";
import type { FormDataRegister } from "@/feature/registerUser/model/useRegisterForm";
import { SuccessForm } from "@/shared/ui/success-form/SuccessForm";

import styles from "./RegisterUser.module.scss";

export const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useRegisterForm();

  const [successForm, setSuccessForm] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSuccessForm(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmitWrapper = (data: FormDataRegister) =>
    onSubmitCreateUser(data, setError, reset);

  return (
    <>
      <div className={styles["register-user"]}>
        <form
          onSubmit={handleSubmit(onSubmitWrapper)}
          className="form"
          autoComplete="off"
        >
          <Input
            {...register("username")}
            type="text"
            name="username"
            errorText={errors.username?.message}
          />
          <Input
            {...register("password")}
            type="password"
            name="password"
            errorText={errors.password?.message}
          />
          <Input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            errorText={errors.confirmPassword?.message}
          />
          <Button
            name="создать"
            type="submit"
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            variant="submit"
          />
          {isSubmitting && <Spinner />}
          {successForm && <SuccessForm text="Регистрация прошла успешно!" />}
        </form>
      </div>
    </>
  );
};
