
export const daysLeft = (deadline) => {

  
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  if(remainingDays <= 0)
  {
    
    return "Terminated";
  } 
  return remainingDays.toFixed(0);
  
};


export const calculateBarPercentage = (goal, raisedAmount) => {
 
  const percentage = Math.round((raisedAmount * 100) / goal);
 
  return percentage;
};



export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const AdharNumberCheack = (aadhaarNumber) => 
{
  // Check if Aadhaar number is 12 digits long
  if (aadhaarNumber.length !== 12) {
    return false;
  }
  
  if (aadhaarNumber.charAt(0) === '0' || aadhaarNumber.charAt(0) === '1') {
    return false;
  }

  const aadhaarNumberWithoutSpaces = aadhaarNumber.replace(/\s/g, '');

  
  if (isNaN(aadhaarNumberWithoutSpaces)) {
    return false;
  }

  
  return true;
};









