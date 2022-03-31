const router = require('express').Router()
const { addVote, getVotes } = require('../controllers/votes')
const auth = require('../middleware/auth')

// Untuk menambah vote. User harus login terlebih dahulu untuk bisa akses route ini. middleware auth diletakkan sebelum deleteUser
router.route('/:candidateId').post(auth, addVote)
// getVotes: Untuk mengambil seluruh data voting
router.route('/').get(getVotes)

module.exports = router
