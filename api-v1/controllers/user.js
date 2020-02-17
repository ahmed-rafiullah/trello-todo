const express = require('express');
const User = require('../models/user')

const router = express.Router();

// create new todo
router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  res.status(200).json({
    result: 'heh',
    id
  })
});


module.exports = router;