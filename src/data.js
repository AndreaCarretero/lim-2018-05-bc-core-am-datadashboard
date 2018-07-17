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







window.filterUsers = (users, search) => {

  const filterNow = users.filter(user => {
    return user.name.toLowerCase().indexOf(search.toLowerCase()) > -1;

  });

  return filterNow;
}

window.processCohortData = (options)=>{
  let courses = Object.keys(options.cohort.coursesIndex);
  // Aquí se filtrarán estudiantes para luego poder realizar función número 1
  const  usersCopy = options.cohortData.users.filter(user =>user.role === 'student'); 
  const showStudents= computeUsersStats(usersCopy,options.cohortData.progress, courses )
  console.log(showStudents);
  const viewUsersFilters = filterUsers(showStudents,options.search);
  return viewUsersFilters;
}
