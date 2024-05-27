import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [value, setValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAllBooks() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBooks(data.books);
      setFilteredBooks(data.books);
    }
    getAllBooks();
  }, []);

  useEffect(() => {
    const searchResultArray = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log(searchResultArray);

    setFilteredBooks(searchResultArray);

    searchResultArray.length === 0 && setNoSearchResults(true);
    searchResultArray.length > 0 && setNoSearchResults(false);
  }, [value, books]);

  const setResults = (e) => {
    setValue(e.target.value);
  };

  console.log(noSearchResults);
  return (
    <>
      <div className="contentWrapper">
        <div className="searchWrap">
          <div className="searchBar">
            <SearchRoundedIcon size={"1x"}/>
            <input
              type="text"
              placeholder="Search..."
              onChange={setResults}
            />
          </div>
        </div>
        {noSearchResults && <h2>0 Matches</h2>}
        {filteredBooks.map((book) => (
          <div className="book_container" key={book.id}>
            <h1>{book.title}</h1>
            <h2>By {book.author}</h2>
            <img src={book.coverimage} alt={book.title} />
            {book.available ? (
              <h3 style={{ color: "green" }}>Available to Check Out</h3>
            ) : (
              <h3 style={{ color: "orange" }}>Currently Unavailable</h3>
            )}
            <div className="button_container">
              <Link className="link" to={"books/" + book.id}>
                <button className="book_button">See Book Details...</button>
              </Link>
              {book.available && <Checkout book={book.id} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
