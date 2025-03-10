  const getLocalAccessToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };
 
  export const TokenService = {
    getLocalAccessToken
  };
  
 