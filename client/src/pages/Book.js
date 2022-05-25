import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const USER_BOOK = gql`
  query Query($id: ID!) {
    getBook(_id: $id) {
      _id
      title
      createdAt
    }
  }
`;

const SET_BOOK = gql`
  mutation Mutation($id: ID!, $title: String!) {
    editBook(_id: $id, title: $title) {
      status
    }
  }
`;

const Book = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(USER_BOOK, {
    variables: {
      id: id,
    },
  });
  const [editBook] = useMutation(SET_BOOK);
  const date = data ? new Date(data.getBook.createdAt) : null;
  const [isModal, setIsModal] = useState(false);
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    setBookTitle(data ? data.getBook.title : null);
  }, [data]);

  console.log(data);
  console.log(bookTitle);

  const sumbiChanges = async () => {
    try {
      const {
        data: {
          editBook: { status },
        },
      } = await editBook({
        variables: { id: data.getBook._id, title: bookTitle },
      });
      if (status === 200) {
        refetch();
        return alert("Changes were successfully recorded");
      } else {
        return alert("sorry, something went wrong!");
      }
    } catch (error) {
      console.log(error);
      return alert("Error!");
    }
  };

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
        <div className="text-xl font-semibold">Error!</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-8">
      {isModal ? (
        <div
          className="w-full min-h-screen fixed top-0 left-0 bg-black bg-opacity-40 z-[60] cursor-not-allowed"
          onClick={() => setIsModal(false)}
        ></div>
      ) : null}
      {isModal ? (
        <div className="fixed sm:w-[400px] w-[270px] bg-white p-2 rounded z-[61] left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-xl font-semibold text-blue-800">Edit book</h3>
          <label className="block mt-4">
            <div>Book name</div>
            <input
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              type="text"
              className="w-full mt-1 p-1 bg-gray-200 rounded"
            />
          </label>
          <button
            className="w-full p-2 bg-green-500 hover:bg-green-700 transition-all text-white mt-6 rounded"
            onClick={() => sumbiChanges()}
          >
            Sumbit changes
          </button>
        </div>
      ) : null}
      <div className="container">
        <div className="w-full shadow rounded relative">
          <div className="absolute top-0 right-0 text-2xl mt-1 mr-1 cursor-pointer">
            <FiEdit onClick={() => setIsModal(true)} />
          </div>
          <div className="min-h-[440px] flex flex-wrap items-center">
            <div className="w-[300px] overflow-hidden rounded-l">
              <img
                className="w-full"
                src={require("../img/the-little-prince-16.jpg")}
                alt="book photo"
              />
            </div>
            <div className="ml-8 my-4">
              <p>
                Title:{" "}
                <span className="text-lg font-medium">
                  {data.getBook.title}
                </span>
              </p>
              <p>
                Created at:{" "}
                <span className="text-lg font-medium">
                  {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
