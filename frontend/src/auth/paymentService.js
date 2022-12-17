import axios from "axios";

const API_URL = "/api/payment/";

const registerCard = async (cardData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, cardData, config);

    return response;
  } catch (err) {
    return err.response;
  }
};

export { registerCard };
