import Ember from 'ember';
import { dependentRelationshipsContext as relationshipContexts } from '../utils/defined-data';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'list-group-item' ],

  contextualRelationship: computed('dependent.{gender,relationship}', function () {
    let m = this.get('dependent').getProperties('gender', 'relationship'),
        context = relationshipContexts[ m.relationship ];

    return context ? context[ m.gender.charAt(0).toUpperCase() + m.gender.slice(1) ] : m.relationship;
  })
});
