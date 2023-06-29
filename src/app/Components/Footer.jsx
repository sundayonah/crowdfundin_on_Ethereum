import React from "react";

const Footer = () => {
  const productList = ['Market', 'ERC20 Token', 'Donation'];
  const contactList = ['onahsunday0612@gmail.com', 'Contact Us'];
  const usefullLink = ['Home', 'About Us', 'Contact Bio'];


  return (
  <footer className="text-center text-white backgroundMain lg:text-left">
    <div className="mx-6 py-10 text-center md:text-left">
      <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="">
          <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            xhunTeq..
          </h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna 
             aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
             </p>
        </div>
        <div className="">
        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
             Products
          </h6>
          {productList.map((el, i) => (
            <div className="md-4" key={i + 1}>
              <a href="#!">{el}</a>
            </div>
          ))}
        </div>
        <div className="">
          <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            usefull Links
          </h6>
          {usefullLink.map((el, i) => (
            <p className="md-4" key={i + 1}>
              <a href="#!">{el}</a>
            </p>
          ))}
        </div>
        <div className="">
          <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
           Contact Us
          </h6>
          {contactList.map((el, i) => (
            <p className="md-4" key={i + 1}>
              <a href="#!">{el}</a>
            </p>
          ))}
        </div>
      </div>
    </div>
    <div className="backgroundMain p-6 text-center">
      <span>© 2023 Copyright: </span>
      <a className="font-semibold" href="https://onahsunday.vercel.app/">xhunTeq..</a>
    </div>
    </footer>
)};

export default Footer;
