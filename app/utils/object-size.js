// From http://stackoverflow.com/questions/1248302/javascript-object-size
export default function objectSize ( object, multiplier, fixed ) {
  var objectList = [],
      stack      = [ object ],
      bytes      = 0;

  while ( stack.length ) {
    var value = stack.pop();

    if ( typeof value === 'boolean' ) {
      bytes += 4;
    } else if ( typeof value === 'string' ) {
      bytes += value.length * 2;
    } else if ( typeof value === 'number' ) {
      bytes += 8;
    } else if ( typeof value === 'object' && objectList.indexOf( value ) === -1 ) {
      objectList.push( value );

      for ( var i in value ) {
        if ( !value.hasOwnProperty(i) ) {
          continue;
        }

        stack.push( value[ i ] );
      }
    }
  }

  var result = multiplier ? bytes / multiplier : bytes;
  return typeof fixed === 'number' ? fixed === 0 ? Math.round(result) : result.toFixed(fixed) : result;
}
