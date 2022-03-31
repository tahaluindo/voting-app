import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../utils'
import NomineeCard from '../components/NomineeCard'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import Cookie from 'js-cookie'
import Title from '../components/Title'

const Nominees = () => {
  // state candidates, default value array kosong
  // state setCandidates digunakan untuk mengubah value dari state candidates
  const [candidates, setCandidates] = useState([])

  // state loading, default value adalah false
  // state setLoading digunakan untuk mengubah value dari loading
  // state ini berguna untuk menampilkan atau menyembunyikan spinner
  const [loading, setLoading] = useState(false)

  // state error, default value adalah string kosong
  // state setError digunakan untuk mengubah value dari error
  // state ini berguna untuk menampilkan atau menyembunyikan pesan error
  const [error, setError] = useState('')

  // state token, default value adalah string kosong
  // state setToken digunakan untuk mengubah value dari token
  const [token, setToken] = useState('')

  // state user, default value empty
  // state setUser digunakan untuk mengubah value dari user
  const [user, setUser] = useState()

  // useEffect dieksekusi saat pertama kali halaman dirender
  useEffect(() => {
    async function getCandidates() {
      // Mengubah value dari loading menjadi true
      setLoading(true)

      try {
        // Memanggil api dari backend menggunakan axios
        // api yang dipanggil adalah untuk mendapatkan seluruh data kandidat
        const { data } = await axios.get(`${api}/candidates`)

        // Mengubah value candidates menjadi data yang didapat dari hasil fetching api
        setCandidates(data.data)
      } catch (error) {
        // Mengubah value state error menjadi respon data dari error
        setError(error.response.data)
      }

      // Mengubah kembali value dari loading menjadi false
      setLoading(false)
    }

    // Memanggil function getCandidates()
    getCandidates()
  }, [])

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

  return (
    // Menampilkan teks voting tidak ditemukan jika jumlah data state candidate kurang dari 1 (kosong)
    candidates.length === 0 ? (
      <div>
        <p className='fw-bold text-center fs-2'>Kandidat tidak ditemukan.</p>

        {/* Menampilkan link menuju ke halaman tambah kandidat jika state user tidak kosong dan status dari user adalah sebagai admin */}
        {/* Jika status user bukan admin maka menu tidak akan ditampilkan */}
        {user && user.is_admin === 1 && (
          <div className='d-flex justify-content-center align-items-center'>
            <Link
              to='/nominees/create'
              className='btn btn-warning rounded-pill text-white'
            >
              <Plus /> Tambah Kandidat
            </Link>
          </div>
        )}
      </div>
    ) : (
      <div>
        <Title>KANDIDAT PEMILIHAN PRESIDEN</Title>

        {/* Menampilkan spinner jika state loading bernilai true */}
        {loading && <Spinner />}
        {user && user.is_admin === 1 && (
          <div className='d-flex justify-content-center align-items-center always-on-top'>
            <Link
              to='/nominees/create'
              className='btn btn-warning rounded-pill text-white'
            >
              <Plus /> Tambah Kandidat
            </Link>
          </div>
        )}
        <div className='container d-flex flex-wrap justify-content-center align-items-center w3-animate-bottom'>
          {/* Looping state candidates jika jumlah data dari state candidates lebih dari 0 */}
          {candidates.length > 0 &&
            candidates.map((candidate) => (
              <NomineeCard
                key={candidate.id}
                candidate={candidate}
                setCandidates={setCandidates}
                nominees
              />
            ))}
        </div>
      </div>
    )
  )
}

export default Nominees
