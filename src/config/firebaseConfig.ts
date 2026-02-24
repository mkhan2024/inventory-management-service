// firebase.ts - connect to firestore (dont commit this lol)

import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// secret service account key (NEVER push this to github!!!)
import * as serviceAccount from "../../firebase-service-account.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount), // cast JSON to ServiceAccount type
});

const db = getFirestore(); // db object we use everywhere

export { db }; // make it available