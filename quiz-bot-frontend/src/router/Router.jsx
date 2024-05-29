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
import QuizLayout from "@/pages/quiz/QuizLayout";
import { QuizHome } from "@/pages/quiz/QuizHome";
import WinningScreenLayout from "@/pages/winningscreen/WinningScreenLayout";
import { WinningScreenHome } from "@/pages/winningscreen/WinningScreenHome";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<CategoryLayout />}>
            <Route index element={<CategoryHome />} />
          </Route>
          <Route path="quiz" element={<QuizLayout />}>
            <Route index element={<QuizHome />} />
          </Route>
          <Route path="winningscreen" element={<WinningScreenLayout />}>
            <Route index element={<WinningScreenHome />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
