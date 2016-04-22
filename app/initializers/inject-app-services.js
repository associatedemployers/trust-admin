import Ember from 'ember';

export const initialize = function ( application ) {
  Ember.Logger.debug('Init :: Injecting App Services');
  // Session Service
  application.inject('controller', 'session', 'service:session');
  application.inject('route', 'session', 'service:session');
  // Globals Service
  application.inject('controller', 'session', 'service:globals');
  application.inject('route', 'session', 'service:globals');
};

export default {
  initialize,
  name: 'inject-app-services'
};
