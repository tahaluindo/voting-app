import { useState, useEffect } from 'react'
import { BoxArrowInRight } from 'react-bootstrap-icons'
import axios from 'axios'
import Cookie from 'js-cookie'
import registerPicture from '../assets/register.jpg'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import { api, config } from '../utils'
import { Link } from 'react-router-dom'

const Register = ({ history }) => {
  // state name, default value adalah string kosong
  // state setName digunakan untuk mengubah value dari state name
  const [name, setName] = useState('')

  // state email, default value adalah string kosong
  // state setEmail digunakan untuk mengubah value dari state email
  const [email, setEmail] = useState('')

  // state password, default value adalah string kosong
  // state setPassword digunakan untuk mengubah value dari state password
  const [password, setPassword] = useState('')

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

    // Jika terdapat token, redirect user ke halaman voting
    // method history.push() digunakan untuk redirect ke halaman tertentu
    // method history didapat dari props history
    if (token) return history.push('/voting')
  }, [])

  // function handleSubmit yang digunakan untuk men-submit data yang dimasukkan user saat mendaftar akun
  const handleSubmit = async (e) => {
    // Membuat halaman tidak refresh sendiri saat di submit
    e.preventDefault()

    // Mengubah value dari loading menjadi true
    setLoading(true)

    try {
      // Memanggil api dari backend menggunakan axios
      // Data yang dimasukkan adalah name, email password, isAdmin yang bernilai default false
      // config yang dimasukkan berupa headers yang berisi tipe konten json
      const { data } = await axios.post(
        `${api}/users`,
        { name, email, password, isAdmin: false },
        config
      )

      // Mengubah value dari state success menjadi string pesan sukses
      setSuccess(data.message)

      // redirect user ke halaman voting setelah berhasil login
      window.location.href = '/login'

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

  return (
    <div className='container'>
      <div className='row d-flex flex-wrap justify-content-center align-items-center'>
        <div className='col col-12 col-md-6 bg-warning p-4 rounded w3-animate-right'>
          <h2 className='text-center text-white'>Welcome!</h2>
          <h4 className='text-center text-white'>
            Segera Daftarkan Akun Anda!
          </h4>
          {/* Menampilkan alert error jika state error tidak bernilai string kosong */}
          {error !== '' && <Alert message={error} error />}

          {/* Menampilkan alert sukses jika state success tidak bernilai string kosong */}
          {success !== '' && <Alert message={success} success />}

          {/* Menampilkan spinner jika state loading tidak bernilai true */}
          {loading && <Spinner />}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                required
                type='text'
                placeholder='Nama'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='btn btn-dark rounded-pill px-5 mt-3 text-white'
            >
              <BoxArrowInRight /> Daftar
            </button>
            <p className='text-white mt-5 text-center'>
              Sudah punya akun? <Link to='/login'>Login disini!</Link>
            </p>
          </form>
        </div>
        <div className='col col-12 col-md-6 w3-animate-left'>
          <img src={registerPicture} alt='login' className='img-fluid' />
        </div>
      </div>
    </div>
  )
}

export default Register
