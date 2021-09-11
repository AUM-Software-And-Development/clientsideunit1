function FruitVisual(color) {
    this.X;
    this.Y;
    this.Color = color;

    /* Sets a random fruit location based on the previously defined columns
     * at a scale relevant to the Scale value */

    this.SetRandom = function () {
        this.X = (Math.floor(Math.random() * Rows - 1) + 1) * Scale;
        this.Y = (Math.floor(Math.random() * Columns - 1) + 1) * Scale;
    };

    /* Draws the fruit at those locations using the randomized values */

    this.Draw = function () {
        Ctx.fillStyle = this.Color;
        Ctx.fillRect(this.X, this.Y, Scale, Scale);
    };
}
