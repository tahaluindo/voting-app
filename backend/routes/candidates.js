const router = require('express').Router()
const {
  createCandidate,
  getCandidates,
  getCandidate,
  deleteCandidate,
  updateCandidate,
} = require('../controllers/candidates')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// createCandidate: untuk menambahkan kandidat baru. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum createCandidate
// getCandidates: untuk mengambil seluruh data kandidat
router.route('/').post(auth, admin, createCandidate).get(getCandidates)
// getCandidate: untuk mengambil data kandidat
// deleteCandidate: untuk menghapus kandidat. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum deleteCandidate
// updateCandidate: untuk update kandidat. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum updateCandidate
router
  .route('/:id')
  .get(getCandidate)
  .delete(auth, admin, deleteCandidate)
  .put(auth, admin, updateCandidate)

module.exports = router
