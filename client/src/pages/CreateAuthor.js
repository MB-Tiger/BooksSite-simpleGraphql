import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTHORS } from "./Authors";

const CREATE_AUTHOR = gql`
  mutation Mutation($name: String!) {
    createAuthor(name: $name) {
      status
    }
  }
`;

const CreateAuthor = () => {
  const [sumbitAuthor] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [AUTHORS],
  });
  const [authorName, setAuthorName] = useState("");

  const AddAuthor = async () => {
    try {
      if (!authorName) return alert("Please complete the form");
      const {
        data: {
          createAuthor: { status },
        },
      } = await sumbitAuthor({
        variables: {
          name: authorName,
        },
      });
      console.log(status);
      if (status === 200) {
        setAuthorName("");
        return alert("Success, author added");
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
            Create your author
          </h2>
          <label className="block mb-4 space-y-2">
            <div>Author name</div>
            <input
              className="bg-gray-200 block w-full rounded h-8 p-2"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") AddAuthor();
              }}
              type="text"
            />
          </label>
          <button
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all mt-12"
            onClick={() => AddAuthor()}
          >
            Add author
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAuthor;
