
// Import knex db
const knex = require('./../db')

// Retrieve all data
exports.getData = async (req, res) => {
    knex('record')
        .select('*')
            .then(data => {
                res.json(data)
            })
            .catch (e => {
                res.json({ message: `There was an error retrieving data ${e.message}` })
            })
}

exports.updateData = async (req, res) => {
    knex('record')
        .update({ value: req.body.record })
        .where('id', req.body.id)
        .then(() => {
            res.json({ message: `Updated field with id ${req.body.id}` })
        })
        .catch(e => {
            res.json({ message: `Failed to update field with id ${req.body.id}` })
        })
}