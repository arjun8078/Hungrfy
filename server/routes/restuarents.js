const express = require('express');
const router = express.Router();
const pool  = require('../db');

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

module.exports = router