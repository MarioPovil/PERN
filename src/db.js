const {Pool} = require('pg')

const pool = new Pool({
    user:'postgres',
    password: 'mario100',
    host: 'localhost',
    port: 5432,
    database: ''
})
module.exports=pool;