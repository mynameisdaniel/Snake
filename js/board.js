( function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var SIZE = 20;
  var APPLELIMIT = 1
  
  var Board = Snake.Board = function (snake){
    this.snake = snake;
    this.grid = this.makeGrid();
    this.apples = [];
    this.score = 0
  }
  
  Board.prototype.makeApple = function (){
    if (this.apples.length < APPLELIMIT){
    var x = Math.floor((Math.random() * SIZE));
    var y = Math.floor((Math.random() * SIZE));
    if (this.appleHelper([x, y])) {
      this.apples.push([x, y]);
    } else {
      this.makeApple();
    }
  }
  }
  
  Board.prototype.appleHelper = function (coord){
    for (var i = 0; i < this.snake.segments.length; i++){
    if (coord + "" === this.snake.segments[i] + "") {
      return false;
      }
    }    
    return true
  };
  
  
  Board.prototype.makeGrid = function (){
    var grid = [];
    for (var i = 0; i < SIZE; i++) {
      grid[i] = [];
      for (var j = 0; j < SIZE; j++) {
        grid[i].push(".");
      }
    }
    return grid;
  }
  
  Board.prototype.render = function () {
    var htmlContent = ""
    for (var i = 0; i < SIZE; i++) {
      htmlContent +="<div class='row' style='display: block;clear: left;'>"
      for (var j = 0; j < SIZE; j++) {
          htmlContent += "<div class='square' data-x=" + i +  " data-y=" + j + 
        " style='float:left;border:1px solid black; width: 25px; height: 25px;"
          if (this.grid[i][j] === "S"){
            htmlContent += "background-color: green"
          } else if (this.grid[i][j] === "A"){
            htmlContent += "background-color: red"
          }
          htmlContent += "'></div>" 
      }        
      htmlContent +="</div>"
    }
    htmlContent += "</div>"
    return htmlContent;
  }

  Board.prototype.updateGrid = function (snake) {
    this.grid = this.makeGrid();
    var that = this;
    snake.segments.forEach( function (coord){
      var x = coord[0];
      var y = coord[1];
      that.grid[x][y]= "S";
                
    })
    
    this.apples.forEach( function (coord){
      var x = coord[0];
      var y = coord[1];
      that.grid[x][y] = "A"          
    })
  }
  
  Board.prototype.eatApple = function () {
    var lastIndex = this.snake.segments[this.snake.segments.length - 1];
    for (var i = 0; i < this.apples.length; i++){
    if (lastIndex[0] === this.apples[i][0] && lastIndex[1] === this.apples[i][1]) {
          this.snake.grow();  
          this.apples.splice(i, 1);
          this.score +=10
        }
      }
  }

})();
