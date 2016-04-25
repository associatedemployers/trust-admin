import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'list-group-item' ],
  isPrimary: computed.equal('beneficiary.type', 'primary'),
  isContingent: computed.equal('beneficiary.type', 'contingent')
});
