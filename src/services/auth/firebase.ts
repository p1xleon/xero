import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

interface SignUpProps {
  email: string;
  password: string;
  displayName?: string;
}

interface LoginProps {
  email: string;
  password: string;
}

//sign up user
export const signUp = async ({ email, password, displayName }: SignUpProps): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });
    // console.log("user signed up successfully", user);
  } catch (error) {
    // console.error("Error signuin up user", error);
    throw error;
  }
};

//login user
export const logIn = async ({ email, password }: LoginProps): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // console.log("user signed up successfully", user);
  } catch (error: any) {
    // console.error("Error during login:", error.message);
    // throw new Error(error.message);
  }
};

//add profile to firebase doc
export const addProfile = async (playerTag: string, optedIn: boolean) => {
  try {
    const user = auth.currentUser; //get current users uid
    if (!user) {
      throw new Error("No user is singed in");
    }
    const userDocRef = doc(db, "users", user.uid); //reference the users doc in firestore

    const docSnap = await getDoc(userDocRef); //get the doc

    //check if doc exists for the user
    if (!docSnap.exists()) {
      //create the doc if it doesnt exist
      await setDoc(userDocRef, { profiles: [] }, { merge: true });
    }

    const profiles = docSnap.data()?.profiles || [];

    const existingProfile = profiles.find((profile: { playerTag: string }) => profile.playerTag === playerTag);
    if (existingProfile) {
      // console.log("Profile already exists");
      return;
    }
    // add profile
    await updateDoc(userDocRef, {
      profiles: arrayUnion({ playerTag, optedIn }),
    });

    // console.log("Player added successfully");
  } catch (error) {
    // console.error("error adding player", error);
  }
};

//get user profiles/villages from firebase
export const fetchProfiles = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user logged in");
    }

    const userDocRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.profiles || [];
      // console.log(data)
    } else {
      return [];
    }
  } catch (error) {
    // console.error("error reading data", error);
    return [];
  }
};

//toggle optedIn war preference status for a user
export const toggleOptedIn = async (playerTag: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is singed in");
    }

    const userDocRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      console.error("user doc doesnt exist");
    }

    //get profile array for the user
    const profiles = docSnap.data()?.profiles || [];

    //find the profile for the village and toggle war preference
    const updateProfile = profiles.map((profile: { playerTag: string; optedIn: boolean }) =>
      profile.playerTag === playerTag ? { ...profile, optedIn: !profile.optedIn } : profile
    );

    await updateDoc(userDocRef, { profiles: updateProfile });
    // console.log("Opted-in status updated successfully");
  } catch (error) {
    // console.error("Error updating opted-in status:", error);
  }
};

//delete village/profile of a user from firestore
export const deleteProfile = async (playerTag: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user signed in");

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) throw new Error("User document not found");

    const userData = docSnap.data();
    const profiles = userData.profiles || [];

    // Find the full object matching playerTag
    const profileToRemove = profiles.find((p: any) => p.playerTag === playerTag);

    if (!profileToRemove) throw new Error("Profile not found in Firestore");

    // Remove the exact object from the array
    await updateDoc(userDocRef, {
      profiles: arrayRemove(profileToRemove),
    });

    // console.log("Profile deleted successfully");
  } catch (error) {
    // console.error("Error deleting profile", error);
    // throw error;
  }
};

//get all profile/villages from firstore
export const fetchAllProfiles = async () => {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    let allProfiles: any[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.profiles && Array.isArray(userData.profiles)) {
        allProfiles = [...allProfiles, ...userData.profiles];
      }
    });

    // console.log("Fetched Profiles:", allProfiles);
    return allProfiles; // **Return the fetched profiles**
  } catch (error) {
    // console.error("Error fetching all profiles", error);
    return []; // Return an empty array if there's an error
  }
};

//signout the user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    // console.log("User signed out successfully.");
  } catch (error) {
    // console.error("Error signing out:", error);
  }
};
