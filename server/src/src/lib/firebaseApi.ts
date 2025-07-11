import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Function to add user's egg count
export async function addEggs(userId: string, eggCount: number) {
  try {
    await addDoc(collection(db, "user_eggs"), {
      userId,
      eggCount,
      createdAt: new Date(),
    });
    console.log("✅ Egg data saved to Firestore!");
  } catch (error) {
    console.error("❌ Error saving egg data:", error);
  }
}
