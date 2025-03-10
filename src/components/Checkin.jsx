import { useNavigate } from "react-router-dom";

export default function Checkin({ resId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(resId);

  async function runCheckin() {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/" +
        resId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch(console.error);
  }

  return (
    <><button onClick={runCheckin}>Check In Book</button></>
  );
}
