export var initialize = function ( container, application ) {
  console.debug('Init :: Injecting session');
  application.deferReadiness();

  var store         = container.lookup('store:main'),
      sessionModule = container.lookup('modules:session');

  var existingSession;

  store.find('session').then(function ( sessions ) {
    sessions.forEach(function ( session ) {
      if( moment( session.get('expires') ).isAfter( moment() ) ) {
        existingSession = session;
      } else {
        session.destroyRecord();
      }
    });

    if( existingSession ) {
      sessionModule.set('content', existingSession);
    }

    container.typeInjection('controller', 'session', 'modules:session');
    container.typeInjection('route', 'session', 'modules:session');
    container.typeInjection('component', 'session', 'modules:session');

    application.advanceReadiness();
  });
};

export default {
  name: 'inject-session',
  after: 'register-modules',

  initialize: initialize
};
