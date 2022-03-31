import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import { api } from '../utils'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const CreateNominee = () => {
  // state nameOfChairman, default value adalah string kosong
  // state setNameOfChairman digunakan untuk mengubah value dari state nameOfChairman
  const [nameOfChairman, setNameOfChairman] = useState('')

  // state nameOfViceChairman, default value adalah string kosong
  // state setNameOfViceChairman digunakan untuk mengubah value dari state nameOfViceChairman
  const [nameOfViceChairman, setNameOfViceChairman] = useState('')

  // state birthdayOfChairman, default value adalah string kosong
  // state setBirthdayOfChairman digunakan untuk mengubah value dari state birthdayOfChairman
  const [birthdayOfChairman, setBirthdayOfChairman] = useState('')

  // state birthdayOfViceChairman, default value adalah string kosong
  // state setBirthdayOfViceChairman digunakan untuk mengubah value dari state birthdayOfViceChairman
  const [birthdayOfViceChairman, setBirthdayOfViceChairman] = useState('')

  // state addressOfChairman, default value adalah string kosong
  // state setAddressOfChairman digunakan untuk mengubah value dari state addressOfChairman
  const [addressOfChairman, setAddressOfChairman] = useState('')

  // state addressOfViceChairman, default value adalah string kosong
  // state setAddressOfViceChairman digunakan untuk mengubah value dari state addressOfViceChairman
  const [addressOfViceChairman, setAddressOfViceChairman] = useState('')

  // state description, default value adalah string kosong
  // state setDescription digunakan untuk mengubah value dari state description
  const [description, setDescription] = useState('')

  // state loading, default value adalah false
  // state setLoading digunakan untuk mengubah value dari loading
  // state ini berguna untuk menampilkan atau menyembunyikan spinner
  const [loading, setLoading] = useState(false)

  // state success, default value adalah string kosong
  // state setSuccess digunakan untuk mengubah value dari success
  // state ini berguna untuk menampilkan atau menyembunyikan pesan sukses
  const [success, setSuccess] = useState('')

  // state error, default value adalah string kosong
  // state setError digunakan untuk mengubah value dari error
  // state ini berguna untuk menampilkan atau menyembunyikan pesan error
  const [error, setError] = useState('')

  // state token, default value empty string
  // state setToken digunakan untuk mengubah value dari token
  const [token, setToken] = useState('')

  // useEffect dieksekusi saat pertama kali halaman dirender
  useEffect(() => {
    // Mencari token menggunakan package js-cookie
    const token = Cookie.get('token')

    // Mengubah value state token dengan token yang telah ditemukan
    setToken(token)
  }, [token])

  // function handleSubmit yang digunakan untuk men-submit data yang dimasukkan admin saat mendaftarkan kandidat
  const handleSubmit = async (e) => {
    // Membuat halaman tidak refresh sendiri saat di submit
    e.preventDefault()

    // Mengubah value dari loading menjadi true
    setLoading(true)

    try {
      // Memanggil api dari backend menggunakan axios
      // argumen headers Authorization digunakan untuk otentikasi user menggunakan token
      const { data } = await axios.post(
        `${api}/candidates`,
        {
          nameOfChairman,
          nameOfViceChairman,
          birthdayOfChairman,
          birthdayOfViceChairman,
          addressOfChairman,
          addressOfViceChairman,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )

      // Mengubah value dari state success menjadi string pesan sukses
      setSuccess(data.message)

      // Mengubah kembali value state success menjadi string kosong setelah 3 detik
      setTimeout(() => {
        setSuccess('')
      }, 3000)

      // Mengosongkan kembali state-state
      setNameOfChairman('')
      setNameOfViceChairman('')
      setBirthdayOfChairman('')
      setBirthdayOfViceChairman('')
      setAddressOfChairman('')
      setAddressOfViceChairman('')
    } catch (error) {
      // Mengubah value dari state error menjadi string pesan error
      setError(error.response.data.message)

      // Mengubah kembali value state error menjadi string kosong setelah 3 detik
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    // Mengubah kembali value dari loading menjadi false
    setLoading(false)
  }

  return (
    <div className='d-sm-flex justify-content-center align-items-center'>
      <div className='card' style={{ width: '340px' }}>
        <div className='card-body'>
          <h5 className='card-title fw-bold text-center mb-3 border-bottom pb-2'>
            Tambah Kandidat
          </h5>
          {/* Menampilkan spinner jika props loading tidak bernilai true */}
          {loading && <Spinner />}

          {/* Menampilkan alert sukses jika state success tidak bernilai string kosong */}
          {success !== '' && <Alert message={success} success />}

          {/* Menampilkan alert error jika state error tidak bernilai string kosong */}
          {error !== '' && <Alert message={error} error />}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                required
                type='text'
                placeholder='Nama Ketua'
                value={nameOfChairman}
                onChange={(e) => setNameOfChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type='text'
                placeholder='Nama Wakil Ketua'
                value={nameOfViceChairman}
                onChange={(e) => setNameOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <p class='fw-light'>Tanggal Lahir Ketua</p>
              <input
                required
                type='date'
                placeholder='Tanggal Lahir Ketua'
                value={birthdayOfChairman}
                onChange={(e) => setBirthdayOfChairman(e.target.value)}
              />
            </div>
            <div>
              <p class='fw-light'>Tanggal Lahir Wakil Ketua</p>
              <input
                required
                type='date'
                placeholder='Tanggal Lahir Wakil Ketua'
                value={birthdayOfViceChairman}
                onChange={(e) => setBirthdayOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type='text'
                placeholder='Alamat Ketua'
                value={addressOfChairman}
                onChange={(e) => setAddressOfChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type='text'
                placeholder='Alamat Wakil Ketua'
                value={addressOfViceChairman}
                onChange={(e) => setAddressOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder='Deskripsi'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='d-grid gap-2'>
              <button type='submit' className='btn btn-success rounded-pill'>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNominee
