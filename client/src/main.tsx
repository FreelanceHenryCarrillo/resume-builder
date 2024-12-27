import ReactDOM from "react-dom/client";

import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import DashBoard from "./components/DashBoard/DashBoard.tsx";
import BuildResume from "./components/DashBoard/[id]/resume/index.tsx";
import { Providers } from "./providers/index.tsx";
import SignInPage from "./auth/sign-in/index.tsx";
import NotFound from "./pages/notFound/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/Home.tsx";
import AuthGuard from "./pages/AuthGuard/index.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/resume",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <DashBoard />
          </AuthGuard>
        ),
      },
      {
        path: "builder",
        element: (
          <AuthGuard>
            <Providers />
          </AuthGuard>
        ),
        children: [{ path: ":id", element: <BuildResume /> }],
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey="pk_test_dW5pcXVlLWhvcm5ldC05OC5jbGVyay5hY2NvdW50cy5kZXYk"
    afterSignOutUrl="/dashboard"
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ClerkProvider>
);
