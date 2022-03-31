const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

// konfigurasi environment config
dotenv.config({ path: './config/config.env' })

// Agar bisa menambahkan inputan tipe application/json
app.use(express.json())

// Agar bisa diakses di frontend dan menghindari block by CORS
app.use(cors())

// Route testing
app.get('/', (req, res) => res.send('API running...'))

// Route users
app.use('/api/users', require('./routes/users'))
// Route candidates
app.use('/api/candidates', require('./routes/candidates'))
// Route votes
app.use('/api/votes', require('./routes/votes'))

const PORT = process.env.PORT || 5000

// Listening to port dan mengembalikan callback function berupa pesan terhubung di console
app.listen(PORT, () => console.log(`Server terhubung di port ${PORT}`))
