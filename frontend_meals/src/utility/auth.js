import Cookies from "js-cookie";
import axios from "axios";

export const checkAuthenticated = async (dispatch, request) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const res = await axios.get(
    "https://greek-menu-planner.herokuapp.com/api/authenticated",
    config
  );

  try {
    const res = await axios.get(
      "https://greek-menu-planner.herokuapp.com/api/authenticated",
      config
    );

    if (res.data.error || res.data.isAuthenticated === "error") {
      console.log("Error: You weren't authenticated my guy.");
    } else if (res.data.isAuthenticated === "success") {
      console.log("you were authenticated: Auth.js 25");
      const menu_id = await axios.get(
        "https://greek-menu-planner.herokuapp.com/api/menus/",
        config
      );

      dispatch({
        type: "AUTHENTICATED_SUCCESS",
        user: res.data.user,
        role: res.data.role,
        user_id: res.data.user_id,
        menu_id: menu_id.data[0].id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (username, password, dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const body = JSON.stringify({ username, password });

    const res = await axios.post(
      "https://greek-menu-planner.herokuapp.com/api/login",
      body,
      config
    );

    if (res.data.success === "isAuthenticated") {
      const menu_id = await axios.get(
        "https://greek-menu-planner.herokuapp.com/api/authenticated",
        config
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        user: res.data.user,
        role: res.data.role,
        level: res.data.role_id,
        user_id: res.data.user_id,
        menu_id: menu_id?.data[0]?.user_id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkLogout = async (dispatch) => {
  console.log("logging out");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.post(
      "https://greek-menu-planner.herokuapp.com/api/logout",
      body,
      config
    );
    if (res.data.success) {
      dispatch({ type: "LOGGOUT_SUCCESS" });
      window.location.reload();
    } else {
      console.log("error logging out");
    }
  } catch (err) {
    console.log(err);
  }
};

export const grantPermission = (requestedRole) => {
  return false;
};
