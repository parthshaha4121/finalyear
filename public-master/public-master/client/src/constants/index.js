import { createCampaign, dashboard, logout, payment, profile, withdraw,kyc, active, terminate } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
   {
    name: 'Active',
    imgUrl: active,
    link: '/ActiveCampaign',
    
  },
  {
    name: 'Terminated',
    imgUrl: terminate,
    link: '/Terminated',
    
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/Profile',
  },
  {
    name: 'KYC',
    imgUrl: kyc,
    link: '/Verification',
    
  },
  /*{
    name: 'About',
    imgUrl: about,
    link: '/About',
    
  },*/
];
