import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from './firebaseConfig';

export const getTasks = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "tasks"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
