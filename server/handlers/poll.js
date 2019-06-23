const db = require('../models');

exports.showPolls = async (req, res, next)=>{
  try{
      const polls = await db.Poll.find()
          .populate('user',['username','id']);
      res.status(200).json(polls);
  }  catch (e) {
      e.status = 400;
      next(e);
  }
};
exports.createPolls = async (req,res,next)=>{
    try{
        console.log(req.decoded);
        const {id} = req.decoded;
        const user = await db.User.findById(id);

        const {question,options} = req.body;
        const poll = await db.Poll.create({
            question,
            user,
            options: options.map(option=>({
                option,
                votes:0
            }))
        });
        user.polls.push(poll._id);
        await user.save();
        res.status(201).json({...poll._doc, user : user._id});
    }catch (e) {
        next(e)
    }
};

exports.usersPolls = async (req,res,next)=>{
  try{
      const {id} = req.decoded;
      const user = await db.User.findById(id)
      .populate('polls');

      res.status(200).json(user.polls);
  }  catch (e) {
      e.status = 400;
      next(e)
  }
};

exports.getPoll = async (req,res,next)=>{
    try{
        const {id}=req.params;
        const poll= await db.Poll.findById(id)
            .populate('user',['username','id']);
        if(!poll) throw new Error('No polls');

        res.status(200).json(poll);
    }catch (e) {
        e.status= 400;
        next(e)
    }
};

exports.deletePolls = async (req,res,next)=>{
  try{
      const{id : pollId}=req.params;
      const{id : userId}=req.decoded;
      const poll = await db.Poll.findById(pollId);
      if(!poll) throw new Error('No poll found');
      if(poll.user.toString()!==userId){
          throw new Error('Unauthorized Access');
      }
      await poll.remove();
      res.status(202).json(poll);
  }  catch (e) {
      e.status=400;
      next(e)
  }
};

exports.vote = async (req, res, next) => {

    try {
        const { id: pollId } = req.params;
        const { id: userId } = req.decoded;
        const { answer } = req.body;
        if (answer) {
            const poll = await db.Poll.findById(pollId);
            if (!poll) throw new Error('No poll found');

            const vote = poll.options.map(
                option =>
                    option.option === answer
                        ? {
                            option: option.option,
                            _id: option._id,
                            votes: option.votes + 1,
                        }
                        : option,
            );

            // console.log('VOTE: USERID ', userId);
            // console.log('VOTE: poll.voted ', poll.voted);
            // console.log(
            //     'VOTE: vote filter',
            //     poll.voted.filter(user => user.toString() === userId).length,
            // );

            if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save();

                res.status(202).json(poll);
            } else {
                throw new Error('Already voted');
            }
        } else {
            throw new Error('No Answer Provided');
        }
    } catch (err) {
       err.status = 400;
       next(err);
    }
};