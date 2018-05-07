var xQanak = 40;
var yQanak = 40;
var matrix = [];
for (var y = 0; y < yQanak; y++) {
    matrix[y] = [];
    for (var x = 0; x < xQanak; x++) {
        matrix[y][x] = Math.round(Math.random() * 1);
    }
}

var xotakerQanak = 200;
var gishQanak = 50;
var womenQanak =15;
var menQanak = 10;





var side = 20;
var grassArr = [];
var eatArr = [];
var eaterArr = [];
var womenArr = [];
var menArr = [];
// matrix = [
//    [0, 0, 1, 0, 0],
//    [1, 0, 0, 0, 0],
//    [0, 1, 2, 0, 0],
//    [0, 0, 1, 0, 0],
//    [1, 1, 0, 3, 0],
//    [1, 1, 0, 0, 0],
//    [1, 1, 0, 0, 0]
// ];

function setup() {

    while (xotakerQanak > 0) {
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));


        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            xotakerQanak--;
        }
    }
    while (gishQanak > 0) {
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));


        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            gishQanak--;
        }
    }
    while (womenQanak > 0) {
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));


        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            womenQanak--;
        }
    }
    while (menQanak > 0) {
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));


        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            menQanak--;
        }
    }



    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var b = 0; b < matrix.length; b++) {
        for (var a = 0; a < matrix[0].length; a++) {
            if (matrix[b][a] == 1) {
                var gr = new Grass(a, b, 1);
                grassArr.push(gr);
            } else if (matrix[b][a] == 2) {
                var ea = new GrassEater(a, b, 2)
                eatArr.push(ea);
            }
            else if (matrix[b][a] == 3) {
                var tt = new Eater(a, b, 3)
                eaterArr.push(tt);
            }
            else if (matrix[b][a] == 5) {
                var mn = new Men(a, b, 5)
                menArr.push(mn);
            }
            else if (matrix[b][a] == 4) {
                var wm = new Women(a, b, 5)
                womenArr.push(wm);
            }
        }
    }



}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }


    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var h in eatArr) {
        eatArr[h].eat();
    }
    for (var d in eaterArr) {
        eaterArr[d].eat();
    }
    for (var b in womenArr) {
        womenArr[b].eat();
    }
    for (var c in menArr) {
        menArr[c].eat();
    }
}


