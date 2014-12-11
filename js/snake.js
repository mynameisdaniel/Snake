( function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var DIRECTIONS = { "N": [ -1, 0 ], 
                     "E": [ 0, 1 ],
                     "S": [ 1, 0 ], 
                     "W": [ 0, -1 ]
                   };
  
  var Serpent = Snake.Serpent = function (){
    this.dir = "S";
    this.segments = [[3,3],[3,2]];      
  }
  
  Serpent.prototype.turn = function (direction){
    this.dir = direction;
  }
  
  Serpent.prototype.move = function () {
    var lastIndex = this.segments.length - 1;
    var newSegmentX = this.segments[lastIndex][0] + DIRECTIONS[this.dir][0];
    var newSegmentY = this.segments[lastIndex][1] + DIRECTIONS[this.dir][1];
    
    this.segments.shift();
    this.segments.push([newSegmentX , newSegmentY]);
  }
  
  Serpent.prototype.alive = function () {
    var onGrid = true
    var alive = true
    this.segments.forEach( function(coord){
      if (coord[0] < 0 || coord[0] > 19 || coord[1] < 0 || coord[1] > 19) {
        onGrid = false
      }
    })
    for (var i = 0; i < this.segments.length -2; i++){
      for (var j = i+1; j < this.segments.length -1; j++){
        if (this.segments[i][0] == this.segments[j][0] && this.segments[i][1] == this.segments[j][1]){
          alive = false
        }
      }
    }
    if (!alive || !onGrid) {
      return false 
    } else {
      return true  
    }
  }

  Serpent.prototype.grow = function () {
    var lastIndex = this.segments.length - 1;
    var newSegmentX = this.segments[lastIndex][0] + DIRECTIONS[this.dir][0];
    var newSegmentY = this.segments[lastIndex][1] + DIRECTIONS[this.dir][1];
    
    this.segments.push([newSegmentX , newSegmentY]);
  }
    
  var Coord = Snake.Coord = function (){};
  
  Coord.prototype.plus = function (position) {
    Snake.Serpent.segments.push(position)
  }
  
})();