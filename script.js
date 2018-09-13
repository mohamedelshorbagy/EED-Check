var server = 'test.eed.eg';

let serverInput = document.getElementById('server');
let codeInput = document.getElementById('code');
let btnServer = document.getElementById('btn-server');
let btnSearch = document.getElementById('btn-search');
let messagesSearch = document.getElementById('messages-search');
let messagesServer = document.getElementById('messages-server');
let userData = document.getElementById('data');
serverInput.value = server;



btnServer.addEventListener('click', () => {
    if (serverInput.value === '') {
        messagesSearch.innerHTML = `<div class="alert alert-danger">Server can't be empty</div>`
        return;
    } else {
        server = serverInput.value;
        console.log(server);
    }
});

btnSearch.addEventListener('click', getUserData)




function getUserData() {
    messagesSearch.innerHTML = '';
    userData.innerHTML = '';
    if (codeInput.value !== '') {
        let linkSearch = `http://${server}/api/visitors-search?code=${codeInput.value}`;
        axios.get(linkSearch).then(result => result.data.data[0]).then(result => {
            userData.innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Arabic Name : <strong>${result.name_en || ""}</strong></li>
                <li class="list-group-item">English Name : <strong>${result.name_ar || ""}</strong></li>
                <li class="list-group-item">Gender : <strong>${result.gender || ""}</strong></li>
                <li class="list-group-item">Email : <strong>${result.email || ""}</strong></li>
                <li class="list-group-item">Phone : <strong>${result.phone || ""}</strong></li>
                <li class="list-group-item">Code : <strong>${result.code || ""}</strong></li>
                <li class="list-group-item">Education : <strong>${result.education || ""}</strong></li>
                <li class="list-group-item">Status : <strong>${result.status || ""}</strong></li>
          </ul>    
            `;

            if (result.checked === 0) {
                // Check In
                userData.innerHTML += `
                    <button class="btn btn-success" onclick="checkInUser(${result.id})">Check In</div>
                `
            } else {
                // Check Out
                userData.innerHTML += `
                    <button class="btn btn-danger" onclick="checkOutUser(${result.id})">Check Out</div>
                `
            }

        });

    } else {
        messagesSearch.innerHTML = `<div class="alert alert-danger">Code can't be empty</div>`
    }

}

function checkInUser(id) {
    let body = { id };
    let link = `http://${server}/api/checkin`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearch.innerHTML = `<div class="alert alert-success">${result}</div>`
    })
}



function checkOutUser(id) {
    let body = { id };
    let link = `http://${server}/api/checkout`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearch.innerHTML = `<div class="alert alert-success">${result}</div>`
    })
}




















