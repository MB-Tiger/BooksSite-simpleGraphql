import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export const AUTHORS = gql`
  query Query {
    getAuthors {
      _id
      name
    }
  }
`;

const Authors = () => {
  useTitle("Authors");
  const { loading, error, data } = useQuery(AUTHORS);

  console.log(data);

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
    <div className="container py-8">
      <div className="w-full min-h-[75vh] rounded border bg-white text-center shadow-sm">
        <div className="grid grid-cols-3 w-full rounded-t p-2 bg-gray-200 font-medium items-center">
          <div className="col-span-1">Number</div>
          <div className="col-span-1">Image</div>
          <div className="col-span-1">Name</div>
        </div>
        {data.getAuthors.map((author, i) => {
          return (
            <Link
              to={`/author/${author._id}`}
              className="grid grid-cols-3 items-center bg-[#2E3A3F] rounded m-2 p-2 text-white hover:scale-105 cursor-pointer transition-all overflow-x-auto"
              key={author._id}
            >
              <div className="col-span-1">{i + 1}</div>
              <div className="col-span-1">
                <img
                  className="w-[35px] h-[35px] rounded-full mx-auto"
                  src={require("../img/man.png")}
                  alt="author image"
                />
              </div>
              <div className="col-span-1"> {author.name} </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Authors;
