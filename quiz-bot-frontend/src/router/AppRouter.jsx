import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import CategoryLayout from "@/pages/category/CategoryLayout";
import { CategoryHome } from "@/pages/category/CategoryHome";
import QuizLayout from "@/pages/quiz/QuizLayout";
import { QuizHome } from "@/pages/quiz/QuizHome";
import WinningScreenLayout from "@/pages/winningscreen/WinningScreenLayout";
import { WinningScreenHome } from "@/pages/winningscreen/WinningScreenHome";
import HomeLayout from "@/pages/home/HomeLayout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import Invite from "@/pages/invite/Invite";
import InviteLayout from "@/pages/invite/InviteLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import RedirectRoute from "@/components/RedirectRoute";
import Home from "@/pages/home/Home";
import CategoryPage from "@/components/CategoryPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="admin/dashboard"
            element={<RedirectRoute component={AdminDashboard} />}
          />
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="invite" element={<InviteLayout />}>
            <Route index element={<Invite />} />
          </Route>
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
        <Route path="categories" element={<CategoryPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
