import AppGlobals from '../globals/app';

export default {
  name: 'globals',
  after: 'inject-session',

  initialize: function(container, app) {
    app.deferReadiness();

    container.register('globals:app', AppGlobals.extend(), { singleton: true });

    var globcon = container.lookup('globals:app');

    globcon.initialize().then(function () {
      container.typeInjection('route', 'globals', 'globals:app');
      container.typeInjection('controller', 'globals', 'globals:app');
      container.typeInjection('component', 'globals', 'globals:app');

      app.advanceReadiness();
    });
  }
};
