import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import profilePhoto from '../assets/profile.png'
import axios from 'axios'
import { api } from '../utils'
import Modal from './Modal'
import { TrashFill } from 'react-bootstrap-icons'

const NomineeCard = ({ nominees, voting, candidate, setCandidates }) => {
  // state token, default value empty string
  // state setToken digunakan untuk mengubah value dari token
  const [token, setToken] = useState('')

  // state user, default value empty
  // state setUser digunakan untuk mengubah value dari user
  const [user, setUser] = useState()

  // state showModal, default value adalah false
  // state setShowModal digunakan untuk mengubah value dari showModal
  // state ini berguna untuk menampilkan atau menyembunyikan modal
  const [showModal, setShowModal] = useState(false)

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

  // useEffect dieksekusi saat pertama kali halaman dirender
  useEffect(() => {
    // Mencari token menggunakan package js-cookie
    const token = Cookie.get('token')

    // Mengubah value state token dengan token yang telah ditemukan
    setToken(token)

    // Memanggil function getUser jika token ditemukan
    if (token) {
      async function getUser() {
        // Memanggil api dari backend menggunakan axios
        // getUser digunakan untuk mengambil data user yang sedang login
        // argumen headers Authorization digunakan untuk otentikasi user menggunakan token
        const { data } = await axios.get(`${api}/users/auth`, {
          headers: { Authorization: 'Bearer ' + token },
        })

        // Mengubah value user menjadi data user yang sedang login
        setUser(data.data)
      }

      // Memanggil function getUser
      getUser()
    }
  }, [token])

  // function hideModal digunakan untuk mengubah value dari modal menjadi false
  const hideModal = () => setShowModal(false)

  // function handleSubmit digunakan untuk mengeksekusi penambahan suara voting dari api di backend
  const handleSubmit = async (candidateId) => {
    // Mengubah value dari loading menjadi true
    setLoading(true)

    try {
      // Memanggil api dari backend menggunakan axios
      // argumen headers Authorization digunakan untuk otentikasi user menggunakan token
      const { data } = await axios.post(
        `${api}/votes/${candidateId}`,
        {},
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )

      // Mengubah value dari state success menjadi string pesan sukses
      setSuccess(data.message)

      // Mengubah kembali value state success menjadi string kosong setelah 3 detik
      setTimeout(() => {
        setSuccess('')
      }, 3000)
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

  // function handleDelete digunakan untuk menghandle proses penghapusan kandidat
  const handleDelete = async (candidateId) => {
    try {
      // Memanggil api dari backend menggunakan axios
      // argumen headers Authorization digunakan untuk otentikasi user menggunakan token
      await axios.delete(`${api}/candidates/${candidateId}`, {
        headers: { Authorization: 'Bearer ' + token },
      })

      // Untuk mendapatkan kembali seluruh data user setelah proses penghapusan
      // Ini digunakan agar state candidates berubah setelah proses penghapusan selesai dilakukan
      const { data } = await axios.get(`${api}/candidates`)

      // Mengubah data setCandidates menjadi data baru setelah proses penghapusan selesai
      setCandidates(data.data)
    } catch (error) {
      // Mengubah value dari state error menjadi string pesan error
      setError(error.response.data.message)

      // Mengubah kembali value state error menjadi string kosong setelah 3 detik
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <>
      {/* Menampilkan modal jika value dari showModal adalah true */}
      {showModal && (
        <Modal
          hideModal={hideModal}
          loading={loading}
          error={error}
          success={success}
          handleSubmit={() => handleSubmit(candidate.id)}
        />
      )}
      <div className='card m-3' style={{ width: '360px' }}>
        <div className='card-body'>
          {/* Menampilkan menu hapus jika state user tidak kosong dan status dari user adalah sebagai admin */}
          {/* Jika status user bukan admin maka menu tidak akan ditampilkan */}
          {user && user.is_admin === 1 && (
            <TrashFill
              className='delete-icon'
              onClick={() => handleDelete(candidate.id)}
            />
          )}
          <div className='row'>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <img src={profilePhoto} alt='profile' className='img-card' />

              {/* Menampilkan nama ketua kandidat dari props candidate */}
              {/* props candidate di dapat dari parent component */}
              <p>{candidate.name_of_chairman}</p>
              <p>(Ketua)</p>
            </div>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <img src={profilePhoto} alt='profile' className='img-card' />

              {/* Menampilkan nama wakil ketua kandidat dari props candidate */}
              {/* props candidate di dapat dari parent component */}
              <p>{candidate.name_of_vice_chairman}</p>
              <p>(Wakil Ketua)</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              {/* Menampilkan link menuju ke halaman profil kandidat jika props nominees bernilai true */}
              {nominees && (
                <div className='d-grid gap-2'>
                  <Link
                    to={`/nominees/${candidate.id}`}
                    className='btn btn-primary rounded-pill'
                  >
                    Lihat Selengkapnya &#8594;
                  </Link>
                </div>
              )}

              {/* Menampilkan button jika props voting bernilai true */}
              {/* Menambahkan function setShoModal (menampilkan modal) saat button di klik */}
              {voting && (
                <div className='d-grid gap-2'>
                  <button
                    className='btn btn-success rounded-pill'
                    onClick={() => setShowModal(true)}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NomineeCard
