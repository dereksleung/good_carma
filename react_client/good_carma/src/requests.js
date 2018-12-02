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

  }
}

export const User = {

}

export const Session = {

}

export const Comment = {
  create(params) {

  },
  update(params) {

  },
  destroy() {

  }
}

