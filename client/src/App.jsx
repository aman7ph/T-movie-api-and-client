import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import Movie from "./components/Movie";
import Dashboard from "./components/Dashboard/Dashboard";
const routers = [
  {
    path: "",
    element: <MobileLayout />,
    children: [{ path: "/movies", element: <Movie /> }],
  },
  {
    path: "/admin/:component",
    element: <Dashboard />,
  },
];
const router = createBrowserRouter(routers);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
