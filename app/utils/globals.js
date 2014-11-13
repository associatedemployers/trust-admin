// TODO: Move permissions to server side
var permissions = [
  {
    name: 'users',
    type: 'resource',
    endpoints: [ '/users', '/user' ]
  },
  {
    name: 'companies',
    type: 'resource',
    endpoints: [ '/companies', '/company' ]
  },
  {
    name: 'employees',
    type: 'resource',
    endpoints: [ '/employees', '/employee' ]
  },
  {
    name: 'dependents',
    type: 'resource',
    endpoints: [ '/dependents', '/dependent', '/employee/dependent' ]
  },
  {
    name: 'medical rates',
    type: 'resource',
    endpoints: [ '/medical-rates', '/medical-rate', '/medicalRates', '/medicalRate' ]
  },
  {
    name: 'dental rates',
    type: 'resource',
    endpoints: [ '/dental-rates', '/dental-rate', '/dentalRates', '/dentalRate' ]
  },
  {
    name: 'vision rates',
    type: 'resource',
    endpoints: [ '/vision-rates', '/vision-rate', '/visionRates', '/visionRate' ]
  },
  {
    name: 'life rates',
    type: 'resource',
    endpoints: [ '/life-rates', '/life-rate', '/lifeRates', '/lifeRate' ]
  },
  {
    name: 'medical plans',
    type: 'resource',
    endpoints: [ '/medical-plans', '/medical-plan', '/medicalPlans', '/medicalPlan' ]
  },
  {
    name: 'history events',
    type: 'inherits :: resource method',
    endpoints: [],
    permissions: [
      {
        name: 'View',
        type: 'get',
        value: true
      },
      {
        name: 'Rollback',
        type: 'put',
        value: true
      }
    ]
  }
];

var searchNormalizationMap = {
  employee: {
    id: '_id',
    time_stamp: 'time_stamp',
    title: [ 'name.first', 'name.middleInitial', 'name.last', 'name.suffix' ]
  },
  company: {
    id: '_id',
    time_stamp: 'time_stamp',
    title: 'name.company'
  }
};

export {
  permissions,
  searchNormalizationMap
};
