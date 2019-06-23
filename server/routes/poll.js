const router = require('express').Router();
const auth =  require('../middlewares/auth');
const handle = require('../handlers');
//handle.showPolls



router
    .route('/')
    .get(handle.showPolls)
    .post(auth,handle.createPolls);

router
    .get('/user',auth,handle.usersPolls);

router
    .route('/:id')
    .get(handle.getPoll)
    .post(auth,handle.vote)
    .delete(auth,handle.deletePolls);
module.exports = router;