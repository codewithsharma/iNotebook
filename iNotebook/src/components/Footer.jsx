import React from "react";
import {AiFillInstagram ,AiFillYoutube, AiFillLinkedin, AiFillTwitterSquare} from "react-icons/ai";

function Footer() {
  return <div className="footer">
    <h3>Developed by :- Dev Raj Sharma</h3>
  <div>
    <a href="www.instagram.com/codewithsharma">  <AiFillInstagram/></a>
    <a href="www.linkedin.com/codewithsharma"><AiFillLinkedin/></a>
    <a href="www.twitter.com/codewithsharma"><AiFillTwitterSquare/></a>
    <a href="www.youtube.com/codewithsharma"><AiFillYoutube/></a>
  </div>

  </div>;
}

export default Footer;
