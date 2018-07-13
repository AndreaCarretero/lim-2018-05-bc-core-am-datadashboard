window.computeUsersStats = (users, progress, courses) => {

  let usersCopy = users;
  let progressCopy= progress;
  usersCopy = users.filter(user =>user.role === 'student');  

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
      //aqui se conectaran students(users) y progressCopy(pogress)
      if(progressCopy[user.id] && progressCopy[user.id].hasOwnProperty(coursesName)){// hasOwnProperty me indica si el usuario cuenta con la propiedad que estoy evaluando y devuelve un booleano
        percent= progressCopy[user.id].intro.percent; 
        const usersUnits= progressCopy[user.id].intro.units;
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

            if(part.hasOwnProperty('type')){
              if(part.type === 'read'&& readsCompleted!== 0){
                readsTotal++;
                readsCompleted += part.completed; }
                else if (part.type === 'read'&& readsCompleted === 0){
                readsCompleted = 1;
                readsTotal = 1
                }

              //calculo Quizzes

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
    // if ,si esto es iugl a 0 sino e otra fórmula si extotal =0
    let calculatePercent= (a,b) =>{
      if(b==0){
        return 0;
      }else
      return (a/b)*100;

    }
    const exercisePercent= calculatePercent(exerciseCompleted, exerciseTotal );
    const readsPercent = calculatePercent(readsCompleted, readsTotal);
    const quizzesPercent = calculatePercent(quizzesCompleted, quizzesTotal);
  
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
  let showStudents= window.computeUsersStats(options.cohortData.users,options.cohortData.progress, courses )
  console.log(showStudents);
}