const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
module.exports = {
  query: (text: any, params: any, callback: any) => {
    return pool.query(text, params, callback)
  },
}