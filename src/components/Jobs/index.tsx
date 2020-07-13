import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../store/currentUser/selectors";

const Jobs = () => {
  const currentUser = useSelector(getCurrentUserSelector);

  return (
    <div>
      <h1>{currentUser.user.username}'s jobs</h1>{" "}
    </div>
  );
};

export default Jobs;
