import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "./index.css"
import "./App.css";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Show from "./pages/Show";
import HeaderNav from "./components/HeaderNav";
import { useTranslation } from "react-i18next";
import { RecoilRoot } from "recoil";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <HeaderNav />
      <main
        style={{ minHeight: "calc(100vh - 360px)" }}
        className="container mx-auto px-2 mb-16 my-2 "
      >
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/edit/:id",
        element: <Create />,
      },
      {
        path: "/show/:id",
        element: <Show />,
      },
    ],
  },
]);
function App() {
  const { i18n } = useTranslation();

  return (
    <RecoilRoot>
      <div
        className={`App select-all ${
          i18n.resolvedLanguage === "en" ? "" : "rtl"
        } `}
      >
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  );
}

export default App;
