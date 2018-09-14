let server = 'localhost';
let counter = document.getElementById('counter');
let counterVolunteer = document.getElementById('counter-volunteer');
let totalCount = document.getElementById('counter-total');



getVisitorsCount();
setInterval(getVisitorsCount, 5000);

function getVisitorsCount() {
    axios.get(`http://${server}/api/counter`)
        .then(result => result.data.data)
        .then(result => {
            counter.innerHTML = `<strong>${result.visitors}</strong>`
            counterVolunteer.innerHTML = `<strong>${result.volunteers}</strong>`
            totalCount.innerHTML = `<strong>${parseInt(result.visitors) + parseInt(result.volunteers)}</strong>`;
        })
}



