import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { PageContextProvider } from "./context/PageContext.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PageContextProvider>
                <div className="h-max bg-black">
                    <RouterProvider router={router} />
                </div>
            </PageContextProvider>
        </QueryClientProvider>
    </StrictMode>
);
