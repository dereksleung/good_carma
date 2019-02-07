const BASE_URL = `http://goodcarma.herokuapp.com/api/v1`;

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
        "Content-Type":"application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  update(params, id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  updateImageFile(params, id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: params
    })
    .then(res=>res.json());
  },
  destroy() {

  },
  tree(id) {
    return fetch(`${BASE_URL}/posts/${id}/tree`, {
      credentials: "include"
    }).then(res => res.json());
  },
  postImageFile(params) {
    return fetch(`${BASE_URL}/posts`, {
      method: "POST",
      credentials: "include",
      body: params
    })
    .then(res=>res.json());
  }
}

export const LeaderBoard = {
  loadMain() {
    return fetch(`${BASE_URL}/leaderboards`, {
      credentials: "include"
    }).then(res => res.json());
  },
  loadWeeklyOther(badge_name) {
    return fetch(`${BASE_URL}/leaderboards/${badge_name}_this_week`, {
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
  },
  uploadImage(params, id) {
    return fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: params
    })
    .then(res=>res.json());
  }
}

export const Follow = {
  create(user_id) {
    return fetch(`${BASE_URL}/users/${user_id}/follows`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    }).then(res => res.json());
  },
  destroy(follow_id) {
    return fetch(`${BASE_URL}/follows/${follow_id}`, {
      method: "DELETE",
      credentials: "include"
    }).then(res => res.json());
  },
  check(user_id) {
    return fetch(`${BASE_URL}/users/${user_id}/follows/check`, {
      credentials: "include"
    }).then(res => res.json());
  },
  showFollowers(user_id) {
    return fetch(`${BASE_URL}/users/${user_id}/followers`, {
      credentials: "include"
    }).then(res => res.json());
  },
  showFollowedUsers(user_id) {
    return fetch(`${BASE_URL}/users/${user_id}/followed_users`, {
      credentials: "include"
    }).then(res => res.json());
  }
}

export const Search = {
  users(query) {
    return fetch(`${BASE_URL}/users/search?query=${query}`, {
      credentials: "include"
    }).then(res=>res.json());
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
  create(params, postId) {
    return fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
  },
  update(params) {

  },
  destroy() {

  }
}

