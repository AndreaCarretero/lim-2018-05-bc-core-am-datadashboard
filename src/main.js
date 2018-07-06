const listVenues = document.querySelector('#venues');
const mainSection = document.getElementById('cohorts');


const getData = (str, url, callback) => {
<<<<<<< HEAD
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', event => {
    if (event.target.readyState === 4) {
      if (event.target.status !== 200) {
        return console.error(new Error(`HTTP error: ${event.target.status}`))
      } else {
        const response = JSON.parse(event.target.responseText);
        callback(str, response);
      }
    }
  });
  xhr.send();
};


const showCohorts = (city, dataCohorts) => {

  
  
  const cohortByCity = dataCohorts.filter(cohort => {
    return cohort.id.indexOf(city) !== -1;
  })
  for (const cohort of cohortByCity) {
    mainSection.innerHTML += `
  <div>
  <div id='listcohorts'>${cohort.id}</div>
  </div>
  `
  }



};

listVenues.addEventListener('click', event => {
     // AL FIN , en una línea -Se limpia todo cuando el usuario dé click.
    mainSection.innerHTML='';
  getData(event.target.id, '../data/cohorts.json', showCohorts);
});

let options = {
    cohort: null,
    cohortData: {
      users: null,
      progress: null,
  
    },
    orderBy: 'Name',
    orderDirection: 'ASC',
    search: ''
  }
/* listVenues.addEventListener('click', event => {
  mainSection.innerHTML = `
    <div>
        <p>${event.target.textContent}</p>
    </div>
    `
});
 */
/*
let progress = {};
let users = [];
let cohorts = {};

const urlP = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const urlU = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlC = '../data/cohorts.json';

fetch(urlP).then((resp) => {
    if (resp.status === 200) {
        return resp.json();
    } else {
        console.log('ocurrió un error')
    }
}).then((respP) => {
    progress = respP;
    return fetch(urlU)
}).then((resp) => {
    if (resp.status === 200) {
        return resp.json();
    } else {
        console.log('ocurrió un error')
    }
}).then((respU) => {
    users = respU;
    return fetch(urlC)
}).then((resp) => {
    if (resp.status === 200) {
        return resp.json();
    } else {
        console.log('ocurrió un error')
    }
}).then((respC) => {
    cohorts = respC;
    computeUsersStats(users, progress, cohorts);


})

/*
const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const reqObj = JSON.parse(request.response);
            callback(reqObj);
=======
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
        if (event.target.readyState === 4) {
            if (event.target.status !== 200) {
                return console.error(new Error(`HTTP error: ${event.target.status}`))
            } else {
                const response = JSON.parse(event.target.responseText);
                callback(str, response);
            }
>>>>>>> 1b12252e41cc09920cd957c41a3408692d98a50b
        }
    });
    xhr.send();
};


const showCohorts = (city, dataCohorts) => {
    mainSection.innerHTML = `<select class="form-control" id="select"></select>`
    const cohortByCity = dataCohorts.filter(cohort => {
        return cohort.id.indexOf(city) !== -1;
    })
    cohortByCity.forEach(cohort => {
        const options = document.getElementById('select')
        options.innerHTML +=
            `<option>${cohort.id}</option>`
    });
};

listVenues.addEventListener('click', event => {
    mainSection.innerHTML = '';
    getData(event.target.id, '../data/cohorts.json', showCohorts);
});