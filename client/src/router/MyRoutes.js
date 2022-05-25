import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Books from "../pages/Books";
import Users from "../pages/Authors";
import CreateBook from "../pages/CreateBook";
import CreateAuthor from "../pages/CreateAuthor";
import Author from "../pages/Author";
import Book from "../pages/Book";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Users />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="/createauthor" element={<CreateAuthor />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/book/:id" element={<Book />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
