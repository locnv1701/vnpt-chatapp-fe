console.log("Starting get registrationToken")
const firebaseConfig = {
    apiKey: "AIzaSyCd60UFFYe84cewoEiJNdKpsSL4PCkJntc",
    authDomain: "mywebapp-3ad6b.firebaseapp.com",
    projectId: "mywebapp-3ad6b",
    storageBucket: "mywebapp-3ad6b.appspot.com",
    messagingSenderId: "1075307155396",
    appId: "1:1075307155396:web:560df4a639f3206c7cde91"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging
    .getToken({ vapidKey: 'BMJr3-DY7yyZqXtiFadf-_88TSz6pQashwVQABchThr17oEXK1ZL3CsdDRaNzaIEIXMIbTi4un0D685BRJ9Gn5c' })
    .then((registrationToken) => {
        console.log('Registration Tokene:', registrationToken);
        window.localStorage.setItem('registrationToken', registrationToken);
    })
    .catch((error) => {
        console.error('Error retrieving registration token:', error);
    });



