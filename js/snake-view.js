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

  }
  
  View.prototype.bindEvents = function () {
      $("body").on("keydown", this.makeMove.bind(this));
    };
  
  View.prototype.makeMove = function (event) {
    switch(event.keyCode) {
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
    this.$el.append("<br><br><div id='score'>Score: " + this.board.score +"</div>")
  }

  View.prototype.step = function () {
    if (this.snake.alive()){
    this.snake.move();
    this.board.updateGrid(this.snake);
    this.board.makeApple();
    this.board.eatApple();
    this.$el.children().remove();
    this.setupGrid();
    } else {
      this.$el.find('#score').html("Score: " + this.board.score + " GameOver :(");
    }
  }
  
})();