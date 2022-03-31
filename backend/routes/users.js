const router = require('express').Router()
const {
  register,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/users')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// loginUser: untuk login user
router.route('/login').post(loginUser)
// getCurrentUser: untuk mengambil data user yang sedang login. User harus login terlebih dahulu
router.route('/auth').get(auth, getCurrentUser)
// register: untuk mendaftar akun user
// getUsers: untuk mengambil seluruh data user. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum getUsers
// updateUser: untuk mengupdate data user. User yang sedang login yang bisa mengakses route ini. middleware auth diletakkan sebelum updateUser
router
  .route('/')
  .post(register)
  .get(auth, admin, getUsers)
  .put(auth, updateUser)
// getUser: untuk mengambil data user. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum getUser
// deleteUser: untuk menghapus user. Hanya bisa dilakukan oleh admin. middleware auth dan admin diletakkan sebelum deleteUser
router.route('/:id').get(auth, admin, getUser).delete(auth, admin, deleteUser)

module.exports = router
