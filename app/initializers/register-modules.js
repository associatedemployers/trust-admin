/*
  Use this to register custom modules
*/
import Session from '../modules/session';

export var initialize = function( container, app ) {
  console.debug('Init :: Registering modules');
  app.deferReadiness();
  container.register('modules:session', Session.extend(), { singleton: true });
  app.advanceReadiness();
};

export default {
  name: 'register-modules',
  after: 'inject-store-to-modules',

  initialize: initialize
};
