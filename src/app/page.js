'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CrowdFundingContext } from "./Context/CroudFunding";
import {Hero, Card, PopUp} from './Components';

const Page = () => {
  const {
    titleData,
    getCampaigns, 
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    } = useContext(CrowdFundingContext);

    const [openModal, setOpenModal] = useState();
    const [allCampaign, setAllCampaign] = useState();
    const [userCampaign, setUserCampaign] = useState();
    const [donateCampaign, setDonateCampaign] = useState();

useEffect(() => {
const getCampaignData = getCampaigns();
const userCampaignData = getUserCampaigns();
return async () => {
  const allData = await getCampaignData;
  const userData = await userCampaignData;
  setAllCampaign(allData);
  setUserCampaign(userData);
  console.log(allData)
};
},[getCampaigns, getUserCampaigns])


  return (
    <>
      <Hero 
      titleData={titleData}
      createCampaign={createCampaign}
      />  

      <Card 
      title="All Listed Campaigns"
      allCampaign={allCampaign}
      setOpenModal={setOpenModal}
      setDonate={setDonateCampaign}
      /> 

     <Card 
      title="Your Created Campaigns"
      allCampaign={userCampaign}
      setOpenModal={setOpenModal}
      setDonate={setDonateCampaign}
      /> 

      {openModal && (
        <PopUp
        setOpenModal={setOpenModal}
        getDonations={getDonations}
        donate={donateCampaign}
        donateFunction={donate}
        />
      )}
    </>
  )
}

export default Page