'use client'

import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

//Internal Imports
import {crowdFundingAddress, crowdFundingABI} from './contants';

// fetching smart contract 
const fetchContract = (signerOrProvider) => new ethers.Contract(
    crowdFundingAddress, crowdFundingABI, signerOrProvider);

    export const CrowdFundingContext = React.createContext();
    
    export const  CrowdFundingProvider = ({children}) => {

        const titleData = "Crowd Fundind Contract";
        const [currentAccount, setCurrentAccount] = useState('')

        const  createCampaign = async (campaign) => {
            const {title, description, amount, deadline} = campaign;
            const  web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            console.log(currentAccount)
            
            try {   
                const tx = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18), // change the i8 to ether
                new Date(deadline).getTime(), //deadline
                );
                await tx.wait();
                console.log(tx)
                // setCurrentAccount(signer.address);
                window.location.reload();
                console.log("contract call success:",tx);
            } catch (error) {
                
                console.log(" coontract call fail",error);
            }
        } ;
        
        const getCampaigns = async () => {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const campaigns = await contract.getCampaigns();
            const parsedCampaigns = campaigns.map((campaign, i) =>({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()
                ),
                pId: i,
            }));
              console.log(parsedCampaigns)

            return parsedCampaigns;
        };
//https://yt3.ggpht.com/GWBmO3kXaARSSrgx1Lpgl_YRtx7lZjtsnXqnqq5tlV9h1AwVe031UsobLaS_UmqwHraP6vtaaZk=s88-c-k-c0x00ffffff-no-rj-mo

        const getUserCampaigns = async () => {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const currentUser = accounts[0];
            console.log(currentUser)
            const filterCampaigns = allCampaigns.filter((campaign) => 
            // campaign.owner === currentUser); //currentUser
            campaign.owner === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
            ); //currentUser

            console.log(filterCampaigns)

            const userData = filterCampaigns.map((campaign, i) =>({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()
                ),
                pId: i,
            }));
            // console.log(userData.length)
            return userData;
        };

        

        const donate = async (pId, amount) => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const campaignData = await contract.donateToCampaign(pId,{
            value: ethers.utils.parseEther(amount),
            });
            await campaignData.wait();
            location.reload();
            return campaignData;
        };



        const getDonations = async (pId) => {
             const provider = new ethers.providers.JsonRpcProvider();
             const contract = fetchContract(provider)
             
             const donations = await contract.getDonators(pId);
             const numberOfDonations = donations[0].length;
             
             const parsedDonations = [];

             for(let i = 0; i < numberOfDonations; i++){
                parsedDonations.push({
                    donator: donations[0][i],
                    donation: ethers.utils.formatEther(donations[1][i].toString()),
                });
             }
             return parsedDonations;
        }

          
        //-- CHECK IF WALLET IS CONNECT
        const checkIfWalletConnected = async () => {
            try {
                if(!window.ethereum) return setOpenError(true), setError('Insatll Metamask');
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts',
                });
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                } else {
                    console.log('No Account Found')
                    // setOpenError(true), setError('Connect to Metamask');
                }
                
            } catch (error) {
                console.log('Something went wrong while connecting to wallet');
            }
        };

        useEffect(() => {
          checkIfWalletConnected();
        }, []);

        // Connect wallet function
        const connectWallet = async () => {
            try {
                // const { ethereum } = window;
                if (!window.ethereum) return console.log('Insatll MetaMask');

                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                setCurrentAccount(accounts[0]);
            } catch (error) {
                console.log(error,"Error connecting");
            }
        };

        return (
            <CrowdFundingContext.Provider 
            value = {{
                titleData,
                currentAccount,
                connectWallet,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                
            }}
            >
                {children}
            </CrowdFundingContext.Provider>
        );
    };
