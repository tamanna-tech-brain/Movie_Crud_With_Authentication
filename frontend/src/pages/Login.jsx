const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", form);

    console.log(res.data); // 👈 check structure

    const user = res.data.data; // ✅ correct

    localStorage.setItem("userId", user._id);

    alert("Login Success");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message);
  }
};