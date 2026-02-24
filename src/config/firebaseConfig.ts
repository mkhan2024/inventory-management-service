// This file connects our app to Firebase Firestore (our database)

import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";   // import tools to start Firebase
import { getFirestore, Firestore } from "firebase-admin/firestore";       // import Firestore database

// Load our secret service account key (never share this file!)
import * as serviceAccount from "../../firebase-service-account.json";

initializeApp({                                 // start Firebase with our secret key
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();           // create database object we will use everywhere

export { db };                                  // make db available to other files