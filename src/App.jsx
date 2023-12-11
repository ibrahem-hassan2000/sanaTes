import {   Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "../dist/output.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import HeaderNav from "./components/HeaderNav";


const Layout = () => {
  return (
    <>
      <HeaderNav />
      <main
        style={{ minHeight: "calc(100vh - 360px)" }}
        className="container mx-auto px-2 mb-16 my-2 flex"
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

  return (
    <div className="App">
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;
