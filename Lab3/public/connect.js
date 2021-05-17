{
    var firebaseConfig = {
        apiKey: "AIzaSyAWvNOTYJukkw1xlWldjHt5J1AeYrq7YHU",
        authDomain: "agrexa-60b32.firebaseapp.com",
        databaseURL: "https://agrexa-60b32-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "agrexa-60b32",
        storageBucket: "agrexa-60b32.appspot.com",
        messagingSenderId: "491305025442",
        appId: "1:491305025442:web:6d9eb47e57a885eb873cfb",
        measurementId: "G-54X7KPELH0"
      };
      firebase.initializeApp(firebaseConfig);
      firebase.database().ref('users/');
      }