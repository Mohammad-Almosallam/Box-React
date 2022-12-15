const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");


// @desc    register Card
// @route   POST /api/payment
// @access  Private
const registerCard = asyncHandler(async (req, res) => {
    
        const { name, number, CVV, type, expirationM, expirationY} = req.body;
      
        if (!name || !number || !CVV || !type || !expirationM || !expirationY) {
          res.status(400);
          throw new Error("All information fields are required");
        }
        
        const newPayment=await new Payment({
            name:req.body.name, 
            number:req.body.number,
            CVV:req.body.CVV,
            type:req.body.type,
            expirationM:req.body.expirationM,
            expirationY:req.body.expirationY
          })
          newPayment.save()

        foundUser= await User.findById(req.user.id)
        userCards=foundUser.cards
        userCards.push(newPayment)

        User.findByIdAndUpdate(req.user.id,{cards:userCards},function(err,result){
            if(err){
                res.send(err)
            }
        })

        res.status(200).json(newPayment);

      });


module.exports = {
  registerCard
};
