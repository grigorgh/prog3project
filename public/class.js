class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    dead() {
        for (var i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                matrix[this.y][this.x] = 0;
                grassArr.splice(i, 1);

                break;
            }
        }
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 1) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
        else {
            this.dead();
        }

    }

}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;


        }

    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newEat = new GrassEater(newX, newY, this.index);
            eatArr.push(newEat);
            this.energy = 6;

        }
    }
    eat() {

        var emptyCells = this.chooseCell(1);
        var newCellGrass = random(emptyCells);
        if (newCellGrass) {
            var newX = newCellGrass[0];
            var newY = newCellGrass[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
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
        if (this.energy <= 4) {
            this.dead();
        }
        if (this.energy >= 12) {
            this.mul();
        }


    }
    dead() {
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}
class Eater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
class Women {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            matrix[this.y][this.x] = 0;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            this.y = newY;
            this.x = newX;
        } else {
            this.dead();
        }

    }
    mul() {
        var gender = [4, 5];
        var emptyCells = this.chooseCell(5);
        var newCell = random(emptyCells);
        var emptyCells = this.chooseCell(0);
        var newCell1 = random(emptyCells);
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

        for (var i in womenArr) {
            if (this.x == womenArr[i].x && this.y == womenArr[i].y) {
                matrix[this.y][this.x] = 0;
                womenArr.splice(i, 1);
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
            matrix[newY][newX] = 4;
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
            matrix[newY][newX] = 4;

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



class Men {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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

