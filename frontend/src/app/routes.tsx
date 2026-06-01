import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { GradeCalculator } from "./pages/GradeCalculator";
import { Forum } from "./pages/Forum";
import { Discover } from "./pages/Discover";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "cuestionario", Component: Quiz },
      { path: "calculadora", Component: GradeCalculator },
      { path: "foro", Component: Forum },
      { path: "descubrir", Component: Discover },
      { path: "registro", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
]);
