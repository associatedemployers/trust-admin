import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'canvas',
  classNames: [ 'resource-letter-image' ],
  attributeBindings: [ 'width', 'height' ],

  didInsertElement: function () {
    this._super();
    this._draw();
  },

  contentDidChange: function () {
    this._draw();
  }.observes('r', 'g', 'b', 'text'),

  _draw: function () {
    var canvas  = this.$()[ 0 ],
        context = canvas.getContext('2d'),
        w       = canvas.width,
        h       = canvas.height;

    context.clearRect(0, 0, w, h); // Clear the canvas

    var colorSt = this.getProperties('r', 'g', 'b'),
        colorEn = {};

    for ( var key in colorSt ) {
      colorEn[ key ] = Math.abs( colorSt[ key ] - 30 );
    }

    colorSt.a = '.80';
    colorEn.a = '.80';
    
    var rgbaSt = this._genRgbaStr( colorSt ),
        rgbaEn = this._genRgbaStr( colorEn ),
        bg     = context.createLinearGradient(0, 0, canvas.height, 0);

    // Draw background
    bg.addColorStop(0, rgbaSt);
    bg.addColorStop(1, rgbaEn);

    context.fillStyle = bg;
    context.fillRect(0, 0, w, h);

    // Draw letters
    context.fillStyle    = 'white';
    context.font         = '100 ' + ( h - ( w / 2.5 ) ) + 'px roboto';
    context.textAlign    = 'center';
    context.textBaseline = 'middle';

    context.fillText(this.get('text'), w / 2 , h / 2);
  },

  _genRgbaStr: function ( color ) {
    return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
  }
});
