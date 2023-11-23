const logRequestMethod = (req,res,next)=>{
    console.log(`Method: ${req.method}`)
    next()
  }

  module.exports = logRequestMethod