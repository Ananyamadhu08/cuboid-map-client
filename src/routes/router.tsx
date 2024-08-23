import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "../pages";
import SavedMapCaptures from "../pages/SavedMapCaptures";
import TopCapturedRegions from "../pages/TopCapturedRegions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/saved-map-captures",
    element: <SavedMapCaptures />,
  },
  {
    path: "/top-map-captures",
    element: <TopCapturedRegions />,
  },
]);

export default router;
