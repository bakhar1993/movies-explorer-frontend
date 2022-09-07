const base_url = "https://api.diplom.bakhar1993.nomoredomains.xyz";
// const base_url = "http://localhost:3000";

function saveMovie(movies,token) {
  return fetch(`${base_url}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      movieId: movies.id,
      nameRU: movies.nameRU,
      nameEN: movies.nameEN,
      image: movies.image.url,
      trailerLink: movies.trailerLink,
      duration: movies.duration,
      country: movies.country,
      director: movies.director,
      year: movies.year,
      description: movies.description,
      thumbnail: movies.image.url,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function deleteMovie(id,token) {
  return fetch(`${base_url}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      console.log(res)
      return res.json();
    } else {
      console.log(11)
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function getSavedMovies(token) {
  return fetch(`${base_url}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function register({ name, email, password }) {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function login({ email, password }) {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function updateProfile({ name, email, token }) {
  return fetch(`${base_url}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getUserInfo(token) {
  return fetch(`${base_url}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {
  getSavedMovies,
  deleteMovie,
  saveMovie,
  login,
  register,
  updateProfile,
  getUserInfo,
};
