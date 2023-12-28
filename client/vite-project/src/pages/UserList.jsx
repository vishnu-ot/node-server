import React, { useContext } from "react";
import { DataContext } from "../context/context";

function UserList() {
  const {
    userList,
    backButtonHandler,
    inputTextChangeHandler,
    inputText,
    addUserDisply,
    addUserBtnHandler,saveBtnHandler,
  } = useContext(DataContext);

  return (
    <div>
      <h3>User List</h3>
      {userList?.map((user) => {
        return <h6 key={user.id}>{user.name}</h6>;
      })}
      <button onClick={backButtonHandler}>Back to home</button>
      <button onClick={addUserBtnHandler} disabled={addUserDisply}>
        Add user
      </button>
      <br />
      <br />
      {addUserDisply && (
        <div>
          <input
            type="text"
            onChange={inputTextChangeHandler}
            value={inputText}
          />
          <button onClick={saveBtnHandler}>Save</button>{" "}
        </div>
      )}
    </div>
  );
}

export default UserList;
