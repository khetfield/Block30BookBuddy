import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Reservations from "../components/Reservations";
import { Link } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAccountInfo() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setUser(result);
        })
        .catch(console.error);
    }
    getAccountInfo();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <div className="account_container">
        <div className="account_box">
          <h1>Welcome back, {user.firstname}!</h1>;
          <h3>Here's your account information:</h3>
          <ul>
            <li>
              Name: {user.firstname} {user.lastname}
            </li>
            <li>Email: {user.email}</li>
          </ul>
          <Reservations/>
          <div className="account_buttons">
            <Link to={"/"}>
              <button className="back_button">Back</button>
            </Link>
            <button onClick={logout} className="signout_button">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
