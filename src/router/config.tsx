import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectPage from "../pages/project/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/project/:slug",
    element: <ProjectPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
