
  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAKsINB32l_efXUuALTrTd6PQydO6cuf_s",
        authDomain: "graficas-computacionales-e9aff.firebaseapp.com",
        databaseURL: "https://graficas-computacionales-e9aff-default-rtdb.firebaseio.com",
        projectId: "graficas-computacionales-e9aff",
        storageBucket: "graficas-computacionales-e9aff.appspot.com",
        messagingSenderId: "773901283265",
        appId: "1:773901283265:web:6fb4428439540df7e60940",
        measurementId: "G-ZG5VDN77FV"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("player si singned in");
        }
    });