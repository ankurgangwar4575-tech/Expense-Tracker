const AsyncHandler=require('../utils/AsyncHandler.js');

// register user(sign-up)
// login user(sign-in)
// logoutuser(sign-out)

const registerUser=AsyncHandler(async(req,res)=>{
    // take data from user
    // check for data
    // password hash
    // profile photo check,upload on cloudinary
    // check if uploaded
    // create user
    // refresh token access token
    // response send
});
const loginUser=AsyncHandler(async(req,res)=>{

});
const logoutUser=AsyncHandler(async(req,res)=>{

});

module.exports={registerUser,loginUser,logoutUser};