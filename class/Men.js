var eak = require("./eak.js");
class Men extends eak{
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
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            matrix[this.y][this.x] = 0;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            this.y = newY;
            this.x = newX;
        } else {
            this.dead();
        }

    }
    mul() {
        var gender = [4, 5];
        var emptyCells = this.chooseCell(4);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(0);
        var newCell1 = random(emptyCells1);
        this.energy = 1;

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var nX = newCell1[0];
            var nY = newCell1[1];
            matrix[nY][nX] = random(gender);
            if (matrix[newY][newX] == 4) {
                var newWomen = new Women(nX, nY, this.index);
                womenArr.push(newWomen);
                this.energy = 1;
            }
            else if (matrix[newY][newX] == 5) {
                var newMen = new Men(nX, nY, this.index);
                menArr.push(newMen);
                this.energy = 1;
            }

        }
    }



    dead() {

        for (var i in menArr) {
            if (this.x == menArr[i].x && this.y == menArr[i].y) {
                matrix[this.y][this.x] = 0;
                menArr.splice(i, 1);

                break;
            }
        }
    }
    eat() {

        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = random(emptyCells1);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            this.y = newY;
            this.x = newX;
            this.energy++;
            for (var i in eatArr) {
                if (newX == eatArr[i].x && newY == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }



        }
        else if (newCell1) {
            matrix[this.y][this.x] = 0;
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = 5;

            this.y = newY;
            this.x = newX;
            this.energy++;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
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