import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { app } from './firebaseConfig';

export const getTasks = async () => {
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, 'tasks'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
