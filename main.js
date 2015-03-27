/**
 * Created by Bradley on 3/27/2015.
 */
data = {
    "code": [
        "f",
        "m"
    ],
    "parts": [
        "body",
        "nose",
        "legs",
        "head",
        "hair",
        "feet",
        "eyes",
        "torso"
    ],
    "count": [
        [
            7,
            9
        ],
        [
            20,
            20
        ],
        [
            5,
            5
        ],
        [
            24,
            19
        ],
        [
            15,
            9
        ],
        [
            11,
            4
        ],
        [
            7,
            7
        ],
        [
            31,
            4
        ]
    ]
};

codes = data["code"];
parts = data["parts"];
counts = data["count"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRGBKs( img ) {
    var w = img.width;
    var h = img.height;
    var rgbks = [];

    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext("2d");
    ctx.drawImage( img, 0, 0 );

    var pixels = ctx.getImageData( 0, 0, w, h ).data;

    // 4 is used to ask for 3 images: red, green, blue and
    // black in that order.
    for ( var rgbI = 0; rgbI < 4; rgbI++ ) {
        var canvas = document.createElement("canvas");
        canvas.width  = w;
        canvas.height = h;

        var ctx = canvas.getContext('2d');
        ctx.drawImage( img, 0, 0 );
        var to = ctx.getImageData( 0, 0, w, h );
        var toData = to.data;

        for (
            var i = 0, len = pixels.length;
            i < len;
            i += 4
        ) {
            toData[i  ] = (rgbI === 0) ? pixels[i  ] : 0;
            toData[i+1] = (rgbI === 1) ? pixels[i+1] : 0;
            toData[i+2] = (rgbI === 2) ? pixels[i+2] : 0;
            toData[i+3] =                pixels[i+3]    ;
        }

        ctx.putImageData( to, 0, 0 );

        // image is _slightly_ faster then canvas for this, so convert
        var imgComp = new Image();
        imgComp.src = canvas.toDataURL();

        rgbks.push( imgComp );
    }

    return rgbks;
}

function generateTintImage( img, rgbks, red, green, blue ) {
    var buff = document.createElement( "canvas" );
    buff.width  = img.width;
    buff.height = img.height;

    var ctx  = buff.getContext("2d");

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage( rgbks[3], 0, 0 );

    ctx.globalCompositeOperation = 'source-in';
    if ( red > 0 ) {
        ctx.globalAlpha = red   / 255.0;
        ctx.drawImage( rgbks[0], 0, 0 );
    }
    if ( green > 0 ) {
        ctx.globalAlpha = green / 255.0;
        ctx.drawImage( rgbks[1], 0, 0 );
    }
    if ( blue > 0 ) {
        ctx.globalAlpha = blue  / 255.0;
        ctx.drawImage( rgbks[2], 0, 0 );
    }

    return buff;
}



function color(image) {
    var myCanvas=document.createElement("canvas");
    var myCanvasContext=myCanvas.getContext("2d");

    var imgWidth=image.width;
    var imgHeight=image.height;
    // You'll get some string error if you fail to specify the dimensions
    myCanvas.width= imgWidth;
    myCanvas.height=imgHeight;
    //  alert(imgWidth);
    myCanvasContext.drawImage(image,0,0);

    // This function cannot be called if the image is not rom the same domain.
    // You'll get security error if you do.


    myCanvasContext.globalCompositeOperation = "source-in";
    myCanvasContext.fillStyle = getRandomColor();
    myCanvasContext.globalAlpha = 0.95;
    myCanvasContext.rect(0,0,myCanvas.width, myCanvas.height);
    myCanvasContext.fill();
    myCanvasContext.restore();

    var newImg = new Image();
    newImg.src = myCanvas.toDataURL();

    return newImg;
}

function randomSprite(id) {
    var r_code = getRandomInt(0, 1);
    var r_parts = { code: r_code };

    for(var i = 0; i < counts.length; i++) {
        var rndI = getRandomInt(0, counts[i][r_code]);
        //console.log(rndI + "(" + 0 + "," + counts[i][r_code] + ")");

        r_parts[parts[i]] = rndI.toString();
        //console.log(r_parts[parts[i]] + ": " + counts[i][r_code]);
    }

// img

// part#

// code

// rnd count [part] [code]


    //$('<canvas />').attr('id',id).attr('width',30).attr('height',49).appendTo('#list');
    $('<canvas />').attr('id',"c" + id).attr('width',30).attr('height',49).appendTo('#list');

    //$('<br/>').appendTo('#list');


    var c = document.getElementById("c" + id);
    var ctx = c.getContext("2d");

    var toDraw = [];

    for( var i = 0; i < parts.length; i++) {
        //console.log(parts[i] + ":" + i);

        var url = './img/' + i + '/' + r_code + '/' + r_parts[parts[i]] + '.png';

        toDraw.push(url);

        //console.log(url);

        //$('<img />').attr('src',url).appendTo('#list');

    }

    var img = new Image();
    img.onload = function(){
        ctx.drawImage(this,0,0);

        for (var i = 1; i < toDraw.length; i++) {

            if (i != 4) {
                var img = new Image();

                img.onload = function () {

                    if (i != 4) {

                        ctx.drawImage(color(this), 0, 0);
                        ctx.globalAlpha = 0.7;
                        ctx.drawImage(this, 0, 0);
                        ctx.globalAlpha = 1.0;
                    }
                }
                img.src = toDraw[i];
            } else {
                var img = new Image();
                img.onload = function () {
                    if (i != 4) {
                        ctx.drawImage(color(this), 0, 0);
                        ctx.globalAlpha = 0.5;
                        ctx.drawImage(this, 0, 0);
                        ctx.globalAlpha = 1.0;
                    }
                }
                img.src = toDraw[i];
            }
        }

    };
    img.src = toDraw[0];
    //$('<br/>').appendTo('#list');
}

for (var i = 0; i < 1000; i++) {
    randomSprite(i);
}
