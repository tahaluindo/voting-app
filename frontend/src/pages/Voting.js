import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../utils'
import NomineeCard from '../components/NomineeCard'
import Spinner from '../components/Spinner'
import Title from '../components/Title'

const Voting = () => {
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

  return (
    // Menampilkan teks voting tidak ditemukan jika jumlah data state candidate kurang dari 1 (kosong)
    candidates.length === 0 ? (
      <p className='fw-bold text-center fs-2'>Voting tidak ditemukan.</p>
    ) : (
      // Menampilkan halaman untuk voting jika jumlah data state lebih dari kosong
      <div>
        <Title>E-VOTING PEMILIHAN PRESIDEN</Title>

        {/* Menampilkan spinner jika state loading bernilai true */}
        {loading && <Spinner />}
        <div className='container d-flex flex-wrap justify-content-center align-items-center w3-animate-bottom'>
          {/* Looping state candidates jika jumlah data dari state candidates lebih dari 0 */}
          {candidates.length > 0 &&
            candidates.map((candidate) => (
              <NomineeCard key={candidate.id} candidate={candidate} voting />
            ))}
        </div>
      </div>
    )
  )
}

export default Voting
