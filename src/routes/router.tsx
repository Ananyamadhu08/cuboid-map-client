import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages";
import SavedMapCaptures from "../pages/SavedMapCaptures";
import TopCapturedRegions from "../pages/TopCapturedRegions";
import { LoginForm, SignUpForm } from "../components/AuthForms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
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
