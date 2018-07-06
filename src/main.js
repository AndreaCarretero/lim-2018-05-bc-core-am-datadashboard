const listVenues = document.querySelector('#venues');
const mainSection = document.getElementById('cohorts');


const getData = (str, url, callback) => {
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
        }
    };
    request.open('GET', url, true);
    request.send();
};

>>>>>>> cd52003cd1a61141f46f0261a6fbaaf4f232bb77
>>>>>>> 6283c890b422bc62d6aa532933388640d912a598
const getUsers = () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', callback = (data) => {
        document.getElementById('conect users').addEventListener('click', () => {
            computeUsersStats(data,null,null);
            return data;
        });
    });
};
const getProgress = () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', callback = (data) => {
        document.getElementById('conect users').addEventListener('click', () => {
            computeUsersStats(null, data, null);
            return data;

        });
    });
};



const getCohorts = () => {
    getData('../data/cohorts.json', callback = (data) => {
        document.getElementById('conect cohorts').addEventListener('click', () => {
            processCohortData(data);
        });
    });
};


getUsers();
getProgress();
getCohorts();
const courses = getCohorts();
*/

/*
const getUsers = () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', callback = (data) => {
        document.getElementById('conect users').addEventListener('click', () => {
            document.getElementById('test').innerHTML = `
            <h1>El arreglo Users tiene ${data.length} objetos</h1>
            <div>${data.map(displayArrayUsers).join('')}</div>
            `;
        });
        console.log(data);
        return data;
    });
};
*/
/*
displayArrayUsers = (student) => {
    return `
        <table>
        <tr>
        <td>${student.name}</td>
        <td>${student.signupCohort}</td>
        <td>${student.timezone}</td>
        </tr>  
        </table>
        `;
};
*/

//getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json',callback);
//getData('../data/cohorts.json',callback);

/*
//segunda parte
displayArrayCohorts = (student) => {
    return `
        <table>
        <tr>
        <td>${student.id}</td>
        <td>${student.start}</td>
        <td>${student.end}</td>
        </tr>  
        </table>
        `;
};
displayArrayUsers = (student) => {
    return `
        <table>
        <tr>
        <td>${student.name}</td>
        <td>${student.signupCohort}</td>
        <td>${student.timezone}</td>
        </tr>  
        </table>
        `;
};
const getJSON = (url, callback) => {
    const request = new XMLHttpRequest();
    request.onload = _ => {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                return callback(new Error(`HTTP error: ${request.status}`));
            }
            try {
                callback(null, JSON.parse(request.responseText));
            } catch (err) {
                callback(err);
            }
        }
    };
    request.open('GET', url, true);
    request.send(null);
    return request;
};
const getUsers = getJSON('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, json) => {
    if (err) {
        return console.error(err);
    }
    console.log(json);
    document.getElementById('conect users').addEventListener('click', () => {
        document.getElementById('test').innerHTML = `
        <h1>El arreglo Users tiene ${json.length} objetos</h1>
        <div>${json.map(displayArrayUsers).join('')}</div>
        `;
    });
});
const getCohorts = getJSON('../data/cohorts.json', (err, json) => {
    if (err) {
        return console.error(err);
    }
    console.log(json);
    document.getElementById('conect cohorts').addEventListener('click', () => {
        document.getElementById('test').innerHTML = `
        <h1>El arreglo Cohorts tiene ${json.length} objetos</h1>
        <div>${json.map(displayArrayCohorts).join('')}</div>
        `;
    });
});
const getProgress = getJSON('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, json) => {
    if (err) {
        return console.error(err);
    }
    console.log(json);
    document.getElementById('conect progress').addEventListener('click', () => {
        document.getElementById('test').innerHTML = `
        <h1>El objeto Progress tiene ${json.length} objetos</h1>
        <div>${json.map(displayArrayUsers).join('')}</div>
        `;
    });
});
const users = getUsers;
const progress = getProgress;
const courses = getCohorts;
const options = {};
const orderBy = () => {};
const orderDirection = () => {};
const search = () => {};
<<<<<<< HEAD
<<<<<<< HEAD
console.log(users);
console.log(progress);
console.log(courses);
=======
myRequest1.send();
myRequest2.send();
myRequest3.send();
>>>>>>> 14719e8e6c864875a56b1c2c4c1943d26e36db0f
=======
const keyProgress = Object.keys(getProgress);
console.log(keyProgress);
*/