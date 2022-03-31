const db = require('../config/db')

// Add vote
exports.addVote = async (req, res) => {
  // id kandidat yang didapat dari req.params.candidateId
  const { candidateId } = req.params

  // Mencari data kandidat di table candidates dengan mencocokkan id kandidat
  // method .first() untuk mendapatkan object bukan array
  const candidate = await db('candidates').where('id', candidateId).first()

  // Memberikan pesan error jika kandidat tidak ditemukan
  if (!candidate)
    return res.status(404).json({
      success: false,
      message: 'Kandidat tidak ditemukan.',
    })

  // Mencari data vote di table votes dengan mencocokkan user
  // req.user.id didapat dari authentication user yang telah login
  // method .first() untuk mendapatkan object bukan array
  const alreadyVoted = await db('votes').where('user', req.user.id).first()

  // Menampilkan pesan error jika data vote ditemukan
  if (alreadyVoted)
    return res.status(400).json({
      success: false,
      message: 'Kamu hanya bisa melakukan satu kali voting.',
    })

  // Membuat dari vote baru di table votes
  // Datanya berupa user yang berasal dari req.user.id dan candidate yang berasal dari candidateId
  let vote = await db('votes').insert({
    user: req.user.id,
    candidate: candidateId,
  })

  // Mencari data vote yang baru saja di masukkan dengan mencocokkan id-nya
  vote = await db('votes').where('id', vote).first()

  // Mencari kandidat dengan mencocokkan id
  // Mengupdate row total suarannya dengan menambahkan 1 suara
  await db('candidates')
    .where({ id: candidateId })
    .update({
      total_suara: candidate.total_suara + 1,
    })

  // Menampilkan pesan sukses jika voting berhasil
  // Memberikan data voting
  res
    .status(201)
    .json({ success: true, message: 'Voting berhasil.', data: vote })
}

// Get all votes
exports.getVotes = async (req, res) => {
  // Mencari seluruh data voting yang ada di table votes
  const votes = await db('votes')

  // Memberikan respon berhasil
  // Mengirim seluruh data voting yang didapat
  res.json({ success: true, data: votes })
}
