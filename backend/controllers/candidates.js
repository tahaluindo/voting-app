// Database yang digunakan untuk query mysql
const db = require('../config/db')

// Create candidates
exports.createCandidate = async (req, res) => {
  // Inputan dari user
  const {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
    description,
  } = req.body

  // Insert/membuat data kandidat baru ke table candidates dengan dari dari req.body diatas
  let candidate = await db('candidates').insert({
    name_of_chairman: nameOfChairman,
    name_of_vice_chairman: nameOfViceChairman,
    birthday_of_chairman: birthdayOfChairman,
    birthday_of_vice_chairman: birthdayOfViceChairman,
    address_of_chairman: addressOfChairman,
    address_of_vice_chairman: addressOfViceChairman,
    description,
  })

  // Mencari user yang baru dibuat menggunakan id yang didapat dari variabel candidate di atas
  // method .first() agar berbentuk object bukan array
  candidate = await db('candidates').where('id', candidate).first()

  // Memberikan respon berhasil jika semua data diatas berhasil dieksekusi
  // ada success, pesan suksesnya serta data kandidatnya
  res.status(201).json({
    success: true,
    message: 'Kandidat berhasil didaftarkan.',
    data: candidate,
  })
}

// Get candidates
exports.getCandidates = async (req, res) => {
  // Mengambil data seluruh kandidat dari table candidates
  const users = await db('candidates')

  // Mengirim respon berhasil dengan data yang di dapat dari constant users
  res.json({ success: true, data: users })
}

// Get candidate by id
exports.getCandidate = async (req, res) => {
  // id kandidat yang didapat dari req.params.id
  const { id } = req.params

  // Membuat constant untuk mendapatkan data salah satu kandidat dengan mencocokkan id dari table candidates dengan req.params.id
  const candidate = await db('candidates').where({ id }).first()

  // Jika kandidat tidak ditemukan, maka munculkan pesan error dibawah
  if (!candidate)
    return res.status(404).json({
      success: false,
      message: 'Kandidat tidak ditemukan.',
    })

  // jika kandidat ditemukan , maka munculkan pesan dibawah disertai data dari constant candidate
  res.json({ success: true, data: candidate })
}

// Delete candidate
exports.deleteCandidate = async (req, res) => {
  // id kandidat yang didapat dari req.params.id
  const { id } = req.params

  // Mencari Kandidat di table candidates dengan mencocokkan id
  const candidate = await db('candidates').where({ id }).del()

  // Menampilkan pesan error jika kandidat tidak ditemukan
  if (!candidate)
    return res.status(404).json({
      success: false,
      message: 'Kandidat tidak ditemukan.',
    })

  // Menghapus data voting dari user yang telah dihapus di table votes dengan mencocokkan user id dengan req.params.id
  await db('votes').where({ user: id }).del()

  // Memberikan respon berhasil jika kandidat berhasil dihapus
  res.json({ success: true, message: 'Kandidat berhasil dihapus.' })
}

// Update candidate
exports.updateCandidate = async (req, res) => {
  // id kandidat yang didapat dari req.params.id
  const { id } = req.params

  // Data inputan dari client (req.body)
  const {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
  } = req.body

  // Mengupdate data kandidat yang telah ditemukan dengan mencocokkan id di table candidates
  const candidate = await db('candidates').where({ id }).update({
    name_of_chairman: nameOfChairman,
    name_of_vice_chairman: nameOfViceChairman,
    birthday_of_chairman: birthdayOfChairman,
    birthday_of_vice_chairman: birthdayOfViceChairman,
    address_of_chairman: addressOfChairman,
    address_of_vice_chairman: addressOfViceChairman,
  })

  // Memberikan pesan error jika kandidat tidak ditemukan di table kandidat
  if (!candidate)
    return res.status(404).json({
      success: false,
      message: 'Kandidat tidak ditemukan.',
    })

  // Mencari data kandidat yang baru saja di update dengan mencocokan id
  // .first() digunakan agar hasilnya object tidak array
  const updatedCandidate = await db('candidates').where({ id }).first()

  // Memberikan respon berhasil jika kandidat berhasil di update
  res.json({
    success: true,
    mesage: 'Kandidat berhasil diupdate.',
    data: updatedCandidate,
  })
}
