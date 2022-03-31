import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Link, useLocation } from 'react-router-dom'
import {
  PieChartFill,
  PeopleFill,
  PersonCircle,
  InboxFill,
  BoxArrowInRight,
  BoxArrowInLeft,
} from 'react-bootstrap-icons'
import axios from 'axios'
import { api } from '../utils'

const Header = () => {
  // state token, default value empty string
  // state setToken digunakan untuk mengubah value dari token
  const [token, setToken] = useState('')

  // state name, default value empty string
  // state setName digunakan untuk mengubah value dari name
  const [name, setName] = useState('')

  // state user, default value empty
  // state setUser digunakan untuk mengubah value dari user
  const [user, setUser] = useState()

  // Mendapatkan path url halaman yang sedang diakses
  // Seperti /, /candidates, /voting
  const { pathname } = useLocation()

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

        // Mengubah value name menjadi nama dari user yang sedang login
        setName(data.data.name)

        // Mengubah value user menjadi data user yang sedang login
        setUser(data.data)
      }

      // Memanggil function getUser
      getUser()
    }
  }, [token])

  // function untuk menghandle user yang keluar
  const handleLogout = () => {
    // Menghapus token menggunakan package js-cookie
    Cookie.remove('token')

    // Setelah itu, mendirect user ke halaman login
    window.location.href = '/login'
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary fixed-top'>
      <div className='container'>
        {/* Menggunakan Link dari react-router-dom agar saat pindah halaman tidak loading seperti menggunakan anchor tag */}
        <Link className='navbar-brand' to='/'>
          <h3>E-VOTING</h3>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ms-auto'>
            {/* Menampilkan link menuju halaman user jika state user tidak kosong */}
            {user && (
              <Link
                to={`/user/${user.id}`}
                className='nav-link active me-4 w3-animate-top'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
              >
                <PersonCircle /> {name} {/* Menampilkan state name */}
              </Link>
            )}
            <Link
              to='/quick-count'
              // Mengubah value dari className
              // Jika path halamannya adalah /quick-count maka className 'nav-link active'
              // Jika bukan maka className 'nav-link'
              className={
                pathname === '/quick-count' ? 'nav-link active' : 'nav-link'
              }
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <PieChartFill /> Quick Count
            </Link>
            <Link
              to='/nominees'
              // Mengubah value dari className
              // Jika path halamannya adalah /nominees maka className 'nav-link active'
              // Jika bukan maka className 'nav-link'
              className={
                pathname === '/nominees' ? 'nav-link active' : 'nav-link'
              }
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <PeopleFill /> Nominasi
            </Link>
            <Link
              to='/voting'
              // Mengubah value dari className
              // Jika path halamannya adalah /voting maka className 'nav-link active'
              // Jika bukan maka className 'nav-link'
              className={
                pathname === '/voting' ? 'nav-link active' : 'nav-link'
              }
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <InboxFill /> Voting
            </Link>

            {/* Menampilkan link menuju halaman login jika current pathname-nya bukan /login dan tokennya tidak ada */}
            {pathname !== '/login' && !token && (
              <Link
                to='/login'
                className='nav-link'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
              >
                <BoxArrowInRight /> Masuk
              </Link>
            )}

            {/* Menampilkan menu untuk keluar jika current pathname-nya bukan /login dan terdapat token */}
            {pathname !== '/login' && token && (
              <Link
                to='#'
                className='nav-link'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
                // Menambahkan function handleLogout saat menu di klik
                onClick={() => handleLogout()}
              >
                <BoxArrowInLeft /> Keluar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
