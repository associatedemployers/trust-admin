import Ember from 'ember';

function timeAgo ( [timestamp] ) {
  return moment( timestamp ).fromNow();
}

export {
  timeAgo
};

export default Ember.Helper.helper(timeAgo);
