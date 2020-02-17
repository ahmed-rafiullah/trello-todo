const express = require('express');

const router = express.Router();

// get a todo belonging to current user
router.get('/:id', (req, res) => {
    res.status(200).json({
        result: 'get a todo belonging to current user'
    })
});

// get all todos of current user
router.get('/', (req, res) => {
    res.status(200).json({
        result: 'get all todos belonging to current user'
    })
});


// create a todo belonging to current user
router.post('/', (req, res) => {
    const todo = {
        title: req.body.title,
        description: req.body.title
    }
    res.status(201).json({
        result: 'create a todo belonging to current user',
        todo
    })
});


// delete a todo belonging to current user
router.delete('/:id', (req, res) => {
    res.status(200).json({
        result: 'delete a todo belonging to current user'
    })
});


// edit a todo belonging to current user
router.patch('/:id', (req, res) => {
    res.status(200).json({
        result: 'patch a todo belonging to current user'
    })
});


module.exports = router;