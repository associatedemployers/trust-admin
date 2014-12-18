import Ember from 'ember';
import titleCase from 'trust-admin/utils/title-case';

export {
  titleCase
};

export default Ember.Handlebars.makeBoundHelper(titleCase);
