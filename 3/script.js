const wsUri='wss://echo-ws-service.herokuapp.com';
const btnMsg=document.querySelector('.btn-msg');
const btnGeo=document.querySelector('.btn-geo');
const containerMsgs=document.querySelector('.chat__messages');
const inputMsg=document.querySelector('.chat__menu-input');


//Вывод в чат сообщения
function writeToScreenText(message, className) {
    let container=document.createElement("div");
    container.className=className;
    let newMsg = document.createElement("p");
    newMsg.innerHTML = message;
    container.appendChild(newMsg);
    containerMsgs.appendChild(container);
}

//Вывод в чатт ссылки с геолокацией
function writeToScreenLink(message, className) {
    let container=document.createElement("div");
    container.className=className;
    let newMapLink = document.createElement("a");
    newMapLink.href = message;
    newMapLink.textContent = 'Геолокация';
    newMapLink.target="_blank";
    container.appendChild(newMapLink);
    containerMsgs.appendChild(container);
}

//Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    let newMapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        writeToScreenLink(newMapLink,"msg-right");
        websocket.send(newMapLink);
    };
}

//Функция, выводящая уведомление об ошибке при получении геолокации
const error = () => {
    alert('Невозможно получить ваше местоположение');
}

//Обработка отправки сообщения
btnMsg.addEventListener('click',()=>{
    let newMsgText =  inputMsg.value;
    inputMsg.value="";

    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        writeToScreenText(newMsgText,"msg-right");
        websocket.send(newMsgText);
    };
    websocket.onmessage = function(evt) {
        writeToScreenText(evt.data,"msg-left");
    };
})

//Обработка отправки геолокации
btnGeo.addEventListener('click',async ()=>{
    if (!navigator.geolocation) {
        alert('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})