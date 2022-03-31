// Untuk mencari user yang login apakah admin atau bukan
const admin = (req, res, next) => {
  // Melanjutkan eksekusi jika user adalah admin
  if (req.user && req.user.is_admin) {
    next()
  } else {
    // Memberikan respon error jika user bukan admin
    res
      .status(401)
      .json({ success: false, message: 'Akses ditolak, kamu bukan admin.' })
  }
}

module.exports = admin
