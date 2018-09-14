var server = 'test.eed.eg';

let serverInput = document.getElementById('server');
let codeInputVisitor = document.getElementById('code-visitor');
let codeInputVisits = document.getElementById('code-visits');
let codeInputVolunteer = document.getElementById('code-volunteer');
let btnServer = document.getElementById('btn-server');
let btnSearchVisitor = document.getElementById('btn-search-visitor');
let btnSearchVisits = document.getElementById('btn-search-visits');
let btnSearchVolunteer = document.getElementById('btn-search-volunteer');
let messagesSearchVisitor = document.getElementById('messages-search-visitor');
let messagesSearchVisits = document.getElementById('messages-search-visits');
let messagesSearchVolunteer = document.getElementById('messages-search-volunteer');
let messagesServer = document.getElementById('messages-server');
let userDataVisitor = document.getElementById('data-visitor');
let userDataVisits = document.getElementById('data-visits');
let userDataVolunteer = document.getElementById('data-volunteer');
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

btnSearchVisitor.addEventListener('click', getUserData)
btnSearchVisits.addEventListener('click', getUserDataVisits)
btnSearchVolunteer.addEventListener('click', getUserDataVolunteer)




function getUserData() {
    messagesSearchVisitor.innerHTML = '';
    userDataVisitor.innerHTML = '';
    if (codeInputVisitor.value !== '') {
        let linkSearch = `http://${server}/api/visitors-search?code=${codeInputVisitor.value}`;
        axios.get(linkSearch).then(result => result.data.data[0]).then(result => {
            userDataVisitor.innerHTML = `
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
                userDataVisitor.innerHTML += `
                    <button class="btn btn-success" onclick="checkInUser(${result.id}, this)">Check In</div>
                `
            } else {
                // Check Out
                userDataVisitor.innerHTML += `
                    <button class="btn btn-danger" onclick="checkOutUser(${result.id}, this)">Check Out</div>
                `
            }

        });

    } else {
        messagesSearchVisitor.innerHTML = `<div class="alert alert-danger">Code can't be empty</div>`
    }

}

function checkInUser(id, elm) {
    elm.setAttribute('disabled', 'disabled');
    let body = { id };
    let link = `http://${server}/api/checkin`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearchVisitor.innerHTML = `<div class="alert alert-success">${result}</div>`
        elm.removeAttribute('disabled');

    })
}



function checkOutUser(id, elm) {
    elm.setAttribute('disabled', 'disabled');
    let body = { id };
    let link = `http://${server}/api/checkout`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearchVisitor.innerHTML = `<div class="alert alert-success">${result}</div>`
        elm.removeAttribute('disabled');

    })
}


function getUserDataVisits() {
    messagesSearchVisits.innerHTML = '';
    userDataVisits.innerHTML = '';
    if (codeInputVisits.value !== '') {
        let linkSearch = `http://${server}/api/visits-search?code=${codeInputVisits.value}`;
        axios.get(linkSearch)
            .then(result => result.data.data[0])
            .then(result => {
                userDataVisits.innerHTML = `
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
          <button class="btn btn-success" onclick="checkUser(${result.id}, this)">Check</div>
            `;

            });

    } else {
        messagesSearchVisits.innerHTML = `<div class="alert alert-danger">Code can't be empty</div>`
    }

}

function checkUser(id, elm) {
    elm.setAttribute('disabled', 'disabled');

    let body = { id };
    let link = `http://${server}/api/visit-check`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearchVisits.innerHTML = `<div class="alert alert-success">${result}</div>`
        elm.removeAttribute('disabled');
    })
}


/** Volunteers
 * 
 * 
 * 
 * 
 */

function getUserDataVolunteer() {
    messagesSearchVolunteer.innerHTML = '';
    userDataVolunteer.innerHTML = '';
    if (codeInputVolunteer.value !== '') {
        let linkSearch = `http://${server}/api/volunteer-search?code=${codeInputVolunteer.value}`;
        axios.get(linkSearch)
            .then(result => result.data.data[0])
            .then(result => {
                console.log(result);
                userDataVolunteer.innerHTML = `
                    <ul class="list-group">
                        <li class="list-group-item">Name : <strong>${result.name || ""}</strong></li>
                        <li class="list-group-item">Phone : <strong>${result.phone || ""}</strong></li>
                  </ul>    
                    `;

                if (result.checked === 0) {
                    // Check In
                    userDataVolunteer.innerHTML += `
                            <button class="btn btn-success" onclick="checkInVolunteer(${result.id}, this)">Check In</div>
                        `
                } else {
                    // Check Out
                    userDataVolunteer.innerHTML += `
                            <button class="btn btn-danger" onclick="checkOutVolunteer(${result.id}, this)">Check Out</div>
                        `
                }

            });

    } else {
        messagesSearchVolunteer.innerHTML = `<div class="alert alert-danger">Code can't be empty</div>`
    }

}

function checkInVolunteer(id, elm) {
    elm.setAttribute('disabled', 'disabled');
    let body = { id };
    let link = `http://${server}/api/volunteer-checkin`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearch.innerHTML = `<div class="alert alert-success">${result}</div>`
        elm.removeAttribute('disabled');
    })
}



function checkOutVolunteer(id, elm) {
    elm.setAttribute('disabled', 'disabled');
    let body = { id };
    let link = `http://${server}/api/volunteer-checkout`;
    axios.post(link, body).then(result => result.data.data.success).then(result => {
        messagesSearch.innerHTML = `<div class="alert alert-success">${result}</div>`
        elm.removeAttribute('disabled');
    })
}



/** Slider Logic
 * 
 * 
 * 
 */


let state = 0;
let elNav = document.querySelectorAll('.nav li')
function send(event) {
    const elActives = document.querySelectorAll('[data-active]');

    Array.from(elActives)
        .forEach(el => {
            el.removeAttribute('data-active')
            el.classList.remove('active');
        });


    state = +event;


    Array.from(document.querySelectorAll(`[data-key="${state}"]`))
        .forEach(el => {
            el.setAttribute('data-active', true);
            el.classList.add('active');
        })

}



elNav.forEach(nav => {
    nav.addEventListener('click', () => {
        send(nav.dataset.key);
    });
});

send(0);

















