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

export { createPackage, getPackages, deletePackage };
