export default {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_DB_PATH() {
    return process.env.MONGO_DB_PATH;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET;
  },
};
