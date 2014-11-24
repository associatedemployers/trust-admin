export var initialize = function ( container, app ) {
  console.debug('Init :: Injecting store');
  app.inject('modules:session', 'store', 'store:main');
};

export default {
  name: 'inject-store-to-modules',
  after: 'store',

  initialize: initialize
};
