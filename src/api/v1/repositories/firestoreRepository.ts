import { db } from "../../../config/firebaseConfig";

// Generic helper type: any object plus an id
type WithId<T> = T & { id: string };

// Create a new document in any collection
export const createDocument = async <T extends Record<string, any>>(
  collectionName: string,
  data: T
): Promise<WithId<T>> => {
  try {
    const docRef = await db.collection(collectionName).add(data); // add document to Firestore
    return { ...data, id: docRef.id }; // return saved data and generated id
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create in ${collectionName}: ${msg}`);
  }
};

// Get all documents from a collection
export const getAllDocuments = async <T extends Record<string, any>>(
  collectionName: string
): Promise<Array<WithId<T>>> => {
  try {
    const snapshot = await db.collection(collectionName).get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as T; // convert Firestore data to our generic type
      return { id: doc.id, ...data };
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get all from ${collectionName}: ${msg}`);
  }
};

// Get one document by id
export const getDocumentById = async <T extends Record<string, any>>(
  collectionName: string,
  id: string
): Promise<WithId<T> | null> => {
  try {
    const docSnap = await db.collection(collectionName).doc(id).get();

    if (!docSnap.exists) {
      return null; // document not found
    }

    const data = docSnap.data() as T;
    return { id: docSnap.id, ...data };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get ${id} from ${collectionName}: ${msg}`);
  }
};

// Update a document by id
export const updateDocument = async <T extends Record<string, any>>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data); // update only provided fields
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update ${id} in ${collectionName}: ${msg}`);
  }
};

// Delete a document by id
export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).delete();
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete ${id} from ${collectionName}: ${msg}`);
  }
};