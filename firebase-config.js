// إعدادات Firebase – استخدم إعداداتك الخاصة
const firebaseConfig = {
    apiKey: "AIzaSyCYnCu8VkoOAOhnJTZBVmSGcPSeKB4vCAM",
    authDomain: "tygggfs.firebaseapp.com",
    databaseURL: "https://tygggfs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tygggfs",
    storageBucket: "tygggfs.firebasestorage.app",
    messagingSenderId: "532770652661",
    appId: "1:532770652661:web:3182543dc802112bcf60bc",
    measurementId: "G-K5CQXE4PX3"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// مزودي المصادقة
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
// لإضافة تويتر (X) تحتاج تفعيله في Firebase Console
