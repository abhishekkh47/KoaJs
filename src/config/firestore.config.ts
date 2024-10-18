import admin from "firebase-admin";
const serviceAccount = require("/Volumes/Data/Projects/node-koa/firestore.admin.config.json");
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.log("ERROR : ", error);
}

export const firestore = admin.firestore();
