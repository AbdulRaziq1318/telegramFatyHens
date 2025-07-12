import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const getTasks = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tasks;
};
