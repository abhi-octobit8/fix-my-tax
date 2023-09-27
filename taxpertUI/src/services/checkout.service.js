import API from "../shared/API";

export const GetServiceTotalPrice = async (pricingKey) => {
  const res = await API({
    url: `/services/app/RatecardService/GetTotalPrice?pricingKey=${pricingKey}`,
  });
  return res;
};

export const GetPaymentPrice = async (orderId) => {
  const res = await API({
    url: `/services/app/RatecardService/GetPaymentParams?orderId=${orderId}`,
  });
  debugger;
  return res;
};
