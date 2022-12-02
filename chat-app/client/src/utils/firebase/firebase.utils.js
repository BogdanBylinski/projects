import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  where,
  Firestore,
  updateDoc,
  FieldValue,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHsVKvuwm9U3rWSO_dLi9bXRdT6Lsdp0s",
  authDomain: "caht-app-1117e.firebaseapp.com",
  projectId: "caht-app-1117e",
  storageBucket: "caht-app-1117e.appspot.com",
  messagingSenderId: "209047296948",
  appId: "1:209047296948:web:4c71190fd6e81e8f0630e1",
};
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  await console.log(querySnapshot);
  return querySnapshot;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userAuth);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { imageURL, name, lastName } = additionalInformation;
    const { displayName, email, uid, photoURL } = userAuth;
    const createdAt = new Date();
    const following = [];
    const followers = [];
    const obj = {
      uid,
      displayName: displayName ? displayName : name + " " + lastName,
      firstName: name ? name : displayName,
      surName: lastName ? lastName : displayName,
      email,
      createdAt,
      following,
      followers,
      photoURL: photoURL
        ? photoURL
        : imageURL
        ? imageURL
        : "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png",
    };
    const config = {
      ...obj,
      headers: {
        "Content-type": "application/JSON",
      },
    };
    try {
      await setDoc(userDocRef, {
        ...obj,
        // ...additionalInformation,
      });

      // await axios.post("http://localhost:3333/api/user/", config);
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const f = async (idToFollow) => {
  const userupdate = doc(db, "users", auth.currentUser.uid);
  const b = await getDoc(userupdate);
  const a = b.data();
  console.log({ ...a });
  const obj = {
    uid: a.uid,
    createdAt: a.createdAt,
    displayName: a.displayName,
    email: a.email,
    following: [...a.following, idToFollow],
    followers: a.followers,
  };
  await updateDoc(userupdate, obj);
};
export const updateUserAfterSignUp = async (imageURL, name, lastName) => {
  const userupdate = doc(db, "users", auth.currentUser.uid);
  const b = await getDoc(userupdate);
  const a = b.data();
  console.log({ ...a });
  const obj = {
    uid: a.uid,
    createdAt: a.createdAt,
    displayName: name + " " + lastName,
    photoURL: imageURL,
    name: name,
    last: lastName,
    email: a.email,
    following: [],
    followers: [],
  };
  await updateDoc(userupdate, obj);
};

export const getUserImageURL = async () => {
  const userupdate = doc(db, "users", auth.currentUser.uid);
  const b = await getDoc(userupdate);
  const a = b.data();
  return a.photoURL;
};
export const getUsersByIds = async () => {
  const userupdate = doc(db, "users", auth.currentUser.uid);
  const b = await getDoc(userupdate);
  const ids = b.data().following;
  console.log(ids);
  let users = [];
  if (ids.length === 0) {
    return users;
  }
  while (ids.length) {
    const res = doc(db, "users", ids[0].trim());
    const docSnap = await getDoc(res);
    const _users = docSnap.data();
    users.push(_users);
    ids.shift();
  }
  return users;
};
