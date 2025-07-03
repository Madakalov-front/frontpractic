import { server } from "@/bff/bff";
import type { FormDataAuthorization } from "@/feature/authorization/model/useAuthorizationForm";
import type { UseFormReset, UseFormSetError } from "react-hook-form";

export const onSubmitLogInUser = async (
  data: FormDataAuthorization,
  setError: UseFormSetError<FormDataAuthorization>,
  reset: UseFormReset<FormDataAuthorization>
) => {
  const result = await server.autorize({
    authLogin: data.username,
    authPassword: data.password,
  });

  if (result.error) {
    if (result.errorType === "login") {
      setError("username", { type: "server", message: result.error });
      return;
    } else if (result.errorType === "password") {
      setError("password", { type: "server", message: result.error });
      return;
    }
  }
  reset();
};
