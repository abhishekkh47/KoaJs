export default {
  get PORT() {
    return process.env.PORT;
  },
  get GOOGLE_APP_KEY() {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  },
};

export * from "./firestore.config";
