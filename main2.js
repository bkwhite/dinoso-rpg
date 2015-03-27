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
    var data_holder = [];
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



    //$('<canvas />').attr('id',"c" + id).attr('width',30).attr('height',49).appendTo('#list');
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

    var img = c.toDataURL("image/png");
    var outputString = ('<img src="' + img + '"/>');
    //$("#list").append(outputString);

    return c.toDataURL("image/png");
}

function main_loop(count) {

    var arr = [];

    for (var i = 0; i < count; i++) {
        arr.push(randomSprite(i));
    }

    console.log(arr[0]);

    var num = Math.floor( Math.random() * arr.length );
    var img = arr [ num ];
    var imgStr = '<img src="' + img + '" alt = "">';
    document.write(imgStr); document.close();
}

main_loop(500);



