import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
