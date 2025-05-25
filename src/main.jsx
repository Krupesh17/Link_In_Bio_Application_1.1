import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import store from "./redux/store";
import QueryProvider from "./tanstack-query/QueryProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryProvider>
      <App />
      <Toaster />
    </QueryProvider>
  </Provider>
);
