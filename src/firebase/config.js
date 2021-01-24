import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyDJM4hATjA2BzzHHIqtLgpvTotTErDVuYw',
	authDomain: 'bitcoin-app-9c46a.firebaseapp.com',
	databaseURL: 'https://bitcoin-app-9c46a.firebaseio.com',
	projectId: 'bitcoin-app-9c46a',
	storageBucket: 'bitcoin-app-9c46a.appspot.com',
	messagingSenderId: '842915062009',
	appId: '1:842915062009:web:1d47b90622a59e52c24228'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const sr = firebase.storage();
const fs = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { sr, fs, auth, timestamp };
