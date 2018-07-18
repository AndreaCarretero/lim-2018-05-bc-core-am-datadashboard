window.computeUsersStats = (users, progress, courses) => {

   
  let usersCopy = users;
  let progressCopy= progress;
   

  /*  Declaro variables para cada propiedad del progreso de las alumnas
     propiedades del progreso  */
  const usersWithStats = [];
  
  // Paso 1: calcúlo porcentaje de completitud para cada usuario --> courses
  courses.forEach(coursesName => {// recorriendo nombre de los cursos
    usersCopy.forEach((user) => {
      let percent= 0;
      let exerciseTotal= 0;
      let exerciseCompleted= 0;
      let readsTotal =0;
      let readsCompleted= 0;
      let quizzesTotal= 0;
      let quizzesCompleted= 0;
      let scoreSum= 0;
      let scoreAvg= 0;


      //Aquí se conectaran students(users) y progressCopy(pogress)
      if(progressCopy[user.id] && progressCopy[user.id].hasOwnProperty(coursesName)){// hasOwnProperty me indica si el usuario cuenta con la propiedad que estoy evaluando y devuelve un booleano
         percent= progress[user.id].intro.percent; 
        const usersUnits= progressCopy[user.id].intro.units;
        Object.keys(usersUnits).forEach((unitName)=>{// Se capturan los arrays con las propiedades enumerdas  y las recorro con el método de forEach
          const parts= usersUnits[unitName].parts
          Object.keys(parts).forEach((partName)=>{
            const part = parts[partName];

          
          // Calcular propiedad de 'excercises'
            if(part.hasOwnProperty('exercises')){
              const exercises= part.exercises;
              Object.keys(exercises).forEach((exerciseName)=>{
                const exercise= exercises[exerciseName];
                exerciseTotal += 1;
                if(exercise.completed !== undefined){ // Se coloca una condición para que pueda solo evaluar a las estudiantes que tengan "excercises"
                  exerciseCompleted += exercise.completed;
                }else{
                  exerciseCompleted = 0;
                }
              });
            }
          // Calcular propiedad de 'read' :
            if(part.hasOwnProperty('type')){
              if(part.type === 'read'&& readsCompleted !== 0){
                readsTotal++;
                readsCompleted += part.completed;
               }
                else if (part.type === 'read'&& readsCompleted === 0){
                readsCompleted = 1;
                readsTotal = 1
                }

              //Calcular propiedad de ' Quizzes'

              if(part.type === 'quiz'){
                quizzesTotal+= 1;
                quizzesCompleted+= part.completed;
                scoreSum+= part.score ? part.score : 0;
                scoreAvg= (scoreSum / quizzesCompleted) ? (scoreSum / quizzesCompleted) : 0;
              }
            }
          })
        })
      }  
    //caculo porcentaje
     let calculatePercent= (a,b) =>{
      if(b==0){
        return 0;
      }else
      return (a/b)*100;

    }
   
    const exercisePercent= calculatePercent(exerciseCompleted, exerciseTotal );
    const readsPercent = calculatePercent(readsCompleted, readsTotal);
    const quizzesPercent = calculatePercent(quizzesCompleted, quizzesTotal);
    
  // Según read me -se retorna: (Se obtiene usuarias con su progreso correspondiente) 
  
    const userWithStats = {
      name: user.name.toUpperCase(),
      stats:{
        percent: percent,
        exercises: {
          total: exerciseTotal,
          completed: exerciseCompleted,
          percent : exercisePercent,
        },
        reads: {
          total: readsTotal,
          completed: readsCompleted,
          percent : Math.round(readsPercent) //aquí se redondea 
        },
        quizzes: {
          total: quizzesTotal,
          completed: quizzesCompleted,
          percent: Math.round(quizzesPercent),
          scoreSum: Math.round(scoreSum),
          scoreAvg: Math.round(scoreAvg)
        }
      }
    }
    usersWithStats.push(userWithStats);
    }) 
  })
  //return userWithSats
  return usersWithStats;
}
 
// Aquí se implementará función 2 -sort para que se pueda ordenar cada propiedad

window.sortUsers = (users, orderBy, orderDirection) => {

const ordenarPorNombre = users.sort ((a, b) => {
  var primero = a.name.toLowerCase();
  var segundo = b.name.toLowerCase();
  if (primero < segundo) {
     return -1;
     }
  if (primero > segundo) {
     return 1;
    }
  return 0;
});
//ordena por nombre:
if (orderBy === 'name' & orderDirection === 'asc') {
  // console.log(ordenarPorNombre)
  return ordenarPorNombre;
}
else if (orderBy === 'name' & orderDirection === 'desc') {
  return ordenarPorNombre.reverse();
} 
//ordena por porcentaje:
else if (orderBy === 'percent' & orderDirection === 'asc') {
  const order = ordenarPorNombre.sort ((a, b) =>{ return a.stats.percent - b.stats.percent });
  return order;
}
 else if (orderBy === 'percent' & orderDirection === 'desc') {
  const order = users.sort ((a, b) =>{ return b.stats.percent - a.stats.percent });
  return order;
}
//ordena por ejjercicios:
else if (orderBy === 'exercises' & orderDirection === 'asc') {
  const order = users.sort ((a, b) =>{ return a.stats.exercises.completed - b.stats.exercises.completed });
  return order;
}
else if (orderBy === 'exercises' & orderDirection === 'desc') {
  const order = users.sort((a, b) =>{ return b.stats.exercises.completed - a.stats.exercises.completed });
  return order;
}
//ordena por quizzes:
 else if (orderBy === 'quizzes' & orderDirection === 'asc') {
  const order = users.sort ((a, b) =>{ return a.stats.quizzes.completed - b.stats.quizzes.completed });
  return order;
}
else if (orderBy === 'quizzes' & orderDirection === 'desc') {
  const order = users.sort ((a, b) =>{ return b.stats.quizzes.completed - a.stats.quizzes.completed });
  return order;
}

// else if (orderBy === 'quizzesAvg' & orderDirection === 'asc') {
//   const order = users.sort = (a, b) =>{ return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg };
//   return order;
// }
//  else if (orderBy === 'quizzesAvg' & orderDirection === 'desc') {
//   const order = users.sort = (a, b)=> { return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg };
//   return order;
// }
//ordenar por lecturas:
// else if (orderBy === 'reads' & orderDirection === 'asc') {
//   const order = users.sort ((a, b)=> { return a.stats.reads.completed - b.stats.reads.completed });
//   return order;
// }
// else {
//   const order = users.sort ((a, b)=> { return b.stats.reads.completed - a.stats.reads.completed });
//   return order;
// }
}
















// Función para filtrar estudiantes. Se mostrarán con cada propiedad
window.filterUsers = (users, search) => {
  const filterNow = users.filter(user => {
    return user.name.toLowerCase().indexOf(search.toLowerCase()) > -1;

  });

  return filterNow;
}

window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex);
  let  usersCopy = options.cohortData.users.filter(user =>user.role === 'student'); 
  const showStudents= computeUsersStats(usersCopy,options.cohortData.progress, courses );
   let studentsOrders = sortUsers(showStudents, options.orderBy, options.orderDirection);
  console.log(showStudents);(options.cohort.coursesIndex);
  // Aquí se filtrarán estudia
  const viewUsersFilters = filterUsers(showStudents,options.search);
  return viewUsersFilters;
  return showStudents;
} 
