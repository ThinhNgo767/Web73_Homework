const USERS = require("../mock/users");

const authenRegister = (req, res, next) => {
  const user = USERS.find((user) => user.username === req.body.username);
  if (user) {
    return res.json({
        message: "username already exists",
      });
  } else {
    next()
  }
};

const authorizationAdmin = (req,res,next)=>{
  const token = req.headers["x-access-token"]

  if(!token || token !== "YOU_IS_ADMIN"){
   return res.json({
        message : "You not administrator"
    })
  }else{
    next()
  }
}

module.exports = { authenRegister,authorizationAdmin};
