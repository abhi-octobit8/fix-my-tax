import API from "../shared/API";

export const GetServiceTotalPrice = async (pricingKey) => {
  const res = await API({
    url: `/services/app/RatecardService/GetTotalPrice?pricingKey=${pricingKey}`,
  });
  return res;
};

export const GetPaymentPrice = async (orderId, amount) => {
  const res = await API({
    url: `/services/app/RatecardService/GetPaymentParams?orderId=${orderId}&amount=${amount}`,
  });
  debugger;
  return res;
};
