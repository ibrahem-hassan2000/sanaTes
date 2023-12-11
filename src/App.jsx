import {   Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "../dist/output.css";
import '@mantine/core/styles.css';
import "./App.css";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import HeaderNav from "./components/HeaderNav";
import { useTranslation } from "react-i18next";


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
     <h2>footer</h2>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Index/>,
      },
      {
        path: "create",
        element: <Create/> ,
      },
      {
        path: "login",
        element: <Login/> ,
      },
      {
        path: "edit",
        element: <Edit/> ,
      },
      {
        path: "show",
        element: <Show/> ,
      }
    ]
  },
 
]);
function App() {
  const { i18n} = useTranslation();

  return (
    <div className={`App select-all ${ i18n.resolvedLanguage === "en"?"":"rtl"} `}>
      
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;