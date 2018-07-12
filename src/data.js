window.computeUsersStats = (users, progress, courses) => {
  console.log(users, progress)
  /* let user1 = users;
  let progress1= progress;


  let newUsers= users1.filter((user)=> user.role === 'student').map(user =>{
    const progresYusuario = progress1[user.id];
    return ({
      stats:{
        name: user.name,
        percent:,
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
  // me retorna nuevo array con usuarios

 /*  let newUsers= users1.map((user)=> user.role === 'student' {  */// me retora nuevo array con usuarios

    /*  Declaro variables para cada propiedad del progreso de las alumnas
     propiedades del progreso  */
  const usersWithStats = [];
  // Paso 1: calcúlo porcentaje de completitud para cada usuario --> courses

  courses.forEach(coursesName => {// recorriendo nombre de los cursos
    users.forEach((user) => {
      let percent= 0;
      let exerciseTotal= 0;
      let exerciseCompleted= 0;
      let readsTotal =0;
      let readsCompleted= 0;
      let quizzesTotal= 0;
      let quizzesCompleted= 0;
      let scoreSum= 0;
      let scoreAvg= 0;

      if(progress[user.id] && progress[user.id].hasOwnProperty(coursesName)){// hasOwnProperty me indica si el usuario cuenta con la propiedad que estoy evaluando y devuelve un booleano
        percent= progress[user.id].intro.percent; 
        const usersUnits= progress[user.id].intro.units;
        Object.keys(usersUnits).forEach((unitName)=>{// Se capturan los arrays con las propiedades enumerdas  y las recorro con el método de forEach
          const parts= usersUnits[unitName].parts
          Object.keys(parts).forEach((partName)=>{
            const part = parts[partName];

            //calculo ejercicios
            if(part.hasOwnProperty('exercises')){
              const exercises= part.exercises;
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
            //calculo reads
  
            if(part.hasOwnProperty('type')){

                if(part.type === 'read'){
                readsTotal++;
                readsCompleted += part.completed;
                
              }

              //calculo Quizzes

              if(part.type === 'quiz'){
                quizzesTotal+= 1;
                quizzesTotal+= part.completed;
                scoreSum+= part.score ? part.score : 0;
                scoreAvg+= scoreSum / quizzesCompleted ? scoreSum / quizzesCompleted : 0;
              }
            }
          })
        })
      }  
    //caculo porcentaje
    // if ,si esto es iugl a 0 sino e otra fórmula si extotal =0
    const exercisePercent= (exerciseCompleted / exerciseTotal) * 100
    const readsPercent = (readsCompleted / readsTotal)* 100
    const quizzesPercent = (quizzesCompleted/ quizzesTotal) *100
  
  // obtengo usuarias con sus progresos
  
    const userWithStats = {
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
  return usersWithStats
},

window.processCohortData =(options)=>{
  let courses = Object.keys(options.cohort.coursesIndex);
  let estudiantes = window.computeUsersStats(options.cohortData.users,options.cohortData.progress, courses )
  console.log(estudiantes);
}