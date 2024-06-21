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
};
