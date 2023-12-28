import React, { useContext } from "react";
import { DataContext } from "../context/context";

export default function Homepage() {
  const { homecontent, showUserListHandler } = useContext(DataContext);

  return (
    <div>
      <h1>Home Page</h1>

      <h3>{homecontent}</h3>

      <button onClick={showUserListHandler}>User List</button>
 
    </div>
  );
}
