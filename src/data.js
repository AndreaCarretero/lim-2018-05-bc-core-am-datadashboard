window.computeUsersStats = (users, progress, courses) => {
  /* let user1 = users;
  let progress1= progress;

 1hora y 20min...





  let newUsers= users1.filter((user)=> user.role === 'student').map(user =>{
    const progresYusuario = progress1[user.id];
    return ({
      stats:{
        name: user.name,
        percent:
        exercises:{
          total:
          completed:
          percent:
        },
        reads:{
          total:
          completed:
          percent:          
        },
        quizzes:{
          total:
          completed:
          percent: 
          scoreSum:
          scoreAvg:
        }
      }

    })
  }) */
  // me retora nuevo array con usuarios

  let newUsers= users1.map((user)=> user.role === 'student' { // me retora nuevo array con usuarios

    /*  Declaro variables para cada propiedad del progreso de las alumnas
     propiedades del progreso  */
  let percent= 0;
  let exerciseTotal= 0;
  let exerciseCompleted= 0;
  let readsTotal =0;
  let readsCompleted= 0;
  let quizzesTotal= 0;
  let quizzesCompleted= 0;
  let scoreSum= 0;
  let scoreAvg= 0;

  // Paso 1: calcúlo porcentaje de completitud para cada usuario --> courses

  courses.forEach(coursesName => {// recorriendo nombre de los cursos

    if(progress[user.id].hasOwnProperty([coursesName])){// hasOwnProperty me indica si el usuario cuenta con la propiedad que estoy evaluando y devuelve un booleano
      percent= progress[user.id].intro.percent; 
      const usersUnits= progress[user.id].intro.units;
      Object.keys(usersUnits).forEach((unitName)=>{// Se capturan los arrays con las propiedades enumerdas  y las recorro con el método de forEach
        const parts= usersUnits[unitName].parts
        Object.keys(parts).forEach((partName)=>{
          const partsName= parts[partName];
          console.log(partsName);
          if(partsName.hasOwnProperty('exercises')){
            const exercises= partName.exercises;
            Object.keys(exercises).forEach((exerciseName)=>{
              const exercise= exercises[exerciseName];
              exerciseTotal += 1;
              if(exercise.completed !== undefined){ // Se coloca undefined para que 
                exerciseCompleted += exercise.completed;
              }else{
                exerciseCompleted = 0;
              }
            });
          }
          //calculo lecturas 

          if(partsName.hasOwnProperty('type')){

            if(partsName.type === 'reads'){
              readsTotal++;
              readsCompleted += partsName.completed;
            }
          }
          //quizzes
          if(partsName.hasOwnProperty('type')){
            if(partsName.type === 'quiz'){
              quizzesTotal+= 1;
              quizzesTotal+= partsName.completed;
              scoreSum+= partsName.score ? partsName.score : 0;
              scoreAvg+= scoreSum / quizzesCompleted ? scoreSum / quizzesCompleted : 0;
            }
          }
        })
      })
    }  
  })
  //caculo porcentaje
  const exercisePercent= (exerciseCompleted / exerciseTotal)* 100
  const readsPercent = (readsCompleted / readsTotal)* 100
  const quizzesPercent = (quizzesCompleted/ quizzesTotal) *100

// obtengo usuarias con sus progresos

  const userWithSats ={
    name: user.name.toUpperCase(),
    stats:{
      percent:percent,
      exercises: {
        total: exerciseTotal,
        completed: exerciseCompleted,
        percent : exercisePercent,
      },
      reads: {
        total: readsTotal,
        completed: readsCompleted,
        percent : Math.round(readsPercent), //aquí se redondea 
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
  return userWithSats
  });
  return newUsers
};

window.processCohortData =(options)=>{
  let courses = Object.keys(options.cohort.coursesIndex);
  let estudiantes = window.computeUsersStats(options.cohortData.users,options.cohortData.progress, courses )
  console.log(courses);
}