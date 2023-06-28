import React from "react";

import { CrowdFundingContext } from "../Context/CroudFunding";


const Hero = () => {
  const {currentAccount, connectWallet} = useContext(CrowdFundingContext);
  return <div>Hero</div>;
};

export default Hero;
