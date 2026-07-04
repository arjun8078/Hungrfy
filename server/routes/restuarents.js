const express = require('express');
const router = express.Router();
const pool  = require('../db');
const auth=require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        cuisine,
        area,
        rating,
        is_veg as "isVeg",
        description,
        address,
        phone,
        opening_hours as "openingHours"
      FROM restaurants 
      ORDER BY rating DESC
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch restaurants' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const restaurantResult = await pool.query(`
      SELECT 
        id,
        name,
        cuisine,
        area,
        rating,
        is_veg as "isVeg",
        description,
        address,
        phone,
        opening_hours as "openingHours"
      FROM restaurants 
      WHERE id = $1
    `, [id])

    if (restaurantResult.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }

    const menuResult = await pool.query(`
      SELECT 
        id,
        name,
        price,
        category,
        is_veg as "isVeg"
      FROM menu_items 
      WHERE restaurant_id = $1
    `, [id])

    const restaurant = {
      ...restaurantResult.rows[0],
      menu: menuResult.rows
    }

    res.json(restaurant)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch restaurant' })
  }
})

router.post('/',auth,async(req,res)=>{
  console.log(' req.body: ',  req.body);
  
  

  try {
  if(req.user.role!=='owner'){
    return res.status(403).json({error:'Only owners can add restaurants'})
  }

  const {name, cuisine, area, address, lat, long, openingHour, phone, isVeg, description} = req.body
  

  if(!name || !cuisine || !area || !address || !lat || !long || !openingHour || !phone || isVeg===undefined ){
    return res.status(400).json({error:'Missing required fields'})
  }

 const result = await pool.query(
  'INSERT INTO restaurants (name, cuisine, area, address, latitude, longitude, opening_hours, phone, is_veg, description, owner_id, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) RETURNING *',
  [name, cuisine, area, address, lat, long, openingHour, phone, isVeg, description, req.user.id]
  )

  const restaurant = result.rows[0]
  return res.status(201).json({ restaurant })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to add restaurant' })
  }
})

module.exports = router