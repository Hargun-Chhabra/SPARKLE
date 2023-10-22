/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */

// Reference code taken from geeksforgeeks: https://www.geeksforgeeks.org/how-to-create-a-landing-page-using-html-css-and-javascript/

import React from 'react';
import './Landing.css';

function Landing() {


  return (
    <>
      <nav>
        <div className="heading">Sparkle</div>
        

        <div className="navbar">
          <ul>
            <li>
              <a href="/Login">Log In</a>
            </li>
          </ul>
        </div>
      </nav>


      <div className="line" id="Home">
        <div className="side1">
          <h1>Sparkle: A store management system designed specially for Jewelry stores.</h1>
        </div>
        <div className="side2">
          <img
            src="https://cdn.shopify.com/s/files/1/2352/8933/files/DSC08480-IMOGEN-ROSE-JEWELLERY-CHLOE-UPTON-STUDIO-PHOTOGRAPHY_1_300x.jpg?v=1673556555"
            width="470"
          />
        </div>
      </div>

      <section className="about" id="My Projects">
        <div className="content">
          <div className="title">
            <span>Contact</span>
          </div>
          <div className="boxes">
            <div className="box">
              <div className="topic">
                <h2>Mailing Address</h2>
              </div>
              <p>XYZ ABC Street, Halifax, Nova Scotia</p>
            </div>
            <div className="box">
              <div className="topic">
                <h2>Email Address</h2>
              </div>
              <a href="mailto:group8@dal.ca" target="_blank">
                group8@dal.ca
              </a>
            </div>
            <div className="box">
              <div className="topic">
                <h2>Phone Number</h2>
              </div>
              <a href="tel:9999999999" target="_blank">
                9999999999
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer">
          <span>
            Created By
            <a href="" target="_blank">
              Group8
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Landing;
