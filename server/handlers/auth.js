const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req,res,next)=>{
  try {
      const user = await db.User.create(req.body);
      const {id, username} = user;

      const token = jwt.sign({id, username} , process.env.SECRET);

      res.status(201).json({id, username ,token });
  }  catch (e) {
      if(e.code===11000){
          e.message = 'Sorry, Username is taken'
      }
      next(e);
  }
};
exports.login = async (req,res,next)=> {
    try{
        const user = await db.User.findOne({ username : req.body.username});
        const {id, username} = user;
        const valid =await user.comparePassword(req.body.password);
        if(valid){
            const token = jwt.sign({id, username} , process.env.SECRET);
            res.json({id, username, token });
        }else {
            throw new Error();
        }

    }catch (e) {
        e.message = 'Invalid Username/password';
        next(e)
    }
};