const express = require('express')
const router = express.Router()
const {postVoterandsentvoterpasskey,validatePasskey,countVoters,fetchAllemails} = require('../../controllers/Votercontroll/votercontrl')
const {validateToken} = require('../../auth/jwt')
router.post('/post/voter',postVoterandsentvoterpasskey)
router.post('/post/key',validatePasskey)
router.get('/count/voters',validateToken,countVoters)
router.get('/get/allemails',validateToken,fetchAllemails)


 




module.exports = router