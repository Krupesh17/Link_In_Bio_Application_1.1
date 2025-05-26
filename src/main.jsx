import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import QueryProvider from "./tanstack-query/QueryProvider";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryProvider>
        <App />
        <Toaster />
      </QueryProvider>
    </PersistGate>
  </Provider>
);
