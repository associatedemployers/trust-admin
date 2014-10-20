import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeHash: {
    dependent: function ( hash ) {
      if( hash.name ) {
        hash.firstName     = hash.name.first;
        hash.middleInitial = hash.name.middleInitial;
        hash.lastName      = hash.name.last;
        hash.suffix        = hash.name.suffix;

        delete hash.name;
      }

      if( hash.plans ) {
        hash.medicalRates = hash.plans.medical;
        hash.dentalRates  = hash.plans.dental;
        hash.visionRates  = hash.plans.vision;
        hash.lifeRates    = hash.plans.life;

        delete hash.plans;
      }

      return hash;
    }
  },
});
