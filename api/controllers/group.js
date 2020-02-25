const express = require('express');
const protectResource = require('./auth')
const {
    groupValidator,
    groupSearchQueryValidator
} = require('../validators/groupValidators')
const Group = require('../models/groups')
const idValidator = require('../validators/idValidator')
const router = express.Router();



// get all groups of current user
router.get('/', protectResource, async (req, res) => {

    try {
        const query = await groupSearchQueryValidator.validateAsync(req.query)
        const userID = req.body._jwt_.xid

        // pagination
        let page = query.page || 1
        let count = query.count || 10
        let offset = (page - 1) * count


        let userGroupQueryBuilder = Group.query().select().where({
            user_id: userID
        })


        if ('sort' in query && 'sort_on' in query) {
            userGroupQueryBuilder = userGroupQueryBuilder
                .orderBy(query.sort_on, query.sort)
        } else {
            // default sorting is based on title and asc
            userGroupQueryBuilder = userGroupQueryBuilder
                .orderBy('group_name', 'asc')
        }


        userGroupQueryBuilder = userGroupQueryBuilder.limit(count).offset(offset)

        userGroups = await userGroupQueryBuilder




        res.status(200).json({
            status: 'success',
            user_groups: userGroups
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }

});


// create a group belonging to current user
router.post('/', protectResource, async (req, res) => {
    try {

        const userID = req.body._jwt_.xid
        let group = await groupValidator.validateAsync(req.body, {
            stripUnknown: true
        })

        // create group
        // add current users id 
        group = {
            ...group,
            user_id: userID
        }

        const result = await Group.query().insert(group)

        res.status(201).json({
            status: 'success',
            message: 'created group',
            group: result
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error',
        })
    }
});



// edit a group name belonging to current user
router.put('/:id', protectResource, async (req, res) => {
    try {
        const groupID = await idValidator.validateAsync(req.params.id)
        const userID = req.body._jwt_.xid


        const group = await groupValidator.validateAsync(req.body, {
            stripUnknown: true
        });

        const updateResult = await Group.query().patch(group).where({
            group_id: groupID,
            user_id: userID
        })

        if (updateResult === 1) {
            res.status(200).json({
                status: 'success',
                message: `updated group with id ${groupID}`,
                updated_fields: group
            })

        } else {
            res.status(404).json({
                status: 'failed',
                message: `group resource with id ${groupID} does not exist`,
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }
});


// delete a group belonging to current user
router.delete('/:id', protectResource, async (req, res) => {
    try {
        const groupID = await idValidator.validateAsync(req.params.id)
        const userID = req.body._jwt_.xid
        const result = await Group.query().del().where({
            user_id: userID,
            group_id: groupID
        })

        if (result === 1) {
            res.status(200).json({
                status: 'success',
                message: `deleted group resource with id ${groupID}`,
            })

        } else {
            res.status(404).json({
                status: 'failed',
                message: `group resource with id ${groupID} does not exist`,
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }


});


module.exports = router;