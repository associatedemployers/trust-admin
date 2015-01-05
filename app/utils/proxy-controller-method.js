import Ember from 'ember';

export default function proxyControllerMethod ( methodName ) {
  return function () {
    var controller = this.get('controller'),
        fn         = controller[ methodName ];

    Ember.assert('Should be a valid function', typeof fn === 'function');
    fn.apply(controller, arguments);
  };
}
