import { createContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProviderContext = ({ children }) => {
  const [homecontent, setHomeContent] = useState();
  const [inputText, setInputText] = useState("");
  const [userList, setUserList] = useState([]);
  const [addUserDisply, setAddUserDisply] = useState(false);
  const navigate = useNavigate();

  const showUserListHandler = () => {
    navigate("/users");
  };

  const inputTextChangeHandler = (e) => {
    setInputText(e.target.value);
  };
  const addUserBtnHandler = () => {
    setAddUserDisply(true);
  };
  const backButtonHandler = () => {
    window.history.back();
    setAddUserDisply(false);
  };

  const getContent = async () => {
    try {
      let users = await fetch("http://localhost:3006");

      let data = await users.json();

      setHomeContent(data.data);
    } catch (error) {
      console.log(error, "error in process data");
    }
  };

  const postData = async (inputText) => {
    console.log("1111");
    let data = await fetch("http://localhost:3006/addData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inputText),
    });

    let responseData = await data.json();

    setUserList(responseData);
  };
  const getUsers = async () => {
    try {
      let users = await fetch("http://localhost:3006/users");
      let usersData = await users.json();
      setUserList(usersData);
    } catch (error) {
      console.log(error, "error in process data");
    }
  };

  const saveBtnHandler = () => {
    postData(inputText);
    setAddUserDisply(false);
  };
  useEffect(() => {
    getContent();
    getUsers();
  }, []);

  return (
    <DataContext.Provider
      value={{
        homecontent,
        showUserListHandler,
        userList,
        inputTextChangeHandler,
        inputText,
        addUserDisply,
        backButtonHandler,
        saveBtnHandler,
        addUserBtnHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
