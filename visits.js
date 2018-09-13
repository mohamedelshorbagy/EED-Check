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
        let linkSearch = `http://${server}/api/visits-search?code=${codeInput.value}`;
        axios.get(linkSearch)
            .then(result => result.data.data[0])
            .then(result => {
                userData.innerHTML = `
            <ul class="list-group">
            <li class="list-group-item">Name : <strong>${result.name || ""}</strong></li>
            <li class="list-group-item">Organization Name : <strong>${result.org_name || ""}</strong></li>
            <li class="list-group-item">Number Of Visitors : <strong>${result.num_of_visitors || ""}</strong></li>
            <li class="list-group-item">Email : <strong>${result.email || ""}</strong></li>
            <li class="list-group-item">Phone : <strong>${result.phone || ""}</strong></li>
            <li class="list-group-item">Code : <strong>${result.code || ""}</strong></li>
            <li class="list-group-item">Status : <strong>${result.status || ""}</strong></li>
            <li class="list-group-item">Visit Day : <strong>${result.visit_date || ""}</strong></li>
          </ul>    
          <button class="btn btn-success" onclick="checkUser(${result.id})">Check</div>
            `;

            });

    } else {
        messagesSearch.innerHTML = `<div class="alert alert-danger">Code can't be empty</div>`
    }

}

function checkUser(id) {
    let body = { id };
    let link = `http://${server}/api/visit-check`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearch.innerHTML = `<div class="alert alert-success">${result}</div>`
    })
}