// Initialize Firebase
var config = {
    apiKey: "AIzaSyB7M3pwZUD5B6RyfmV2xCRVkIxZ3hM0xDc",
    authDomain: "mathmemory-be6f6.firebaseapp.com",
    databaseURL: "https://mathmemory-be6f6.firebaseio.com",
    projectId: "mathmemory-be6f6",
    storageBucket: "mathmemory-be6f6.appspot.com",
    messagingSenderId: "411261991682"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    window.user = user;
    // Step 1:
    //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
    //  If there is a user, log out out user details for debugging purposes.
});
