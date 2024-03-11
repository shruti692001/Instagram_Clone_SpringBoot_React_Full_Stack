import {
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  REQ_USER,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
} from "./ActionType";

const BASE_URL = "http://localhost:9090";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/req`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    const reqUser = await res.json();
    dispatch({ type: REQ_USER, payload: reqUser });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const findUserByUserNameAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/username/${data.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const user = await res.json();
    console.log("find by username: " + user);

    dispatch({ type: GET_USER_BY_USERNAME, payload: user });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const findUserByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/m/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    console.log("find by user ids : ", users);

    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/users/follow/${data.followUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    const user = await res.json();
    console.log("follow user: " + user);

    dispatch({ type: FOLLOW_USER, payload: user });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const unfollowUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/users/unfollow/${data.unfollowUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );

    const user = await res.json();
    console.log("unfollow user: " + user);

    dispatch({ type: UNFOLLOW_USER, payload: user });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/search?q=${data.query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    console.log("search user : ", users);

    dispatch({ type: SEARCH_USER, payload: users });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const editUserDetailsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const user = await res.json();
    console.log("edit user", user);

    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    console.log("catch error : ", error);
  }
};
