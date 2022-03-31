const Footer = () => (
  <nav className='fixed-bottom bg-primary py-3 text-white text-center'>
    Copyright @ Abdur Rahim
    {/* Mengambil tahun sekarang */}
    {new Date().getFullYear()}
  </nav>
)

export default Footer
