import { addUser } from "@/bff/add-user";
import { createSession } from "@/bff/create-session";
import { getUser } from "@/bff/get-user";
import type { autorizeType, registerType } from "@/bff/types";

export const server = {
  async autorize({ authLogin, authPassword }: autorizeType) {
    const user = await getUser(authLogin);

    if (!user) {
      return {
        error: "Такой пользователь не найден",
        res: null,
      };
    }

    if (user.password !== authPassword) {
      return {
        error: "Неверный пароль",
        res: null,
      };
    }

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },

  async register({ regLogin, regPassword }: registerType) {
    const user = await getUser(regLogin);

    if (user.login === regLogin) {
      return {
        error: "Такой логин занят",
        res: null,
      };
    }

    await addUser({ regLogin, regPassword });

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};
