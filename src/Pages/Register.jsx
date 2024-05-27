import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "FirstName",
    lastname: "LastName",
    email: "johndoe@email.com",
    password: "password123",
  });

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    console.log(form);
    createAccount(form);
  };

  const setChange = (event) => {
    const newObj = { ...form };
    newObj[event.target.name] = event.target.value;
    setForm(newObj);
    console.log(form);
  };

  async function createAccount(form) {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.token);
        localStorage.setItem("token", result.token);
        navigate("/");
      })
      .catch(console.error);
  }
  return (
    <>
      <div className="form_container">
        <div className="form_body">
          <h1>Hello,</h1>
          <h3>Create an Account</h3>
          <form className="form_login" onSubmit={submit}>
            <label>
              First Name: <br></br>
              <input type="text" name={"firstname"} onChange={setChange} />
            </label>
            <label>
              Last Name: <br></br>
              <input type="text" name={"lastname"} onChange={setChange} />
            </label>
            <label>
              Email Address: <br></br>
              <input type="text" name={"email"} onChange={setChange} />
            </label>
            <label>
              Password: <br></br>
              <input type="password" name={"password"} onChange={setChange} />
            </label>
            <input
              id={"submit"}
              type="submit"
              value={"Create account"}
              className="register_button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
