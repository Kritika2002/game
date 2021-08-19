var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var startFlag = false;
var bombFlag = true;

function start()
{
  var startButton = document.getElementById('start');
  startButton.parentNode.removeChild(startButton);
  startFlag = true;
}

function keyup(event) {
  if (startFlag)
  {
    var player = document.getElementById('player');
    if (event.keyCode == 37) {
      leftPressed = false;
      lastPressed = 'left';
    }
    if (event.keyCode == 39) {
      rightPressed = false;
      lastPressed = 'right';
    }
    if (event.keyCode == 38) {
      upPressed = false;
      lastPressed = 'up';
    }
    if (event.keyCode == 40) {
      downPressed = false;
      lastPressed = 'down';
    }

    player.className = 'character stand ' + lastPressed;
  }
}


function move() {
  if (startFlag) {
    var player = document.getElementById('player');
    var positionLeft = player.offsetLeft;
    var positionTop = player.offsetTop;
    if (downPressed) {
      var newTop = positionTop+1;

      var element = document.elementFromPoint(player.offsetLeft, newTop+32);
      if (element.classList.contains('sky') == false) {
        player.style.top = newTop + 'px';	
      }

      if (leftPressed == false) {
        if (rightPressed == false) {
          player.className = 'character walk down';
        }
      }
    }
    if (upPressed) {
      var newTop = positionTop-1;

      var element = document.elementFromPoint(player.offsetLeft, newTop);
      if (element.classList.contains('sky') == false) {
        player.style.top = newTop + 'px';	
      }
      
      if (leftPressed == false) {
        if (rightPressed == false) {
          player.className = 'character walk up';
        }
      }
    }
    if (leftPressed) {
      var newLeft = positionLeft-1;

      var element = document.elementFromPoint(newLeft, player.offsetTop);
      if (element.classList.contains('sky') == false) {
        player.style.left = newLeft + 'px';	
      }
      player.className = 'character walk left';
    }
    if (rightPressed) {
      var newLeft = positionLeft+1;
      
      var element = document.elementFromPoint(newLeft+32, player.offsetTop);
      if (element.classList.contains('sky') == false) {
        player.style.left = newLeft + 'px';		
      }

      player.className = 'character walk right';
    }

  }
}

function keydown(event) {
  if (startFlag)
  {
    if (event.keyCode == 37) {
      leftPressed = true;
    }
    if (event.keyCode == 39) {
      rightPressed = true;
    }
    if (event.keyCode == 38) {
      upPressed = true;
    }
    if (event.keyCode == 40) {
      downPressed = true;
    }
  }
}


function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	
	document.addEventListener('keyup', keyup);
}

document.addEventListener('DOMContentLoaded', myLoadFunction);

setInterval(function () {
  if (startFlag)
  {
    bomb = document.getElementById('bomb1');
    bomb.style.display = "block";
    if (bombFlag)
    {
      bomb.style.left = Math.floor(Math.random()*(750))+"px";
      bomb.style.top = Math.floor(Math.random()*(150))+"px";
      bombFlag = false;
    }
    else
    {
      if (bomb.offsetTop > 450)
      {
        bomb.style.display = "none";
        bombFlag = true;
      }
      else
      {
        bomb.style.top = (bomb.offsetTop+1)+'px';
      }
    }
  }  
}, 10);
