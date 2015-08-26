var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var grid = [];
var mouse = {x:0,y:0};
var GRIDSIZE = 32;
var spawnLoc = {x:37,y:38};
var monsters = [];


block = function(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type;
}

entity = function(type){
	this.x = spawnLoc.x;
	this.y = spawnLoc.y;
	this.type = type;
	this.xtimer = 0;
	this.ytimer = 0;
	this.xmove = 1;
	this.ymove = 0;
	this.move = function(){
		this.x += this.xmove;
		this.y += this.ymove;

		this.xtimer -= 1;
		this.ytimer -= 1;

		if(this.xtimer <= 0){
			if(this.xmove != 0){
				this.check(this.xmove < 0 ? 2 : 4);
			}else{
				this.xtimer = 0;
			}
		}

		if(this.ytimer <= 0){
			if(this.ymove != 0){
				this.check(this.ymove < 0 ? 3 : 1);
			}else{
				this.ytimer = 0;
			}
		}
	}

	this.check = function(dir){
		var worldx = Math.floor(this.x / GRIDSIZE);
		var worldy = Math.floor(this.y / GRIDSIZE);

		for(var x = 1 ; x < 5 ; x++){
			if(x != dir){
				if(x == 1){ //up
					if(grid[worldy - 1][worldx].type == 1){
						this.ymove = -1;
						this.xmove = 0;
						this.xtimer = 0;
						this.ytimer = GRIDSIZE;
						return;
					}
				}else if(x == 2){
					if(grid[worldy][worldx + 1].type == 1){
						this.ymove = 0;
						this.xmove = 1;
						this.xtimer = GRIDSIZE;
						this.ytimer = 0;
						return;
					}
				}else if(x == 3){
					if(grid[worldy + 1][worldx].type == 1){
						this.ymove = 1;
						this.xmove = 0;
						this.xtimer = 0;
						this.ytimer = GRIDSIZE;
						return;
					}
				}else if(x == 4){
					if(grid[worldy][worldx - 1].type == 1){
						this.ymove = 0;
						this.xmove = -1;
						this.xtimer = GRIDSIZE;
						this.ytimer = 0;
						return;
					}
				}
			}
		}
		alert("you here");
		this.xmove = 0;
		this.ymove = 0;
	}

	this.draw = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x,this.y,20,20);
	}
}

function init(){
	for(var x = 0; x < 20; x++){
		grid[x] = [];
		for(var y = 0; y < 20; y++){
			grid[x][y] = new block(x,y,Map1[x][y]); 
		}
	}

	monsters[0] = new entity(0);
}

function repaint(){
	requestAnimationFrame(repaint);
	
	for(colom in grid){
		for(cel in grid[colom]){
			selectColor(colom,cel);
			ctx.fillRect(grid[colom][cel].y * GRIDSIZE ,grid[colom][cel].x * GRIDSIZE ,GRIDSIZE,GRIDSIZE);
		}
	}

	for(monster in monsters){
		monsters[monster].move();
		monsters[monster].draw();
	}

	ctx.strokeStyle = "red";
	ctx.strokeRect(Math.floor(mouse.x/GRIDSIZE)*GRIDSIZE,Math.floor(mouse.y/GRIDSIZE)*GRIDSIZE,GRIDSIZE,GRIDSIZE);
}

function selectColor(x,y){
	switch(grid[x][y].type){
		case 0:
			ctx.fillStyle = "green";
			break;
		case 1:
			ctx.fillStyle = "black";
			break;
	}
}


onResize = function(){

}

document.onmousemove = function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}


Map1 = 
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]



init();
repaint();