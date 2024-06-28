export default {
  get PORT() {
    return process.env.PORT;
  },
  get ADMIN_SECRET() {
    return process.env.ADMIN_SECRET;
  },
  get MONGO_DB_PATH() {
    return process.env.MONGO_DB_PATH;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET;
  },
  get JWT_EXPIRE() {
    return process.env.JWT_EXPIRE;
  },
  get DB_TYPE() {
    return process.env.DB_TYPE;
  },
};
