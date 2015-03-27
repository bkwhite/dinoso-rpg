// create offscreen buffer,
var buffer = document.createElement('canvas');
var bx = buffer.getContext('2d');

img.onload = function() {

    buffer.width = this.width;
    buffer.height = this.height;

    // fill offscreen buffer with the tint color
    bx.fillStyle = 'orange';
    bx.fillRect(0,0,this.width,this.height);

    bx.globalCompositeOperation = "destination-atop";
    bx.drawImage(img,0,0);


    ctx.drawImage( this, 0, 0 );
    ctx.globalAlpha = 0.7;
    ctx.drawImage(buffer,0,0);
    //ctx.drawImage(color(this),0,0);
}/**
 * Created by Bradley on 3/27/2015.
 */
