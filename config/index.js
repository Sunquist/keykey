module.exports = {
  discord: {
    refreshCommands: true,
  },
  mongo: {
    url: process.env.MONGO_URL,
    database: process.env.MONGO_DB
  }
}
