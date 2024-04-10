const Router = require('express'), router = new Router(), deviceRouter = require('./deviceRouter'),
    userRouter = require('./userRouter'), brandRouter = require('./brandRouter'), typeRouter = require('./typeRouter');
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router