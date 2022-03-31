// Untuk mengenerate token
const jwt = require('jsonwebtoken')
// Database yang digunakan untuk query mysql
const db = require('../config/db')

const auth = async (req, res, next) => {
  // Mengambil token dari header Authorization
  let token = req.headers.authorization

  // Keadaa jika token ditemukan dan header Authorization dimulai dengan string 'Bearer'
  if (token && token.startsWith('Bearer')) {
    try {
      // Memisahkan token dengan string 'Bearer'
      token = token.split(' ')[1]

      // Mengambil data user (berupa id dan email) dari token menggunakan jwt.verify
      // jwt_secret harus dimasukkan di argumen kedua
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Mencari user dengan mencocokkan id
      // method .first() agar berbentuk object bukan array
      // req.user nantinya berisi data user, seperti req.user.id, req.user.name, req.user.email
      req.user = await db('users').where({ id: decoded.id }).first()

      // Melanjutkan eksekusi
      next()
    } catch (error) {
      // Memberikan pesan error jika token tidak valid
      res.status(401).json({ success: false, message: 'Token tidak valid.' })
    }
  } else {
    // Memberikan pesan error jika token tidak ada
    res.status(401).json({ success: false, message: 'Akses ditolak.' })
  }
}

module.exports = auth
