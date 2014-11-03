import Ember from 'ember';

export default Ember.ObjectController.extend({
  link: function () {
    var plain = this.get('content').toJSON(),
        id    = ( plain.employee ) ? plain.employee : ( plain.company ) ? plain.company : null;

    return '/api/file/' + id + '-' + this.get('content.id') + '.' + plain.extension;
  }.property('content.extension', 'content.employee', 'content.company')
});
