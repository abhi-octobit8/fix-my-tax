import { toFixed } from "../../shared/utils";

export const calculateTotalPayment = ({ category, price }) => {
  if (category === 1) {
    //discount 10%
    const discountValue = toFixed(price) * 0.1;
    return discountValue;
  }
};
