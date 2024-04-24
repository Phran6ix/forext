export default () => ({
  APP_URL: process.env.APP_URL || "localhost: 7001",
  DB_HOST : process.env.DB_URL || "localhost",
  DB_PORT : process.env.DB_URL || 27017,
  DATABASE: process.env.DATABASE || "fx",
  JWT_SECRET : process.env.JWT_SECRET,
})
