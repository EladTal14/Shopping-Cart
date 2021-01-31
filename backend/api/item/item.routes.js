const express = require('express')
const { getItem, getItems, updateItem } = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getItems)
router.get('/:id', getItem)
router.put('/:id', updateItem)


module.exports = router