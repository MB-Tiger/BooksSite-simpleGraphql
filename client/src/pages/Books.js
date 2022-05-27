import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export const MY_BOOKS = gql`
  query Query {
    getBooks {
      _id
      title
    }
  }
`;

const Books = () => {
  useTitle("Books");
  const { loading, error, data, refetch } = useQuery(MY_BOOKS);

  console.log(data);
  // console.log(error)

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className="w-full min-h-screen">
        <div className="text-xl font-semibold">Error!</div>;
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen lg:py-8 py-0">
      <div className="container">
        {data.getBooks.length ? (
          <>
            <div className="flex items-center justify-center space-x-2 mt-4 mb-8">
              <div className="w-full h-[2px] rounded-full bg-gray-300"></div>
              <div className="whitespace-nowrap">Books</div>
              <div className="w-full h-[2px] rounded-full bg-gray-300"></div>
            </div>
            <div className="flex flex-wrap items-center justify-evenly">
              {data.getBooks.map((book) => (
                <Link
                  to={`/book/${book._id}`}
                  className="w-[200px] rounded shadow bg-gray-50 mb-6 hover:scale-105 hover:shadow-lg transition-all duration-300 mx-2"
                  key={book._id}
                >
                  <img
                    className="w-full rounded-t"
                    src={require("../img/the-little-prince-16.jpg")}
                    alt="book photo"
                  />
                  <p className="p-2">{book.title}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full py-4">
            <img
              className="w-[500px] mx-auto"
              src={require("../img/people-reading-guidebook.png")}
              alt="photo"
            />
            <h2 className="lg:text-3xl text-2xl font-semibold text-center mt-8">
              Any books doesn't exist yet
            </h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Books;
