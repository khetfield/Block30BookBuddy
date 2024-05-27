import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";

export default function SingleBook() {
  const [book, setBook] = useState([]);

  const data = useParams();
  const id = data.id;

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getSingleBook() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.book);
      setBook(data.book);
    }
    getSingleBook();
  }, []);

  const handleCheckout = () => {
    <Checkout book={book.id} />;
    console.log(book.id);
  };

  return (
    <>
      <div className="page_container">
        <div className="single_book_container">
          <h1>{book.title}</h1>
          <h2>Author: {book.author}</h2>
          <p>{book.description}</p>
          <img src={book.coverimage} alt={book.title} />
          {book.available ? (
            <h3 style={{ color: "green" }}>Available to check out</h3>
          ) : (
            <h3 style={{ color: "red" }}>Currently Unavailable</h3>
          )}
          <div className="button_container">
            <Link className="link" to={"/"}>
              <button className="back_button">Back</button>
            </Link>
            {book.available && <Checkout book={book.id} />}
          </div>
        </div>
      </div>
    </>
  );
}
