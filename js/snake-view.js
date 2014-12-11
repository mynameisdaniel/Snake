( function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var View = Snake.View = function (snake, $el) {
    this.snake = snake;
    this.$el = $el;
    this.board = new Snake.Board(snake);
    this.setupGrid();
    this.bindEvents();
    this.pause = false;
    this.topScore = 0;
  }
  
  View.prototype.bindEvents = function () {
      $("body").on("keydown", this.makeMove.bind(this));
    };
  
  View.prototype.makeMove = function (event) {
    switch(event.keyCode) {
    case 82:
      this.snake = new Snake.Serpent();
      this.board = new Snake.Board(this.snake);
      break;
    case 32:
      if (this.pause){
        this.pause = false;
      } else {
        this.pause = true;
      }
      break;
    case 37:
      this.snake.turn("W")
      break;
    case 38:
      this.snake.turn("N")
      break;
    case 39:
      this.snake.turn("E")
      break;
    case 40:
      this.snake.turn("S")
      break;
    default:
    }
  };

  View.prototype.setupGrid = function () {
    this.$el.html(this.board.render())
    this.$el.append("<br><div id='score'>" +
      "<b>High Schore: " + this.topScore + "<br>" +
      "<b>Score: </b>" + this.board.score +"</div>")
  }

  View.prototype.updateScore = function () {
    if (this.board.score > this.topScore) {
      this.topScore = this.board.score;
    }
  }

  View.prototype.step = function () {
    if (!this.pause){
      this.$el.find('#score').html(
        "<b>High Score: " + this.topScore + "<br>" +
        "<b>Score: </b>" + this.board.score + "<b> Paused!</b>");
    } else if (this.snake.alive()){
    this.snake.move();
    this.board.updateGrid(this.snake);
    this.board.makeApple();
    this.board.eatApple();
    this.$el.children().remove();
    this.setupGrid();
    this.updateScore();
    } else {
      this.$el.find('#score').html(
        "<b>High Score: " + this.topScore + "<br>" +
        "<b>Score: </b>" + this.board.score + "<b> GameOver :(</b>");
    }
  }
  
})();