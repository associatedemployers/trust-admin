import Ember from 'ember';
import { dependent_relationships_context as relationshipContexts } from '../utils/defined-data';

export default Ember.Controller.extend({
  contextualRelationship: function () {
    var m       = this.get('content').getProperties('gender', 'relationship'),
        context = relationshipContexts[ m.relationship ];

    return ( context ) ? context[ m.gender.charAt(0).toUpperCase() + m.gender.slice(1) ] : m.relationship;
  }.property('content.gender', 'content.relationship')
});
