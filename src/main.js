
//Antes de comenzar con funciones; se declaran variables para traer los 'id´s' de html
const listVenues = document.querySelector('#venues');
const mainSection = document.getElementById('cohorts');
const showUsersandProgress = document.getElementById('users');
const content = document.getElementById('selectsede');
const buttonOrderBy=  document.getElementById('orderButton');
const selectAscDesc= document.getElementById('orderII');
const selectAll= document.getElementById('order');
//Objeto global "options" :

let options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: ''
}


// se utiliza xhr- 
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
// Mostrar cohorts-
const viewCohorts = (city, dataCohorts) => {
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
// Aquí se llama a progreso
const viewProgress = (idOfCohorts, progressObject) => {
 /* console.log(idOfCohorts, progressObject)
  console.log(processCohortData(options))  */
  options.cohortData.progress = progressObject;
  let array= processCohortData(options);
  for(let students of array){
    showUsersandProgress.innerHTML+=
    `<div>
             <td id= "tablestudent">${students.name}</td>
             <td>${students.stats.percent}</td> 
             <td>${students.stats.exercises.percent}</td>
             <td>${students.stats.quizzes.percent}</td>
             <td>${students.stats.quizzes.scoreSum}</td>
             <td>${students.stats.quizzes.scoreAvg}</td>
             <td>${students.stats.reads.percent}</td>
             </div>`;
  }

}


//5to

const viewUsers = (idOfCohorts, usersArray) => {
    options.cohortData.users = usersArray;
  getData(idOfCohorts,`../data/cohorts/${idOfCohorts}/progress.json`,viewProgress);
}


// Click

//2do
listVenues.addEventListener('click', event => {
  getData(event.target.id, '../data/cohorts.json', viewCohorts);
});

// 4to
content.addEventListener('click', (event) => {
     options.cohort.forEach((elementOfCohort) => { 
      if (elementOfCohort.id === event.target.id){ 
          options.cohort= elementOfCohort;
          console.log(options);
      }
  }); 
getData(event.target.id,`../data/cohorts/${event.target.id}/users.json`, viewUsers)
});

// Aplicando 2da funciónn para filtrar estudiantes
filterSearch.addEventListener('keyup', (event) => { debugger
  options.search = event.target.value;
  let searchNow= processCohortData(options); // Aquí se almacenará el nuevo array 
  showUsersandProgress.innerHTML= '';
  for(let users of searchNow){
    showUsersandProgress.innerHTML+=

    `<div id='showEstudents'>
		<td id= 'tablestudent'>${users['name']}</td>
		<td>${users.stats.percent}</td> 
    <td>${users.stats.exercises.percent}</td>
    <td>${users.stats.quizzes.percent}</td>
    <td>${users.stats.quizzes.scoreSum}</td>
    <td>${users.stats.quizzes.scoreAvg}</td>
    <td>${users.stats.reads.percent}</td>
		</div>
		`;
	};

})



/* 


// Se llama 3ra función -ayuda Kalu
buttonOrderBy.addEventListener('click', (event) => {
  options.orderBy = selectAscDesc.value;
  options.orderDirection = selectAll.value; 
  console.log(options);
  
  const orderNow = processCohortData(options);
  showUsersandProgress.innerHTML = '';
  viewUsers(orderNow);
}) */