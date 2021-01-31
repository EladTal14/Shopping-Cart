
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByItemname,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('item')
        var items = await collection.find({}).toArray()
        return items
    } catch (err) {
        logger.error('cannot find items here', err)
        throw err
    }
}

async function getById(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        const item = await collection.findOne({ '_id': ObjectId(itemId) })
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}
async function getByItemname(itemname) {
    try {
        const collection = await dbService.getCollection('item')
        const item = await collection.findOne({ itemname })
        return item
    } catch (err) {
        logger.error(`while finding item ${itemname}`, err)
        throw err
    }
}

async function remove(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.deleteOne({ '_id': ObjectId(itemId) })
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function update(item) {
    try {
        // peek only updatable fields!
        const itemToSave = {
            _id: ObjectId(item._id),
            itemname: item.itemname,
            fullname: item.fullname,
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ '_id': itemToSave._id }, { $set: itemToSave })
        return itemToSave;
    } catch (err) {
        logger.error(`cannot update item ${item._id}`, err)
        throw err
    }
}

async function add(item) {
    try {
        // peek only updatable fields!
        const itemToAdd = {
            itemname: item.itemname,
            password: item.password,
            fullname: item.fullname,
        }
        const collection = await dbService.getCollection('item')
        await collection.insertOne(itemToAdd)
        return itemToAdd
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                itemname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


