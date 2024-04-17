export default () => ({
  PORT: process.env.PORT || 4010,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 27017,
  JWT_SECRET: process.env.JWT_SECRET || "Ej!OrtIroit2 (Ej-EXCLAMATION_POINT-Ort-Ir-oit-TWO)"
})
