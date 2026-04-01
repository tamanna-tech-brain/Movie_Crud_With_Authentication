const API = "/api";

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// GET MOVIES
export const getMovies = async () => {
  const res = await fetch(`${API}/movies`);
  return res.json();
};

// CREATE MOVIE
export const createMovie = async (data) => {
  const res = await fetch(`${API}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// DELETE
export const deleteMovie = async (id) => {
  await fetch(`${API}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
};