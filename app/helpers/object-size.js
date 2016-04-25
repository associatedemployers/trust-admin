// Template alias for trust-admin/utils/object-size
import Ember from 'ember';
import ObjectSizeUtility from 'trust-admin/utils/object-size';

function objectSize ( args ) {
  return ObjectSizeUtility.apply(this, args);
}

export {
  objectSize
};

export default Ember.Helper.helper(objectSize);
