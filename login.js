const signupForm = document.querySelector('#signup');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = signupForm.querySelector('#username');
    const emailInput = signupForm.querySelector('#email');
    const avatarInput = signupForm.querySelector('#avatar');
    const passwordInput = signupForm.querySelector('#password');

    const username = usernameInput.value
    const email = emailInput.value
    const avatar = avatarInput.value
    const password = passwordInput.value

    var bodyData = {
        name: username,
        email: email,
        avatar: avatar,
        password: password,
    }


    console.log(bodyData)

    const apiUrl = 'http://127.0.0.1:3000/signup';

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
            alert(data.message);
        })
        .catch(error => {
            console.error('Error sending POST request:', error);
            // Xử lý lỗi tại đây
            alert(error);
        });
});


const loginForm = document.querySelector('#login');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = loginForm.querySelector('#username');
    const passwordInput = loginForm.querySelector('#password');

    const username = usernameInput.value
    const password = passwordInput.value

    var registrationToken = window.localStorage.getItem('registrationToken');

    var bodyData = {
        name: username,
        password: password,
        registrationToken: registrationToken
    }

    const apiUrl = 'http://127.0.0.1:3000/login';

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
            alert(data.message);
            if (data.success) {
                window.location.href = "/index.html";
                window.localStorage.setItem('me', username)
            }
        })
        .catch(error => {
            console.error('Error sending POST request:', error);
            // Xử lý lỗi tại đây
            alert(error);
        });
});