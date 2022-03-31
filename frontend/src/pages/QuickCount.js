import { useEffect, useState } from 'react'
import axios from 'axios'
import { api, choseColor } from '../utils'
import Spinner from '../components/Spinner'
import { Bar, Pie } from 'react-chartjs-2'

const QuickCount = () => {
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

  const labels = []
  const data = []

  // looping state candidates
  // Memasukkan nama ketua dan wakil ketua ke array labels
  // Memasukkan total suara kandidat ke array data
  candidates.forEach((c) => {
    labels.push(`${c.name_of_chairman} & ${c.name_of_vice_chairman}`)
    data.push(c.total_suara)
    return
  })

  // Setting data chart
  const chartData = {
    labels,
    datasets: [
      {
        // labels di dapat dari array labels diatas
        label: '',
        // backgroundColor di dapat dari method choseColor dengan memberikan argumen banyaknya kandidat
        backgroundColor: choseColor(data.length),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        // data di dapat dari array data diatas
        data,
      },
    ],
  }

  return (
    <div className='container'>
      {/* Menampilkan warning jika jumlah kandidat di dalam state candidates sama dengan 0 */}
      {candidates.length === 0 ? (
        <p className='fw-bold text-center fs-2'>Quick count tidak ditemukan.</p>
      ) : (
        <div className='container'>
          {/* Menampilkan spinner jika state loading bernilai true */}
          {loading ? (
            <Spinner />
          ) : (
            // Menampilkan data quick count
            <>
              <span className='badge bg-primary d-block mx-auto text-white rounded-pill'>
                Quick Count
              </span>
              <div className='d-flex flex-wrap w3-animate-zoom mb-4'>
                {/* Looping data kandidat dari state candidates */}
                {candidates.map((candidate, index) => (
                  <div
                    className='card text-center m-3 p-3'
                    style={{ width: '320px' }}
                    key={candidate.id}
                  >
                    <span className='badge bg-dark badges'>{index + 1}</span>
                    {/* Menampilkan nama ketua dan wakil ketua kandidat dari state candidate */}
                    <p>
                      {candidate.name_of_chairman} &{' '}
                      {candidate.name_of_vice_chairman}
                    </p>

                    {/* Menampilkan total suara kandidat dari state candidate */}
                    <h3 className='text-info'>{candidate.total_suara} Suara</h3>
                  </div>
                ))}
              </div>
              <div className='mb-4'>
                <span className='badge bg-primary d-block mx-auto text-white rounded-pill'>
                  Quick Count Dalam Bar Chart
                </span>
                {/* Menampilkan data quick count menggunakan bar chart */}
                <Bar data={chartData} height={100} />
              </div>
              <div className='mb-4'>
                <span className='badge bg-primary d-block mx-auto text-white rounded-pill'>
                  Quick Count Dalam Pie Chart
                </span>
                {/* Menampilkan data quick count menggunakan pie chart */}
                <Pie data={chartData} height={100} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default QuickCount
