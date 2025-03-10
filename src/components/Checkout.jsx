import { useNavigate } from "react-router-dom";

export default function Checkout({ book }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function runCheckout() {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/" + book,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/myaccount");
      })
      .catch(console.error);
  }

  return <>{token && <button onClick={runCheckout}>Check Out Book</button>}</>;
}
