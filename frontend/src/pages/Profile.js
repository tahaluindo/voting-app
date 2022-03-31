import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import { api } from '../utils'
import profileImage from '../assets/profile.png'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const Profile = () => {
  // state token, default value empty string
  // state setToken digunakan untuk mengubah value dari token
  const [token, setToken] = useState('')

  // state user, default value empty
  // state setUser digunakan untuk mengubah value dari user
  const [user, setUser] = useState()

  // state name, default value empty string
  // state setName digunakan untuk mengubah value dari name
  const [name, setName] = useState('')

  // state email, default value empty string
  // state setEmail digunakan untuk mengubah value dari email
  const [email, setEmail] = useState('')

  // state loading, default value adalah false
  // state setLoading digunakan untuk mengubah value dari loading
  // state ini berguna untuk menampilkan atau menyembunyikan spinner
  const [loading, setLoading] = useState(false)

  // state success, default value adalah string kosong
  // state setSuccess digunakan untuk mengubah value dari success
  // state ini berguna untuk menampilkan atau menyembunyikan pesan sukses
  const [success, setSuccess] = useState('')

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

        // Mengubah value state user menjadi data user yang sedang login
        setUser(data.data)

        // Mengubah value state name menjadi nama user yang sedang login
        setName(data.data.name)

        // Mengubah value state email menjadi email user yang sedang login
        setEmail(data.data.email)
      }

      // Memanggil function getUser
      getUser()
    }
  }, [token])

  const handleSubmit = async (e) => {
    // Mencegah refresh halaman saat submit
    e.preventDefault()

    // Mengubah value dari loading menjadi true
    setLoading(true)

    try {
      // Memanggil api dari backend menggunakan axios
      // argumen headers Authorization digunakan untuk otentikasi user menggunakan token
      const { data } = await axios.put(
        `${api}/users`,
        { name, email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )

      // Mengubah value user menjadi data user yang telah diupdate
      setUser(data.data)

      // Mengubah value state name menjadi nama user yang telah diupdate
      setName(data.data.name)

      // Mengubah value state email menjadi email user yang telah diupdate
      setEmail(data.data.email)

      // Mengubah value state success menjadi pesan sukses
      setSuccess(data.message)

      // Mengubah kembali value dari loading menjadi false
      setLoading(false)

      // Mengubah kembali value state success menjadi string kosong setelah 3 detik
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (error) {
      // Menampilkan pesan error di console
      console.log(error)
    }
  }

  return (
    <div className='d-sm-flex justify-content-center align-items-start'>
      {/* Ditampilkan jika state user tidak kosong */}
      {user ? (
        <>
          <div className='card me-2' style={{ width: '20rem' }}>
            <img src={profileImage} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center mb-3 border-bottom'>
                {/* Menampilkan nama user dari state candidate */}
                {user.name}
              </h5>

              {/* Menampilkan email user dari state candidate */}
              <p className='card-text'>&#9830; Email: {user.email}</p>

              {/* Menampilkan admin user */}
              {/* Jika user adalah admin maka string Yes akan muncul */}
              {/* Jika user bukan admin maka string No akan muncul */}
              <p className='card-text'>
                &#9830; Admin: {user.is_admin === 1 ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          <div className='card' style={{ width: '20rem' }}>
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center mb-3 border-bottom'>
                Update Profile
              </h5>
              {/* Menampilkan spinner jika state loading bernilai true */}
              {loading && <Spinner />}

              {/* Menampilkan alert sukses jika state success tidak bernilai string kosong */}
              {success !== '' && <Alert message={success} success />}
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    required
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    required
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='d-grid gap-2'>
                  <button
                    type='submit'
                    className='btn btn-success rounded-pill'
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        //  Ditampilkan jika state user tidak kosong
        <Spinner />
      )}
    </div>
  )
}

export default Profile
