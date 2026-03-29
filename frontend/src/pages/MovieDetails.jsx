import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { user } = useContext(AuthContext);

const download = async () => {
  await API.post(`/download/download/${id}`, {
    userId: user._id
  });
  alert("Downloaded");
};