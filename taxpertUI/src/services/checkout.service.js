import API from "../shared/API";

export const GetServiceTotalPrice = async (pricingKey) => {
  const res = await API({
    url: `/services/app/RatecardService/GetTotalPrice?pricingKey=${pricingKey}`,
  });
  return res;
};
