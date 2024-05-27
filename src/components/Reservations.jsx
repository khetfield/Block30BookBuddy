import { useState, useEffect } from "react";
import Checkin from "./Checkin";

export default function Reservations() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getReservations() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setBooks(data.reservation);
    }
    getReservations();
  }, []);

  console.log(books);

  return (
    <>
      <div className="user_books">
        {books.length > 0 ? (
          <h3>Books currently checked out...</h3>
        ) : (
          <h3>0 Books currently checked out.</h3>
        )}
        {books &&
          books.map((book) => (
            <div className="user_books_container" key={book.id}>
              <h2>{book.title}</h2>
              <h3>By {book.author}</h3>
              <Checkin resId={book.id} />
            </div>
          ))}
      </div>
    </>
  );
}
