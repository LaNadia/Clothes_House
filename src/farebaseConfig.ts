import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { getAuth, OAuthCredential, onAuthStateChanged, updateProfile} from "firebase/auth";
import { useState, useEffect} from 'react';

const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth();


// Storage

export async function uploadAvatar(file: any, user: any, setLoading: any, setPhotoUrl: any) {

    if (!file) {
          alert("No File Selected")
    } else {
          const fileRef = ref(storage, user.uid + '.jpg');

          const metadata = {
            contentType: 'image/jpeg'
          };


          setLoading(true);
          const snapshop = await uploadBytesResumable(fileRef, file, metadata);

          const photoURL = await getDownloadURL(fileRef);

          updateProfile(user, {photoURL});

          setPhotoUrl(photoURL)
          setLoading(false);
    }
}


export function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser
}
