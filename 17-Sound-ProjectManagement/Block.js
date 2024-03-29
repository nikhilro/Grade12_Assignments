/**
 * This class/object represents individual blocks upon which the jumper jumps.
 * @class
 * @constructor
 * @param {vector object}  location        The vector location of the block
 * @param {image }         person          The image to represent the block
 */
function Block(location, bubblegum) {
  this.location = location.copy();
  this.velocity = createVector(0, 9.8);
  this.movement = false;
  this.bubblegum = bubblegum;
  this.collected = false;

  /**
   * Displays the block on the screen
   */
  this.display = function() {
    // fill(0, 250, 0);
    // noStroke();
    // ellipse(this.location.x, this.location.y, 100, 20);
    imageMode(CENTER);
    image(this.bubblegum, this.location.x, this.location.y);
    if (!this.collected) {
      this.points();
    }
  }

  /**
   * Moves the block on the screen
   */
  this.move = function() {
    if (this.movement) {
      this.location.add(this.velocity);
    }
  }

  /**
   * helps in determining when to scroll the screen (that is move down the blocks)
   */
  this.moveIt = function() {
    this.movement = true;
  }

  /**
   * helps in determining when to scroll the screen (that is move down the blocks)
   */
  this.stopMove = function() {
    this.movement = false;
  }

  /**
   * helps in determining if the block is off screen
   */
  this.checkEdges = function() {
    if (this.location.y >= height) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * helps in setting up the point system in the game
   */
  this.points = function() { //creating a score system; each circle has its own star
    push();
    translate(this.location.x, this.location.y);
    rotate(frameCount / -50.0);
    this.star(0, -40, 15 / 5, 35 / 5, 5);
    pop();
  }

  /**
   * helps in making a star
   */
  this.star = function(x, y, radius1, radius2, npoints) { //(var x, var y, var radius1, var radius2, var npoints) { //function to draw a star in the middle of the circle
    var angle = TWO_PI / npoints;
    var halfAngle = angle / 2.0;
    strokeWeight(5);
    stroke(255, 50, 50);
    fill(255, 0, 0);
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius2;
      var sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  /**
   * helps in determining if the point has been collected
   */
  this.collect = function() { //returns whether the star(score system) has been collected or not
    if (!this.collected) {
      this.collected = true
      return true;
    } else {
      return false;
    }
  }

}