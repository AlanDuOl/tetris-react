const path = require('path')
// db
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
// connection
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath
    },
    useNullAsDefault: true
})

// Create table
knex.schema
    // Make sure table exists
    .hasTable('record')
    .then((exists) => {
        // If table does not exist, create it
        if (!exists) {
            return knex.schema.createTable('record', (table) => {
                table.increments('id').primary()
                table.integer('value')
            })
                .then(() => {
                    // Log success
                    console.log('Table \'record\' created!')
                })
                .catch((e) => {
                    console.error("There was an error setting up the database: ", e.message)
                })
        }
    })

// Log data for debbugin
knex.select('*').from('record')
    .then(data => console.log('data:', data))
    .catch(err => console.log(err))


module.exports = knex