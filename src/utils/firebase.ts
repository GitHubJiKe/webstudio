import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  Firestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
interface AddDocOpt {
  entity: string;
  entityObj: Record<string, unknown>;
}

async function setDocument(db: Firestore, { entity, entityObj }: AddDocOpt) {
  await setDoc(doc(db, "tests", entity), entityObj);
}

async function addDocument(db: Firestore, { entity, entityObj }: AddDocOpt) {
  try {
    console.log(entity, entityObj);
    return await addDoc(collection(db, entity), entityObj);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getDocument<T>(
  db: Firestore,
  { entity }: Pick<AddDocOpt, "entity">
) {
  const data: T[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, entity));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        _id: doc.id,
      } as T);
    });
  } catch (error) {
    console.error("Error get document: ", error);
  }
  return data;
}

async function uploadFileByBytes(file: File, filename: string) {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${filename}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot;
  } catch (error) {
    console.error(error);
  }
}

async function listAllImages() {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      console.log("res:::", res);
      res.prefixes.forEach((folderRef) => {
        console.log("folderRef:::", folderRef);
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        console.log("itemRef:::", itemRef);
        // All the items under listRef.
      });
    })
    .catch((error) => {
      console.error(error);
      // Uh-oh, an error occurred!
    });
}

export {
  setDocument,
  addDocument,
  getDocument,
  uploadFileByBytes,
  listAllImages,
};
