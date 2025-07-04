// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, getDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9zvGnv6j88akqJ5m4K12OEolvL5rZT8s",
  authDomain: "bakery-57dfc.firebaseapp.com",
  projectId: "bakery-57dfc",
  storageBucket: "bakery-57dfc.firebasestorage.app",
  messagingSenderId: "111050620614",
  appId: "1:111050620614:web:327c7559a68a0b409461c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//Guarda un producto en firebase
export const saveProduct = (nameProduct, description, price, category, urlImage, featured) =>{
    addDoc(collection(db, 'productos'), 
    {   name: nameProduct,
        description: description,
        price:price,
        category:category,
        urlImage:urlImage,
        featured:featured
    })
};

export const getProducts = () => getDocs(collection(db, 'productos'))

export const onGetProducts = (callback) => onSnapshot(collection(db, 'productos'), callback)

export const deleteProduct = id => deleteDoc( doc(db, 'productos', id))

export const getProduct = id => getDoc( doc(db, 'productos', id))

export const updateProduct = (id, newFields) => updateDoc( doc(db, 'productos', id), newFields)
