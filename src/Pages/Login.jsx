import { useState } from "react";
import { Link } from "react-router-dom";
import Account from "./Account";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

export default function Login() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    email: "johndoe@email.com",
    password: "password123",
  });

  const navigate = useNavigate();

  const [loginError, setloginError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    console.log(form);
    loginCheck(form);
  };

  const setChange = (event) => {
    const newObj = { ...form };
    newObj[event.target.name] = event.target.value;
    setForm(newObj);
    console.log(form);
  };

  function userLoggedIn() {}

  async function loginCheck(form) {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.token);
        <Nav login={true} />;
        if (!result.token) {
          setloginError(true);
        } else {
          localStorage.setItem("token", result.token);
          navigate("/");
          setloginError(false);
        }
      })
      .catch(console.error);
  }

  return (
    <>
      {!token ? (
        <div className="form_container">
          <div className="form_body">
            <h1>Welcome</h1>
            <h3>Sign In</h3>
            <form className="form_login" onSubmit={submit}>
              <label>
                Email Address: <br></br>
                <input type="text" name={"email"} onChange={setChange} />
              </label>
              <label>
                Password: <br></br>
                <input type="password" name={"password"} onChange={setChange} />
              </label>
              <input
                className="login_button"
                id={"submit"}
                type="submit"
                value={"Log in"}
              />
              {loginError && (
                <h3 className="login_error">
                  Incorrect username and/or password.
                </h3>
              )}
            </form>
          </div>

          <Link to={"/register"}>
            <h3>Create New Account</h3>
          </Link>
        </div>
      ) : (
        <Account />
      )}
    </>
  );
}
