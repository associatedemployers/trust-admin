export var initialize = function ( container ) {
  console.debug('Init :: Injecting store');
  container.typeInjection('session', 'store', 'store:main');
};

export default {
  name: 'inject-store-to-modules',
  after: 'register-modules',

  initialize: initialize
};
