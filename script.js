var chat = document.getElementById('chat');


console.log("start script...");

const chatForm = document.querySelector('#chat-form');
const chatMes = document.querySelector('#chat-mes');

const boxChat = document.querySelector('#chat');

chatForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const message = chatMes.value

   //todo: lấy registration token local storage
   registrationToken = window.localStorage.getItem('registrationToken')

   //todo: call api send message and registrationToken to server
   send(message, registrationToken)


   //todo: display message
   // <div class="message send">
   //    Hey, man! What's up, Mr Stark? 👋
   // </div>
   const chatItemLi = document.createElement('div');
   chatItemLi.textContent = message
   chatItemLi.classList.add('send');
   chatItemLi.classList.add('message');

   boxChat.appendChild(chatItemLi);
   boxChat.scrollTop = boxChat.scrollHeight - boxChat.clientHeight;

   chatMes.value = '';
});

const me = window.localStorage.getItem('me');


function send(message, registrationToken) {
   const apiUrl = 'http://127.0.0.1:3000/send';

   partner = window.localStorage.getItem('partner');

   const bodyData = {
      from: me,
      to: partner,
      timestamp: new Date().getTime(),
      message: message,
   };

   if (mapHistoryMessage.hasOwnProperty(partner)) {
      // Nếu có, thêm bodyData vào mảng tương ứng với key partner
      mapHistoryMessage[partner].push(bodyData);
    } else {
      // Nếu không, tạo một mảng mới chứa bodyData và thêm vào mapHistoryMessage
      mapHistoryMessage[partner] = [bodyData];
    }

   // Thực hiện POST request với phương thức fetch
   fetch(apiUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json' // Định dạng dữ liệu là JSON
      },
      body: JSON.stringify(bodyData) // Chuyển đối tượng thành chuỗi JSON
   })
      .then(response => response.json())
      .then(data => {
         console.log('Response from API:', data);
         // Xử lý dữ liệu trả về từ API tại đây

      })
      .catch(error => {
         console.error('Error sending POST request:', error);
         // Xử lý lỗi tại đây
      });
}