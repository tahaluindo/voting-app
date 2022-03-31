// Route backend
export const api = 'http://localhost:5000/api'

// Configuration headers dengan axios
export const config = { headers: { 'Content-Type': 'application/json' } }

// Array of colors
const colors = [
  'red',
  'blue',
  'purple',
  'yellow',
  'green',
  'orange',
  'brown',
  'black',
]

// function untuk menentukan warna berdasarkan argumen number
export const choseColor = (number) => {
  let newColors = []
  for (let i = 0; i < number; i++) {
    newColors.push(colors[i])
  }
  return newColors
}
