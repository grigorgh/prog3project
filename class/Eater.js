var eak = require("./eak.js");
class Eater extends eak{
    constructor(x, y, index) {
        this.energy = 6;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell) {
            matrix[this.y][this.x] = 0;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            this.y = newY;
            this.x = newX;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }

            }



        } else {
            this.dead();
        }

    }
    mul() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newEater = new Eater(newX, newY, this.index);
            eaterArr.push(newEater);
            this.energy = 6;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    matrix[this.y][this.x] = 0;
                    grassArr.splice(i, 1);
                    break;
                }

            }


        }
    }

    dead() {

        for (var i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                matrix[this.y][this.x] = 0;
                eaterArr.splice(i, 1);

                break;
            }
        }
    }


    eat() {

        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        var emptyCells4 = this.chooseCell(4);
        var newCell4 = random(emptyCells4);
        var emptyCells5 = this.chooseCell(5);
        var newCell5 = random(emptyCells5);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            this.y = newY;
            this.x = newX;
            this.energy += 2;
            for (var i in eatArr) {
                if (newX == eatArr[i].x && newY == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }



        }
        else if (newCell4 && this.energy >= 8) {
            matrix[this.y][this.x] = 0;
            var newX = newCell4[0];
            var newY = newCell4[1];
            matrix[newY][newX] = 3;

            this.y = newY;
            this.x = newX;
            this.energy += 3;
            for (var i in womenArr) {
                if (newX == womenArr[i].x && newY == womenArr[i].y) {
                    womenArr.splice(i, 1);
                    break;
                }
            }
        } else if (newCell5 && this.energy >= 10) {
            matrix[this.y][this.x] = 0;
            var newX = newCell5[0];
            var newY = newCell5[1];
            matrix[newY][newX] = 3;

            this.y = newY;
            this.x = newX;
            this.energy += 4;
            for (var i in menArr) {
                if (newX == menArr[i].x && newY == menArr[i].y) {
                    menArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
        if (this.energy <= 0) {

            this.dead();
        }
        if (this.energy >= 12) {
            this.mul();

        }
    }
}
