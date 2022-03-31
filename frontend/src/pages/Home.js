import { Link } from 'react-router-dom'
import evotingImage from '../assets/evoting.png'

const Home = () => {
  return (
    <div className='container py-6 home'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col col-12 col-lg-4 col-md-6 col-sm-12 w3-animate-left'>
          <img src={evotingImage} alt='evoting' className='img-fluid' />
        </div>
        <div className='col col-12 col-lg-8 col-md-6 col-sm-12 text-center w3-animate-right'>
          <h3 className='mb-3'>
            Selamat Datang di Aplikasi Voting Berbasis Online
          </h3>
          <p className='mb-3'>
            Pilih Nominasi Terbaik Pilihanmu Dimana Saja, Tanpa Ribet
          </p>
          {/* Link menuju ke halaman voting */}
          {/* Menggunakan Link dari react-router-dom agar tidak refresh saat berpindah halaman */}
          <Link
            to='/voting'
            className='btn btn-success rounded-pill me-3 mb-3 px-3'
          >
            Pilih Sekarang Juga
          </Link>

          {/* Link menuju ke halaman kandidat */}
          {/* Menggunakan Link dari react-router-dom agar tidak refresh saat berpindah halaman */}
          <Link
            to='/nominees'
            className='btn btn-warning rounded-pill me-3 mb-3 px-3 text-white'
          >
            Review Para Nominasi
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
