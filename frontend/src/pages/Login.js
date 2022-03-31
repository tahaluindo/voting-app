import { useState, useEffect } from 'react'
import { BoxArrowInRight } from 'react-bootstrap-icons'
import axios from 'axios'
import Cookie from 'js-cookie'
import loginPicture from '../assets/login.png'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import { api, config } from '../utils'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {
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

  // function handleSubmit yang digunakan untuk men-submit data yang dimasukkan user saat login
  const handleSubmit = async (e) => {
    // Membuat halaman tidak refresh sendiri saat di submit
    e.preventDefault()

    // Mengubah value dari loading menjadi true
    setLoading(true)

    try {
      // Memanggil api dari backend menggunakan axios
      // Data yang dimasukkan adalah email dan password
      // config yang dimasukkan berupa headers yang berisi tipe konten json
      const { data } = await axios.post(
        `${api}/users/login`,
        { email, password },
        config
      )

      // Menyimpan data token mengugunakan js-cookie dengan nama 'token'
      Cookie.set('token', data.token)

      // redirect user ke halaman voting setelah berhasil login
      window.location.href = '/voting'
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
        <div className='col col-12 col-md-6 bg-primary p-4 rounded w3-animate-right'>
          <h2 className='text-center text-white'>Welcome!</h2>
          <h4 className='text-center text-white'>Masukan Account Anda!</h4>

          {/* Menampilkan alert error jika state error tidak bernilai string kosong */}
          {error !== '' && <Alert message={error} error />}

          {/* Menampilkan spinner jika state loading tidak bernilai true */}
          {loading && <Spinner />}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='btn btn-dark rounded-pill px-5 mt-3 text-white'
            >
              <BoxArrowInRight /> Masuk
            </button>
            <p className='text-white mt-5 text-center'>
              Belum punya akun? <Link to='/register'>Daftar disini!</Link>
            </p>
          </form>
        </div>
        <div className='col col-12 col-md-6 w3-animate-left'>
          <img src={loginPicture} alt='login' className='img-fluid' />
        </div>
      </div>
    </div>
  )
}

export default Login
