import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import Editor from "../pages/editor/Editor";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route path="/editor" element={<Navigate to="/" />} />
      <Route path="/editor/:id" element={<Editor />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
