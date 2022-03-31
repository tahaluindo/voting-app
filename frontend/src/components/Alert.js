import { useState } from 'react'
import { CheckCircle, XCircle, ExclamationCircle } from 'react-bootstrap-icons'

const Alert = ({ success, error, message }) => {
  // state show, nilai default adalah true
  // setShow digunakan untuk mengubah value dari state show
  const [show, setShow] = useState(true)

  // Mengubah value show menjadi false
  const hideAlert = () => setShow(false)

  return (
    // Menampilkan alert jika state value alert adalah true
    show && (
      <div className={`alert ${success ? 'success' : 'error'}`}>
        <p>
          {/* Menampilkan icon check jika props success bernilai true */}
          {success && <CheckCircle />}
          {/* Menampilkan icon check jika props success bernilai true */}
          {error && <ExclamationCircle />}
          {message} {/* Menampilkan props message */}
        </p>
        {/* Menambahkan function hideAlert (menyembunyikan alert) saat icon di klik */}
        <XCircle onClick={hideAlert} className='close-alert' />
      </div>
    )
  )
}

export default Alert
