import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        Created by{" "}
        <a
          href="https://github.com/dalfang"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dalin Fangloy
        </a>
      </p>
    </footer>
  );
};

export default Footer;
