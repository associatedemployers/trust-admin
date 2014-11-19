// import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize: function ( permission ) {
    var json = this._super.apply(this, arguments);

    json._id = permission.get('id');
    delete json.id;

    console.log(json);

    return json;
  }
});
