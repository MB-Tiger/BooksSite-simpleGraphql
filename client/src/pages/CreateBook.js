import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { MY_BOOKS } from "./Books";
import useTitle from "../hooks/useTitle";

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 9)}`;

const CREATE_BOOK = gql`
  mutation Mutation($authorId: ID!, $title: String!) {
    createBook(authorId: $authorId, title: $title) {
      status
    }
  }
`;

const CreateBook = () => {
  useTitle("Create book");
  const [sumbitBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [MY_BOOKS],
  });

  const [bookName, setBookName] = useState("");

  // console.log(bookName);

  const AddBook = async () => {
    if (!bookName) return alert("Please complete the form");
    try {
      const {
        data: {
          createBook: { status },
        },
      } = await sumbitBook({
        variables: {
          title: bookName,
          authorId: UID(),
        },
      });
      console.log(status);
      if (status === 200) {
        setBookName("");
        return alert("Success, book added");
      }
      if (status !== 200) return alert("sorry, something went wrong!");
    } catch (error) {
      console.log(error);
      return alert("Error!");
    }
  };

  return (
    <div className="w-full min-h-screen py-8">
      <div className="container">
        <div className="max-w-[500px] h-[300px] bg-white border shadow rounded-lg mx-auto px-2 py-4 mt-8">
          <h2 className="text-xl font-medium text-blue-800 mb-8">
            Create your Book
          </h2>
          <label className="block mb-4 space-y-2">
            <div>Book name</div>
            <input
              className="bg-gray-200 block w-full rounded h-8 p-2"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") AddBook();
              }}
              type="text"
            />
          </label>
          <button
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all mt-12"
            onClick={() => AddBook()}
          >
            Create Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
