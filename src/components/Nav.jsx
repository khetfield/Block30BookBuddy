import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Nav() {
  const [token, setToken] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    hasToken && setToken(true);
  }, [token]);

  return (
    <>
      <nav>
        <Link to={"/"} className="logos">
          <MenuBookRoundedIcon size={"2x"} />
        </Link>
        <div className="siteName">BookBuddy</div>
        <div className="navLinks">
          <Link to={"/login"} className="logos">
            <PersonRoundedIcon size={"2x"} />
          </Link>
          <Link to={"/"} className="logos">
            <SearchRoundedIcon size={"2x"} />
          </Link>
        </div>
      </nav>
    </>
  );
}
