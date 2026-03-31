const API = "/api";

export const loginUser = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};


// GET movies
export const getMovies = async () => {
  const res = await fetch(`${API}/movies`);
  return res.json();
};

// CREATE movie
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

// DELETE movie
export const deleteMovie = async (id) => {
  await fetch(`${API}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
};