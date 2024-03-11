import {
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
  CREATE_NEW_POST,
} from "./ActionType";

const BASE_URL = "http://localhost:9090";
export const createPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    console.log("find post by user ids ", post);

    dispatch({ type: CREATE_NEW_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const findUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/following/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const posts = await res.json();
    console.log("find post by user ids ", posts);

    dispatch({ type: GET_USER_POST, payload: posts });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const reqUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/following/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const posts = await res.json();
    console.log("find posts by user id ", posts);

    dispatch({ type: REQ_USER_POST, payload: posts });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/like/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    console.log("like post : ", post);
    dispatch({ type: LIKE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const unlikePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/unlike/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    console.log("unlike post : ", post);

    dispatch({ type: UNLIKE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/save-post/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    console.log("saved post : ", post);

    dispatch({ type: SAVE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const unsavePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/posts/unsave-post/${data.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
        body: JSON.stringify(data.data),
      }
    );

    const post = await res.json();
    console.log("unsaved post: ", post);

    dispatch({ type: UNSAVE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const findPostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const post = await res.json();
    console.log("get single post", post);

    dispatch({ type: GET_SINGLE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/delete/${data.postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const post = await res.json();
    console.log("deleted post : ", post);

    dispatch({ type: DELETE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};
