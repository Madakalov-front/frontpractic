import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/app/layout";
import { MainPage } from "@/pages/main";
import { ArticlesPage } from "@/pages/articles";
import { ArticlePage } from "@/pages/article";
import { NotFoundPage } from "@/pages/not-found";
import { LoginPage } from "@/pages/login/indes";
import { RegisterPage } from "./pages/register/ui/RegisterPage";
import { UsersPage } from "@/pages/users";
import { NewArticle } from "@/pages/newArticle";
import "./shared/icons/fontAwesome";
import "./assets/style/index.scss";

createRoot(document.body!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
