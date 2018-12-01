const BASE_URL = `http://localhost:3000/api/v1`;

export const Post = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
      credentials: "include"
    }).then(res => res.json());
  },
  one(id) {

  },
  create(params) {

  },
  update(params) {

  },
  destroy() {

  }
}

export const User = {

}

export const Comment = {
  create(params) {

  },
  update(params) {

  },
  destroy() {

  }
}