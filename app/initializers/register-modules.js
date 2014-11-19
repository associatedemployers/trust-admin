/*
  Use this to register custom modules
*/
import Session from '../modules/session';

export var initialize = function( container ) {
  console.debug('Init :: Injecting modules');
  container.register('modules:session', Session.extend(), { singleton: true });
};

export default {
  name: 'register-modules',
  after: 'store',

  initialize: initialize
};
