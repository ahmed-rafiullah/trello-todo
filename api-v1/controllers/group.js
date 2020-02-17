const express = require('express');

const router = express.Router();

// get a group belonging to current user
router.get('/:id', (req, res) => {
    throw new Error('sheet')
    res.status(200).json({
        result: 'get a group belonging to current user'
    })
});

// get all groups of current user
router.get('/', (req, res) => {
    res.status(200).json({
        result: 'get all groups belonging to current user'
    })
});


// create a group belonging to current user
router.post('/', (req, res) => {
    res.status(201).json({
        result: 'create a group belonging to current user'
    })
});


// delete a group belonging to current user
router.delete('/:id', (req, res) => {
    res.status(200).json({
        result: 'delete a group belonging to current user'
    })
});


// edit a group name belonging to current user
router.patch('/:id', (req, res) => {
    res.status(200).json({
        result: 'patch a group name belonging to current user'
    })
});


module.exports = router;