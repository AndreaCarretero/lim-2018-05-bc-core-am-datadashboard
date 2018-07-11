const listVenues = document.querySelector('#venues');
const mainSection = document.getElementById('cohorts');
const viewUsers = document.getElementById('users');
const content = document.getElementById('selectsede');

//Objeto "options" :
let options = {
  cohort: 0,
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: ''
}

const getData = (str, url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', event => {
    if (event.target.readyState === 4 && event.target.status === 200) {
      const response = (JSON.parse(event.target.responseText));
      callback(str, response);
    }
  });
  xhr.send();
}
// 3ero
const showCohorts = (city, dataCohorts) => {
  options.cohort = dataCohorts;
  const cohortByCity = dataCohorts.filter(cohort => {
    return cohort.id.indexOf(city) !== -1;
  })
 content.innerHTML = '';
 for(cohort of cohortByCity){
    content.innerHTML +=
      `<li id="${cohort.id}">${cohort.id}</li>`
  };
};
const showProgress = (idOfCohorts, progressObject) => {
  console.log(idOfCohorts, progressObject)
  console.log(processCohortData(options))
  options.cohortData.progress = progressObject;
}
//5to

const showUsers = (idOfCohorts, usersArray) => {
  options.cohortData.users = usersArray;
  getData(idOfCohorts,`../data/cohorts/${idOfCohorts}/progress.json`, showProgress);
}

// Click

//2do
listVenues.addEventListener('click', event => {
  getData(event.target.id, '../data/cohorts.json', showCohorts);
});

// 4to
content.addEventListener('click', (event) => {
     options.cohort.forEach((elementOfCohort) => { 
      if (elementOfCohort.id === event.target.id){ 
          options.cohort= elementOfCohort;
      }
  }); 

getData(event.target.id, `../data/cohorts/${event.target.id}/users.json`, showUsers)
});
