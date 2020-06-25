import React from "react";
import { useSelector } from "react-redux";

import { getCurrentUserSelector } from "../../store/currentUser/selectors";
import LoggedInHome from "./LoggedInHome";

const Home: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);

  return currentUser.isLoggedIn ? (
    <LoggedInHome />
  ) : (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
