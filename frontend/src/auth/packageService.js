import axios from "axios";

const API_URL = "/api/packages/";

const createPackage = async (packageData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, packageData, config);

    return response;
  } catch (err) {
    return err.response;
  }
};

const getPackages = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);

    return response;
  } catch (err) {
    return err.response;
  }
};

const deletePackage = async (packageId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API_URL + packageId, config);

    return response;
  } catch (err) {
    return err.response;
  }
};

function calculateCost(type, weight, width, hieght, insurance) {
  let cost = 0;
  switch (type) {
    case "Regular":
      cost = 7 * weight * (width * hieght * 1.5);
      break;

    case "Liquid":
      cost = 9 * weight * (width * hieght * 1.5);
      break;

    case "Chemical":
      cost = 11 * weight * (width * hieght * 1.5);
      break;

    case "Fragile":
      cost = 13 * weight * (width * hieght * 1.5);
      break;
  }
  if (cost > 500) {
    if (insurance === "Yes") {
      cost += 30;
    }
  } else {
    if (insurance === "Yes") {
      cost += 7;
    }
  }
  return cost;
}

// const updatePackage = async (packageId, token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.put(API_URL + packageId, config);

//       return response;
//     } catch (err) {
//       return err.response;
//     }
//   };

export { createPackage, getPackages, deletePackage, calculateCost };
