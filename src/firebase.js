import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDJljsViWYmBfaW9nt2aUHhF5gIufyIAY8",
	authDomain: "discord-clone-3e302.firebaseapp.com",
	databaseURL: "https://discord-clone-3e302.firebaseio.com",
	projectId: "discord-clone-3e302",
	storageBucket: "discord-clone-3e302.appspot.com",
	messagingSenderId: "183786654856",
	appId: "1:183786654856:web:cfa8eeaa9ccdc7b8f8a33d",
	measurementId: "G-WC429DNWKD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
