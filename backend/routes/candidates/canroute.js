const express = require('express')
const router = express.Router()
const {validateToken} = require('../../auth/jwt')

const {postCandidate,fetchAzimio,fetchUDA,fetchRoots,fetchAgano} = require('../../controllers/cand/cancontroller')


router.get('/get/agano',validateToken,fetchAgano)
router.get('/get/roots',validateToken,fetchRoots)
router.get('/get/uda',validateToken,fetchUDA)
router.get('/get/azimio',validateToken,fetchAzimio)
router.post('/post/candidate',validateToken,postCandidate)
module.exports = router  