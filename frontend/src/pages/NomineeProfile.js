import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../utils'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import profileImage from '../assets/profile.png'
import moment from 'moment'
import 'moment/locale/id'
moment.locale()

const NomineeProfile = ({ match }) => {
  // id kandidat yang di dapat dari match.params.id
  // match.params.id didapat dari path url, seperti /candidate/1 (maka 1 adalah id kandidatnya)
  const id = match.params.id

  // state candidate, default value kosong
  // state setCandidate digunakan untuk mengubah value dari state candidate
  const [candidate, setCandidate] = useState()

  // useEffect dieksekusi saat pertama kali halaman dirender
  useEffect(() => {
    async function getCandidate() {
      try {
        // Memanggil api dari backend menggunakan axios
        // api yang dipanggil adalah untuk mendapatkan data kandidat berdasarkan id dari match.params.id
        const { data } = await axios.get(`${api}/candidates/${id}`)

        // Mengubah value state candidate menjadi data yang didapat dari hasil fetching api
        setCandidate(data.data)
      } catch (error) {
        // Menampilkan pesan error di console jika terjadi error saat fetching api
        console.log(error)
      }
    }

    // Memanggil function getCandidates()
    getCandidate()
  }, [])

  return (
    // Menampilkan data kandidat jika data state candidate tidak kosong
    candidate ? (
      <div>
        {/* Menampilkan deskripsi kandidat dari state candidate */}
        <Alert success message={candidate.description} />
        <div className='d-sm-flex justify-content-center align-items-center'>
          <div className='card me-2' style={{ width: '18rem' }}>
            <img src={profileImage} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center'>
                {/* Menampilkan nama ketua kandidat dari state candidate */}
                {candidate.name_of_chairman}
              </h5>
              <h6 className='fw-bold border-bottom mb-3 text-center'>
                (Ketua)
              </h6>
              <p className='card-text'>
                {/* Menampilkan alamat ketua kandidat dari state candidate */}
                &#9830; Alamat: {candidate.address_of_chairman}
              </p>
              <p className='card-text'>
                {/* Menampilkan tanggal lahir ketua kandidat dari state candidate menggunakan format waktu dari momentjs */}
                &#9830; Tanggal Lahir:{' '}
                {moment(candidate.birthday_of_chairman).calendar()}
              </p>
            </div>
          </div>
          <div className='card' style={{ width: '18rem' }}>
            <img src={profileImage} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center'>
                {/* Menampilkan nama wakil ketua kandidat dari state candidate */}
                {candidate.name_of_vice_chairman}
              </h5>
              <h6 className='fw-bold border-bottom mb-3 text-center'>
                (Wakil Ketua)
              </h6>
              <p className='card-text'>
                {/* Menampilkan alamat wakil ketua kandidat dari state candidate */}
                &#9830; Alamat: {candidate.address_of_vice_chairman}
              </p>
              <p className='card-text'>
                {/* Menampilkan tanggal lahir wakil ketua kandidat dari state candidate menggunakan format waktu dari momentjs */}
                &#9830; Tanggal Lahir:{' '}
                {moment(candidate.birthday_of_vice_chairman).calendar()}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      // Menampilkan spinner jika state candidate kosong
      <Spinner />
    )
  )
}

export default NomineeProfile
