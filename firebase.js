const firebaseConfig = {
  apiKey: "AIzaSyB6ec1eadKVRhVbBBm64A48aQO-G_cNtuI",
  authDomain: "sendi-39535.firebaseapp.com",
  projectId: "sendi-39535",
  storageBucket: "sendi-39535.firebasestorage.app",
  messagingSenderId: "99933395332",
  appId: "1:99933395332:web:0f86f7754395879492a5d1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
