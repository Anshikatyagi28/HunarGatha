import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Import service account JSON (Node 20+ allows assert syntax for JSON)
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function uploadProducts() {
  // Read your data file
  const data = JSON.parse(fs.readFileSync("./products.json", "utf8"));
  const batch = db.batch();

  data.forEach((item) => {
    const docRef = db.collection("products").doc(); // auto ID
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log("✅ All products uploaded successfully!");
}

uploadProducts().catch((error) => {
  console.error("❌ Upload failed:", error);
});
