/* desde los SDK me traigo todo,funciones,clases,etc... */
// CDN para el SDK CORE para Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

// CDN para el SDK de Firebase Authentication
import {} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

// CDN para el SDK de Cloud Firestore
/** getFirestore me permite conectar a la Cloud Firestore,es decir, retorna la conexión(const db = getFirestore())
 *  collection me permite interactuar con una colección
 *  addDoc permite añadir un documento a una coleccion
 *  getDocs permite rescatar varios documentos
 *  getDoc permite rescatar un documento
 */
import {
  getFirestore,
  collection,
  addDoc,
  getDocs, //get all docs,thus needs collection
  getDoc, //get one doc,thus needs doc
  onSnapshot, //suscripcion
  deleteDoc,
  doc, // para seleccionar un documento
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa1q2Ir5rcPIGiN14AY8KPVvPKPsHKnU0",
  authDomain: "firestorecrudv9fatz.firebaseapp.com",
  projectId: "firestorecrudv9fatz",
  storageBucket: "firestorecrudv9fatz.appspot.com",
  messagingSenderId: "688737192462",
  appId: "1:688737192462:web:d9917e979f9b55a27e0a5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* obtengo la conexión */
const db = getFirestore(app);

export const saveTask = async (title, description) =>  await addDoc(collection(db, "tasks"), { title, description });


export const getTasks = async () =>  await getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"),callback);

export const deleteTask = async (taskId) => await deleteDoc(doc(db, "tasks", taskId));

export const getTask = async (taskId) => await getDoc(doc(db, "tasks", taskId));

export const updateTask = async (id,newFields) => await updateDoc(doc(db, "tasks", id), newFields);



