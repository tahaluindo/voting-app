import React from 'react'
import { XCircle } from 'react-bootstrap-icons'
import Spinner from './Spinner'
import Alert from './Alert'

const Modal = ({ hideModal, handleSubmit, loading, error, success }) => {
  return (
    <div className='modal'>
      <div className='container w3-animate-top'>
        {/* Menambahkan function hideModal saat menu X di klik */}
        {/* function hideModal berasal dari props hideModal yang diterima dari parent component */}
        {/* Saat di klik maka modal-nya otomatis tersembunyi */}
        <XCircle className='close-alert' onClick={hideModal} />
        <div>
          {/* Menampilkan alert sukses jika props success tidak bernilai string kosong */}
          {success !== '' && <Alert success message={success} />}

          {/* Menampilkan alert error jika props error tidak bernilai string kosong */}
          {error !== '' && <Alert error message={error} />}

          {/* Menampilkan spinner jika props loading tidak bernilai true */}
          {loading && <Spinner className='mb-3' />}
          <p>Anda yakin memilih pasangan ini?</p>
          <div className='buttons'>
            {/* Menambah function handleSubmit di button saat button di klik */}
            {/* Jika di klik maka button tersebut akan menghandle proses submit */}
            {/* function handleSubmit berasal dari props handleSubmit yang didapat dari parent component */}
            <button onClick={handleSubmit}>Yes</button>

            {/* Menambah function hideModal di button saat button di klik */}
            {/* Jika di klik maka button tersebut akan menyembunyikan modal */}
            {/* function hideModal berasal dari props hideModal yang didapat dari parent component */}
            <button onClick={hideModal}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
