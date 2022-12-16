const asyncHandler = require("express-async-handler");

const Package = require("../models/packageModel");
const User = require("../models/userModel");
const Location = require("../models/locationModel");

// @desc    Get Package
// @route   GET /api/package
// @access  Private
const getPackages = asyncHandler(async (req, res) => {
  //req.user.id is accesed after autherization thru authMiddleware
  const package = await Package.find({ user: req.user.id });

  res.status(200).json(package);
});

const getAllPackages = asyncHandler(async (req, res) => {
  const package = await Package.find();
  const noDuplicatedPackages = package.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.name === value.name &&
          t.type === value.type &&
          t.weight === value.weight &&
          t.cost === value.cost
      )
  );
  res.status(200).json(noDuplicatedPackages);
});

function createRandomLocation(randomStatus) {
  locationsArray = [];
  const locations = ["AirPort", "Truck", "Warehouse", "Plane"];
  let randomNumberOfStations = Math.floor(Math.random() * 11);

  const retialCenterLocation = new Location({
    name: "The Main Retail Center",
    stage: 1,
  });

  locationsArray.push(retialCenterLocation);

  let i = 1;

  for (i; i <= randomNumberOfStations; i++) {
    const newRandomLocation = new Location({
      name: locations[Math.floor(Math.random() * 4)],
      stage: i + 1,
    });

    newRandomLocation.save();
    locationsArray.push(newRandomLocation);
  }

  const endStatus = new Location({
    name: randomStatus,
    stage: i + 1,
  });

  locationsArray.push(endStatus);

  return locationsArray;
}
function createRandomState() {
  statusArray = ["Transit", "Lost", "Damaged"];
  var prob = Math.random();

  if (prob < 0.9) {
    // 90% chance of being here
    return "Delivered";
  } else {
    return statusArray[Math.floor(Math.random() * 3)];
  }
}

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

// @desc    create Package
// @route   POST /api/package
// @access  Private
const createPackage = asyncHandler(async (req, res) => {
  const { name, weight, type, recEmail, width, height, insurance } = req.body;

  if (
    !name ||
    !weight ||
    !type ||
    !recEmail ||
    !width ||
    !height ||
    !insurance
  ) {
    res.status(400);
    throw new Error("Please add all text fields");
  }

  User.findOne({ email: recEmail }, async function (err, reciver) {
    if (err) {
      res.status(400);
    } else {
      if (reciver === null) {
        res.status(400);
        res.json({ message: "User not found or Email is wrong" });
      } else {
        //req.user.id is accesed after autherization thru authMiddleware
        console.log(req.user.email);
        randomStatus = createRandomState();
        const senderPackage = await new Package({
          user: req.user.id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          width: req.body.width,
          height: req.body.height,
          insurance: req.body.insurance,
          recEmail: req.body.recEmail,
          sendEmail: req.user.email,
          flagStatus: "Sent",
          status: randomStatus,
          cost: calculateCost(
            req.body.type,
            req.body.weight,
            req.body.width,
            req.body.height,
            req.body.insurance
          ).toFixed(2),
        });

        const recieverPackage = await new Package({
          user: reciver._id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          width: req.body.width,
          height: req.body.height,
          insurance: req.body.insurance,
          sendEmail: req.user.email,
          recEmail: req.body.recEmail,
          flagStatus: "Received",
          status: randomStatus,
          cost: calculateCost(
            req.body.type,
            req.body.weight,
            req.body.width,
            req.body.height,
            req.body.insurance
          ).toFixed(2),
        });

        randomLocationsArray = createRandomLocation(randomStatus);
        senderPackage.locations = randomLocationsArray;
        senderPackage.save();
        recieverPackage.locations = randomLocationsArray;
        recieverPackage.save();

        // res.status(200).json(senderPackage);
        res.status(200).json(recieverPackage);
      }
    }
  });
});

// @desc    update Package
// @route   PUT /api/package/:id
// @access  Private
const updatePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }

  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPackage);
});

// @desc    Delete Package
// @route   GET /api/package/:id
// @access  Private
const deletePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the package user
  if (package.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await package.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getAllPackages,
};
