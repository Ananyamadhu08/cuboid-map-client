import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import { Loader } from "./components/Loader";

function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />

      <Toaster />
    </>
  );
}

export default App;
