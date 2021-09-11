function SnakeVisual(id, color) {
    this.X = 0;
    this.Y = 0;
    this.XDirection = Scale * 1;
    this.YDirection = 0;
    this.Weight = 0;
    this.Body = [];
    this.Id = id;
    this.Color = color;

    /* This calls the built in JavaScript canvas class taking coordinates
     * as parameters. It presents an X, and a Y location, along with a scale
     * with which to fill out to a certain point in order to display a rectangle
     * that represents an animal, or a snake. */

    this.Draw = function () {
        Ctx.fillStyle = this.Color;

        for (let i = 0; i < this.Body.length; i++) {
            Ctx.fillRect(this.Body[i].X, this.Body[i].Y, Scale, Scale);
        }

        Ctx.fillRect(this.X, this.Y, Scale, Scale);
    };

    /* Every time the update method is called, animal data is ensured.
     * A block is added to the animal based on its size (length)
     * since zero indexing occurs, it adds the value plus 1.
     * for example, if the weight is 2, 1 extra block is drawn to the
     * same location upon each iteration of the loop, until the body
     * size is reached. It continues to increment based on scale, while
     * inserting new blocks into the next location nearest to its start
     * point, giving a visual illusion that it is growing. In reality,
     * this method combined with the Draw function creates what is called
     * a trailing effect. */

    this.Update = function () {
        for (var i = 0; i < this.Body.length - 1; i++) {
            this.Body[i] = this.Body[i + 1];
        }

        this.Body[this.Weight - 1] = { X: this.X, Y: this.Y };

        this.X += this.XDirection;
        this.Y += this.YDirection;

        if (this.Y < 0) {
            this.Y = Canvas.height - Scale;
        }
        if (this.X < 0) {
            this.X = Canvas.width - Scale;
        }
        if (this.X >= Canvas.width) {
            this.X = 0;
        }
        if (this.Y >= Canvas.height) {
            this.Y = 0;
        }
    };

    /* This function sets a switch value to determine in which direction
     * the snake is to move based on the user key press passed from the DOM
     * if the direction is up, or left, the value of X or Y will decrement,
     * because the canvase is set such that lowest values begin at the upper
     * left corner of the screen. If the direction is down or right, the
     * plot position will increment. The steps moved is defined by scale,
     * which can be located in Canvas 1.js */

    this.ChangeDirection = function (keyDirection) {
        switch (keyDirection) {
            case "ArrowDown":
                this.XDirection = 0;
                this.YDirection = Scale * 1;
                break;
            case "ArrowLeft":
                this.XDirection = Scale * -1;
                this.YDirection = 0;
                break;
            case "ArrowRight":
                this.XDirection = Scale * 1;
                this.YDirection = 0;
                break;
            case "ArrowUp":
                this.XDirection = 0;
                this.YDirection = Scale * -1;
                break;
        }

        console.log(this.Y);
        console.log(this.X);
    };

    /* When a block defined as a snake, or animal is at the same location
     * as a block defined as a fruit, or food; the animal weight is increased,
     * so that another block can be added to its size, and the function returns
     * a trigger to initialize a different fruit location on the screen. It also
     * logs which animal; in this case, a snake, did what. */

    this.EatAFruit = function (fruit) {
        if (fruit.X === this.X && fruit.Y === this.Y) {
            console.log(`Identity: ${this.Id}`);
            this.Weight++;
            console.log("This object was consumed: ");
            console.log(fruit);
            return true;
        } else {
            return false;
        }
    };
}
