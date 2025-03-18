import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Discussion from "./pages/Discussion";
import CreateDiscussion from "./pages/CreateDiscussion";
import { DiscussionProvider } from "./context/DiscussionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DiscussionProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discussion/:id" element={<Discussion />} />
        <Route path="/create" element={<CreateDiscussion />} />
      </Routes>
    </BrowserRouter>
  </DiscussionProvider>
);