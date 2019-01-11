const BASE_URL = `http://localhost:3000/api/v1`;

export const Post = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
      credentials: "include"
    }).then(res => res.json());
  },
  one(id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
      credentials: "include"
    }).then(res => res.json());
  },
  create(params) {
    return fetch(`${BASE_URL}/posts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  update(params) {

  },
  destroy() {

  },
  tree(id) {
    return fetch(`${BASE_URL}/posts/${id}/tree`, {
      credentials: "include"
    }).then(res => res.json());
  }
}

export const LeaderBoard = {
  loadMain() {
    return fetch(`${BASE_URL}/leaderboards`, {
      credentials: "include"
    }).then(res => res.json());
  },
  mostIActionsInWeek() {
    return fetch(`${BASE_URL}/leaderboards/most_i_actions_this_week`, {
      credentials: "include"
    }).then(res => res.json());
  }
}

export const User = {
  current() {
    return fetch(`${BASE_URL}/users/current`, {
      credentials: "include"
    }).then(res => res.json());
  },
  show(id) {
    return fetch(`${BASE_URL}/users/${id}`, {
      credentials: "include"
    }).then(res => res.json());
  },
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          ...params
        }
      })
    }).then(res => res.json());
  }
}

export const Company = {
  create(params) {
    return fetch(`${BASE_URL}/companies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company: {
          ...params
        }
      })
    }).then(res => res.json());
  }
}

export const Session = {
  create(params) {
    return fetch(`${BASE_URL}/sessions`, {
      method: "POST",
      credentials: "include",
      // to include the cookie when doing fetch, use
      // the "credentials" option with "include" for cross-origin
      // requests or with "same-origin" for same-origin
      // requests.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  destroy() {
    return fetch(`${BASE_URL}/sessions`, {
      method: "DELETE",
      credentials: "include"
    }).then(res=>res.json());
  }
}

export const Inspire = {
  createPostInsp(params) {
    console.log(params.postId);
    return fetch(`${BASE_URL}/posts/${params.postId}/inspires`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  createCommentInsp(params) {
    return fetch(`${BASE_URL}/posts/${params.postId}/comments/${params.commentId}/inspires`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
}

export const Comment = {
  create(params) {

  },
  update(params) {

  },
  destroy() {

  }
}

