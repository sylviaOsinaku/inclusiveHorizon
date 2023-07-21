import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./UserReg/Login";
import Register from "./UserReg/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeRoot from "./pages/HomeRoot";
import Quiz from "./components/tools/Quiz";
import InclusiveChecker from "./components/tools/InclusiveChecker";
import Home from "./pages/Homepage/Home";
import Pledge from "./components/tools/Pledge";
import RandomQuotes from "./components/tools/RandomQuotes";
import Tips from "./components/tools/Tips";
import SavedPledge from "./components/tools/SavedPledge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "equityHome",
    element: (
      <ProtectedRoute>
        <HomeRoot />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/equityHome",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "quiz",
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      {
        path: "inLangChecker",
        element: (
          <ProtectedRoute>
            {" "}
            <InclusiveChecker />
          </ProtectedRoute>
        ),
      },
      {
        path: "pledge",
        element: (
          <ProtectedRoute>
            <Pledge />
          </ProtectedRoute>
        ),
      },
      {
        path: "randomquotes",
        element: (
          <ProtectedRoute>
            {" "}
            <RandomQuotes />
          </ProtectedRoute>
        ),
      },
      {
        path: "tipsnfacts",
        element: (
          <ProtectedRoute>
            <Tips />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
