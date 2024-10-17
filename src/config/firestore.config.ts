import { Firestore } from "@google-cloud/firestore";

// Initialize Firestore
export const firestore = new Firestore({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
