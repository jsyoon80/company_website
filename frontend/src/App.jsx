import "./App.css";

import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import MainPage from "./Page/MainPage/MainPage";
import About from "./Page/About/About";
import Product from "./Page/Product/Product";
import Services from "./Page/Services/Services";
import Board from "./Page/Board/Board";
import Contact from "./Page/Contact/Contact";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/our-services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/board",
        element: <Board />,
      }

    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;