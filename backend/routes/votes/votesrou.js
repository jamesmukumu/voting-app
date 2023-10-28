const express = require('express')
const router = express.Router()
const {postVoteAzimio,postVoteuda,postVoteroots,postVoteagano,countVotesUda,countVotesagano,countazimio,countVotesroots,countAllvotes} = require('../../controllers/votes/votescontr')
const {validateToken} = require('../../auth/jwt')

router.post('/post/vote/azimio',validateToken,postVoteAzimio)
router.post('/post/vote/uda',validateToken,postVoteuda)
router.post('/post/vote/roots',validateToken,postVoteroots)
router.post('/post/vote/agano',validateToken,postVoteagano)











//count uda
router.get('/count/votes/uda',validateToken,countVotesUda)
//count votes azimio
router.get('/count/votes/azimio',validateToken,countazimio)

//count agano
router.get('/count/votes/agano',validateToken,countVotesagano)

//count roots
router.get('/count/votes/roots',validateToken,countVotesroots)
//count all votes casted in the db
router.get('/all/votes',validateToken,countAllvotes)




module.exports = router
