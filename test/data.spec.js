describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const studentA = {
      name: "LESLIEANDREA",
      stats: {
        exercises: {
          completed: 4,
          percent: 100,
          total: 4
        },
        percent: 100,
         quizzes: {
          completed: 2,
	        percent: 100,
          scoreAvg: 79,
          scoreSum: 287,
          total: 2
        },
        reads: {
          completed: 9,
          percent: 100,
          total: 9
        }
      }
    }
    const studentB = {
      name: "SABRINA CAMPOS",
      stats: {
        exercises: {
          completed: 2,
          percent: 50,
          total: 4
        },
        percent: 50,
        quizzes: {
          completed: 1,
          percent: 50,
          scoreAvg: 65,
          scoreSum: 267,
          total: 2
        },
        reads: {
          completed: 5,
          percent: 60,
          total: 9
        }
      }
    }
    const studentC = {
      name: "FIORELLA SANCHEZ",
      stats: {
        exercises: {
          completed: 0,
          percent: 0,
          total: 2
        },
        percent: 25,
        quizzes: {
          completed: 0,
          percent: 15,
          scoreAvg: 45,
          scoreSum: 191,
          total: 2
        },
        reads: {
          completed: 1,
          percent: 20,
          total: 9

        }
      } 
    }
   let studentsTest =  [studentA,studentB,studentC];
   it('debería retornar arreglo de usuarios ordenado por nombre ASC', ()=>{
     assert.deepEqual(sortUsers(studentsTest,"name","asc"),[studentC,studentA,studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"name","desc"),[studentB,studentA,studentC])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"percent","asc"),[studentC,studentB,studentA])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"percent","desc"),[studentA,studentB,studentC])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"exercises","asc"),[studentC,studentB,studentA])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"exercises","desc"),[studentA,studentB,studentC])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"quizzes","asc"),[studentC,studentB,studentA])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',()=>[
      assert.deepEqual(sortUsers(studentsTest,"quizzes","desc"),[studentA,studentB,studentC])
    ]);
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"scoreAvg","asc"),[studentC,studentB,studentA])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"scoreAvg","desc"),[studentA,studentB,studentC])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"reads","asc"),[studentC,studentB,studentA])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',()=>{
      assert.deepEqual(sortUsers(studentsTest,"reads","desc"),[studentA,studentB,studentC])
    });

  });

  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
