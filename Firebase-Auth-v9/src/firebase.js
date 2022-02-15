import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx0s4eCdbSGwh_DLRb9aInzfl7Nz92sjk",
  authDomain: "tesla-clone-redux-ts.firebaseapp.com",
  projectId: "tesla-clone-redux-ts",
  storageBucket: "tesla-clone-redux-ts.appspot.com",
  messagingSenderId: "485009450092",
  appId: "1:485009450092:web:886ca808ce802285fde449",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth,firebaseApp };
