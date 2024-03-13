import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  Firestore,
} from "firebase/firestore";

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

export { setDocument, addDocument, getDocument };
