
const listFriendDiv = document.querySelector('#list-friend');

var friendDivs = document.querySelectorAll('.friend');



function getFriend() {

    return new Promise((resolve, reject) => {
        const apiUrl = 'http://127.0.0.1:3000/friends';

        // Thực hiện GET request với phương thức fetch
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Định dạng dữ liệu là JSON
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from API:', data);
                // Xử lý dữ liệu trả về từ API tại đây
                //todo: hiển thị danh sách bạn bè
                /*
                <div class="contact">
                avatar->    <div class="pic avatar" style="background-image: url('https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.svg.png')"></div>
                    <!-- <div class="badge">14</div> -->
                name + registrationToken>    <div class="name" registrationToken="?????">Steve Rogers</div>
                    <!-- <div class="message"> That is America's ass 🇺🇸 </div> -->
                </div>
                */

                myName = window.localStorage.getItem('me')
                console.log("My name is " + myName)

                data.forEach(element => {
                    if (element.name != myName) {

                        // Tạo div cho avatar

                        const avatarDiv = document.createElement('div');
                        avatarDiv.className = 'pic avatar';
                        avatarDiv.style.backgroundImage = `url(${element.avatar})`;

                        // Tạo div cho name
                        const nameDiv = document.createElement('div');
                        nameDiv.className = 'name';
                        nameDiv.setAttribute('registrationToken', element.registrationToken);
                        nameDiv.textContent = element.name;

                        // Lấy div có class="contact"
                        const contactDiv = document.createElement('div');
                        contactDiv.className = 'contact friend';

                        // Thêm avatarDiv và nameDiv vào contactDiv
                        contactDiv.appendChild(avatarDiv);
                        contactDiv.appendChild(nameDiv);

                        listFriendDiv.appendChild(contactDiv)

                        friendDivs = document.querySelectorAll('.friend');
                        console.log("friendDivs", friendDivs.length);
                    }
                });
                // Sau khi tạo các thẻ div xong, resolve Promise
                resolve();

            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}

function getHistoryMessage() {
    return new Promise((resolve, reject) => {

        const apiUrl = `http://127.0.0.1:3000/history/${me}`;

        // Thực hiện GET request với phương thức fetch
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Định dạng dữ liệu là JSON
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Response from API:', data);
                resolve(data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}
var mapHistoryMessage = {};

async function initFriends() {
    await getFriend();

    // Lấy danh sách các thẻ div có lớp "friend" sau khi đã được tạo bởi hàm getFriend()
    friendDivs = document.querySelectorAll('.friend');

    await getHistoryMessage()
        .then((historyMessage) => {
            mapHistoryMessage = historyMessage
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });


    console.log("Data from API:", mapHistoryMessage);


    // Lặp qua từng thẻ div "contact friend" và thêm sự kiện click
    friendDivs.forEach((friendDiv) => {
        friendDiv.addEventListener('click', () => {
            // Lấy thông tin name từ thẻ div được click
            const nameDiv = friendDiv.querySelector('.name');
            const avatarDiv = friendDiv.querySelector('.pic.avatar');
            var name = nameDiv.textContent;

            boxChat.setAttribute('partner', name);

            window.localStorage.setItem('partner', name)

            // Lấy giá trị của thuộc tính style của thẻ div
            const styleAttributeValue = avatarDiv.getAttribute('style');

            // Sử dụng Regex để tìm URL trong giá trị thuộc tính style
            const urlRegex = /url\(['"]?([^'"]+)['"]?\)/;
            const match = styleAttributeValue.match(urlRegex);
            var imageUrl;
            // Kiểm tra xem có match URL hay không và lấy URL nếu có
            if (match) {
                imageUrl = match[1];
                console.log('Image URL:', imageUrl);
            } else {
                console.log('Không tìm thấy URL ảnh.');
            }

            const chatSideDiv = document.getElementById('chat-side');
            const contactBarDiv = chatSideDiv.querySelector('.contact.bar');
            console.log('Contact Bar:', contactBarDiv);
            const picAvatar = contactBarDiv.querySelector('.pic.avatar');
            picAvatar.style.backgroundImage = `url(${imageUrl})`;

            const nameChatSideDiv = chatSideDiv.querySelector('.name')
            nameChatSideDiv.textContent = name;

            //todo: Hiển thị tin nhắn của từng partner trong map khi click vào partner đó
            //   <div class="message send">
            //     Hey, man! What's up, Mr Stark? 👋
            //   </div>
            //   <div class="message received">
            //     Kid, where'd you come from?
            //   </div>

            const chatDiv = document.getElementById('chat');

            chatDiv.innerHTML = ''

            // Sắp xếp mảng theo thứ tự của timestamp (tăng dần)
            mapHistoryMessage[name].sort((a, b) => a.timestamp - b.timestamp);

            mapHistoryMessage[name].forEach((message) => {
                console.log(message.to, message.from, message.message);

                const messageDiv = document.createElement('div');
                if (message.from === name) {
                    messageDiv.className = "message received"
                } else {
                    messageDiv.className = "message send"
                }

                messageDiv.textContent = message.message // + " " + message.timestamp

                chatDiv.appendChild(messageDiv);

                chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
            })
        });
    });
}


// Thêm sự kiện "load" vào tài liệu HTML
window.addEventListener('load', () => {
    // Gọi hàm initFriends sau khi tài liệu đã tải xong
    initFriends();
});









