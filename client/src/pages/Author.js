import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import useTitle from "../hooks/useTitle";

const MY_AUTHOR = gql`
  query Query($id: ID!) {
    getAuthor(_id: $id) {
      _id
      name
      createdAt
    }
  }
`;

const SET_AUTHOR = gql`
  mutation Mutation($id: ID!, $name: String!) {
    editAuthor(_id: $id, name: $name) {
      status
    }
  }
`;

const Author = () => {
  useTitle("Author");
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(MY_AUTHOR, {
    variables: {
      id: id,
    },
  });
  const [editAuthor] = useMutation(SET_AUTHOR);
  const [isModal, setIsModal] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const date = data ? new Date(data.getAuthor.createdAt) : null;

  console.log(data);
  console.log(authorName);

  useEffect(() => {
    setAuthorName(data ? data.getAuthor.name : null);
  }, [data]);

  const sumbiChanges = async () => {
    try {
      const {
        data: {
          editAuthor: { status },
        },
      } = await editAuthor({
        variables: { id: data.getAuthor._id, name: authorName },
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
          <h3 className="text-xl font-semibold text-blue-800">Edit author</h3>
          <label className="block mt-4">
            <div>Author name</div>
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
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
        <div className="w-full shadow rounded min-h-[450px] p-4">
          <div className="text-2xl mb-1 cursor-pointer">
            <FiEdit onClick={() => setIsModal(true)} />
          </div>
          <img
            className="w-[150px] mx-auto"
            src={require("../img/man.png")}
            alt="author photo"
          />
          <div className="mt-6 text-center">
            <p>
              Name:{" "}
              <span className="text-lg font-medium">{data.getAuthor.name}</span>
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
  );
};

export default Author;
