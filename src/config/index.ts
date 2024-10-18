export default {
  get PORT() {
    return process.env.PORT;
  },
  get GCP_PROJECT_ID() {
    return process.env.GCP_PROJECT_ID;
  },
  get GOOGLE_APPLICATION_CREDENTIALS() {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET;
  },
};

export * from "./firestore.config";
