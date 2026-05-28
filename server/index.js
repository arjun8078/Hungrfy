const express = require('express');
const cors = require('cors');
// const {pool} = require('./db');
require('dotenv').config();
const restaurantRoutes = require('./routes/restuarents');


const app = express();

app.use(cors({
     origin: [
    'http://localhost:5173',
    'https://hungrfy.vercel.app'
  ]
    
}));
app.use(express.json());

app.use('/restaurants', restaurantRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hungryfy API running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
