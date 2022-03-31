const Title = ({ children }) => {
  return (
    <div>
      <p class='fs-2 text-center'>
        {/* Menampilkan isi props children yang didapat dari parent component */}
        {children}
      </p>
    </div>
  )
}

export default Title
