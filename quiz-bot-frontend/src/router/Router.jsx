import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";
import Home from "@/pages/Home";
import CategoryLayout from "@/pages/category/CategoryLayout";
import { CategoryHome } from "@/pages/category/CategoryHome";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<CategoryLayout />}>
            <Route index element={<CategoryHome />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
