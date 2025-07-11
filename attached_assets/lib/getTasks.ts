import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tasks;
}
