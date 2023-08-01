
console.log("Messaging onMessage")
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


messaging.onMessage((payload) => {
    try {
        console.log('Message received:', payload);

        const jsonObject = JSON.parse(payload.notification.body);

        mapHistoryMessage[payload.notification.title].push(jsonObject);
        // //todo: display message
        // <div class="message send">
        //    Hey, man! What's up, Mr Stark? 👋
        // </div>


        if (boxChat.getAttribute('partner') == jsonObject.from) {
            const chatItemLi = document.createElement('div');
            chatItemLi.textContent = jsonObject.message
            chatItemLi.classList.add('received');
            chatItemLi.classList.add('message');

            boxChat.appendChild(chatItemLi);
            boxChat.scrollTop = boxChat.scrollHeight - boxChat.clientHeight;
        }



    } catch (error) {
        console.error('Error handling message:', error);
        // Xử lý lỗi tại đây
    }
});

