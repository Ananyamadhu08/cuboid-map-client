import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import { Loader } from "./components/Loader";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} fallbackElement={<Loader />} />

      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
