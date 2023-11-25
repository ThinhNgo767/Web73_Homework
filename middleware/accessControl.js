const USERS = require("../mock/users");

const authenRegister = (req, res, next) => {
  const user = USERS.find((user) => user.username === req.body.username);
  if (!user) {
    next();
  } else {
    return res.json({
      message: "username already exists",
    });
  }
};

// const authenLogin = (req, res,next) => {
  
   
// };

const authorizationAdmin = (req,res,next)=>{
  const token = req.headers["x-access-token"]

  if(!token || token !== "YOU_IS_ADMIN"){
   return res.json({
        message : "Missing access token"
    })
  }else{
    next()
  }
}

module.exports = { authenRegister,authorizationAdmin};
