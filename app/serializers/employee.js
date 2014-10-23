import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    contactMethods: { embedded: 'always' },
    beneficiaries:  { embedded: 'always' },
    notes:          { embedded: 'always' },
    medicalRates:   { deserialize: 'records', serialize: 'ids' },
    dentalRates:    { deserialize: 'records', serialize: 'ids' },
    visionRates:    { deserialize: 'records', serialize: 'ids' },
    lifeRates:      { deserialize: 'records', serialize: 'ids' }
  },

  normalizeHash: {
    employee: function ( hash ) {
      if( hash.name ) {
        hash.firstName     = hash.name.first;
        hash.middleInitial = hash.name.middleInitial;
        hash.lastName      = hash.name.last;
        hash.suffix        = hash.name.suffix;

        delete hash.name;
      }

      if( hash.address ) {
        hash.addressLine1 = hash.address.line1;
        hash.addressLine2 = hash.address.line2;
        hash.city         = hash.address.city;
        hash.state        = hash.address.state;
        hash.zipcode      = hash.address.zipcode;

        delete hash.address;
      }

      if( hash.plans ) {
        hash.medicalRates = hash.plans.medical;
        hash.dentalRates  = hash.plans.dental;
        hash.visionRates  = hash.plans.vision;
        hash.lifeRates    = hash.plans.life;

        if( hash.planOptions ) {
          hash.medicalPlanCovers = ( hash.planOptions.medical ) ? hash.planOptions.medical.covers : null;
          hash.dentalPlanCovers  = ( hash.planOptions.dental )  ? hash.planOptions.dental.covers  : null;
          hash.visionPlanCovers  = ( hash.planOptions.vision )  ? hash.planOptions.vision.covers  : null;
          hash.lifePlanCovers    = ( hash.planOptions.life )    ? hash.planOptions.life.covers    : null;
          
          delete hash.planOptions;
        }

        delete hash.plans;
      }

      return hash;
    }
  },

  serialize: function ( employee ) {
    console.log(employee.get('id'));
    var json = this._super.apply(this, arguments);
    console.log(json);
    json.name = {
      first:         employee.get('firstName'),
      last:          employee.get('lastName'),
      middleInitial: employee.get('middleInitial'),
      suffix:        employee.get('suffix')
    };

    delete json.firstName;
    delete json.lastName;
    delete json.middleInitial;
    delete json.suffix;

    json.address = {
      line1:   employee.get('addressLine1'),
      line2:   employee.get('addressLine2'),
      city:    employee.get('city'),
      state:   employee.get('state'),
      zipcode: employee.get('zipcode')
    };

    delete json.addressLine1;
    delete json.addressLine2;
    delete json.city;
    delete json.state;
    delete json.zipcode;
    console.log(json);
    json._id = json.id;

    delete json.id;
    console.log(json);

    return json;
  }
});
