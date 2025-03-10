import api from "./api";

const getSwapList = () => {
  return api.get(`client/foods/listFood`,{
    headers: {
      "ngrok-skip-browser-warning": "true",
      
    },
  });
};


const addProduct = (data:any) => {
  const formData = new FormData();
  formData.append("caption", data.caption);
  formData.append("image", data.image);
  formData.append("description", data.description);
  formData.append("warehouseId", data.warehouseId);
  formData.append("merchantId", data.merchantId);

   // Ajout des informations de prix
   formData.append("price[sale]", data.price.sale);
   formData.append("price[purchase]", data.price.purchase);
   formData.append("price[goodId]", data.price.goodId);
  return api.post(`/admin/goods/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



const showSwap= (id:any) => {
  return api.get(`/client/detail/${id}`);
};
export const SwapService = {
    getSwapList,
    showSwap,
};
