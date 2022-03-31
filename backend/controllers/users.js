// Untuk menghash dan membandingkan password
const bcrypt = require('bcrypt')
// Untuk mengenerate token
const jwt = require('jsonwebtoken')
// Database yang digunakan untuk query mysql
const db = require('../config/db')

// Register user/admin
exports.register = async (req, res) => {
  // Input client dari req.body
  const { name, email, password, isAdmin } = req.body

  // Mencari user dengan email yang sama di table users
  // .first() digunakan agar hasilnya object bukan array
  const existingUser = await db('users').where({ email }).first()

  // Jika email yang input oleh client ditemukan ditable users, maka tampilkan pesan error jika email telah digunakan user lain.
  if (existingUser)
    return res.status(400).json({
      success: false,
      message: 'email telah digunakan.',
    })

  // Meng-hash(memanipulasi) password inputan user menggunakan bcrypt.hashSync()
  // constant salt merupakan required dalam melakukan hashing password
  // Tidak harus dengan angka 10. tapi angka 10 paling sering digunakan developer
  const salt = bcrypt.genSaltSync(10)
  const passwordHashed = bcrypt.hashSync(password, salt)

  // Memasukkan data user baru di table user
  const register = await db('users').insert({
    name,
    email,
    password: passwordHashed,
    is_admin: isAdmin,
  })

  // Mencari user yang baru saja mendaftar dengan mencocokkan id
  // .first() digunakan agar hasil yang didapat adalah object bukan array
  const registeredUser = await db('users').where({ id: register }).first()

  // Memberikan respon sukses jika user berhasil mendaftar
  res.json({
    success: true,
    message: 'User berhasil dibuat.',
    data: registeredUser,
  })
}

// Login user
exports.loginUser = async (req, res) => {
  // Input client dari req.body
  const { email, password } = req.body

  // Mencari user dengan mencocokkan email di table users dengan email inputan client
  const existedUser = await db('users').where({ email }).first()

  // Memberikan pesan error jika user tidak ditemukan di table users
  if (!existedUser)
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan',
    })

  // Jika user ditemukan, selanjutnya mencocokkan password inputan client dengan password user yang telah ditemukan menggunkan bcrypt.compare()
  const passwordMatched = await bcrypt.compare(password, existedUser.password)

  // Jika password tidak matching, maka berikan pesan error
  if (!passwordMatched)
    return res.status(401).json({
      success: false,
      message: 'Email dan password tidak cocok.',
    })

  // Membuat token dengan jsonwebtokan menggunakan jwt.sign
  // argumen pertama menggunakan id dan email
  // argumen ke dua menggunkan jwt_secret yang ada di environment
  // argumen ke tiga tidak required, yaitu masa berlakunya token. 7d = 7 hari
  const token = jwt.sign(
    {
      id: existedUser.id,
      email: existedUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )

  // Memberikan respon berhasil jika user berhasil login dan token berhasil dibuat
  res.json({ success: true, message: 'Login berhasil.', token })
}

// Get all users
exports.getUsers = async (req, res) => {
  // Mencari data seluruh users yang ada di table users
  const users = await db('users')

  // Memberikan respon berhasil dengan mengirimkan data users
  res.json({ success: true, data: users })
}

// Get user by id
exports.getUser = async (req, res) => {
  // id user yang didapat dari req.params.id
  const { id } = req.params

  // Mencari user di table users dengan mencocokkan id di table users dengan id dari req.params.id
  const user = await db('users').where({ id }).first()

  // Memberikan pesan error jika user tidak ditemukan
  if (!user)
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.',
    })

  // Memberikan pesan sukses jika user ditemukan dan mengirimkan datanya
  res.json({ success: true, data: user })
}

// Get current user
// Untuk mendapatkan data user yang sedang login
exports.getCurrentUser = async (req, res) => {
  // Mencari user di table users dengan mencocokan id
  // req.user.id di dapat dari middleware authentication user yang telah login
  // .first() agar hasilnya object tidak array
  const user = await db('users').where('id', req.user.id).first()

  // Memberikan pesan error jika user tidak ditemukan
  if (!user)
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.',
    })

  // Memberikan respon sukses dan mengirimkan data user yang telah ditemukan
  res.json({ success: true, data: user })
}

// Update user
exports.updateUser = async (req, res) => {
  // Inputan client yang berupa data name dan email
  const { name, email } = req.body

  // Mencari user dengan mencocokkan id
  // Mengupdate data user yang telah ditemukan
  // req.user.id didapat dari middleware authentication user yang telah login
  await db('users').where('id', req.user.id).update({
    name,
    email,
  })

  // Mencari data user yang baru saja di update
  // .first() digunakan untuk mendapatkan data object bukan array
  // req.user.id didapat dari middleware authentication user yang telah login
  const updatedUser = await db('users').where('id', req.user.id).first()

  // Memberikan respon sukses jika user berhasil di update
  // Mengirim data user yang telah di update
  res.json({
    success: true,
    message: 'User berhasil diupdate.',
    data: updatedUser,
  })
}

// Delete user
exports.deleteUser = async (req, res) => {
  // Id user yang didapat dari req.params.id
  const { id } = req.params

  // Mencari user di table users dengan mencocokkan id
  // Menghapus user jika user ditemukan
  const user = await db('users').where({ id }).del()

  // Memberikan respon error jika user tidak ditemukan
  if (!user)
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.',
    })

  // Memberikan respon sukses jika user berhasil dihapus
  res.json({ success: true, message: 'User berhasil dihapus.' })
}
