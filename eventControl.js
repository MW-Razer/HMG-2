// button / mouse events

const div = document.getElementById('canvasDiv');

const mouse = {
  x: 9e99,
  y: 9e99,
  vx: 0,
  vy: 0,
  lClick: false,
  clicked: false,
  event: '',
  inCanvas: function() {
    
    if (mouse.event.target.nodeName == 'CANVAS' || mouse.event.target.id == 'mapDiv') {
      return true;
    } else {
      return false;
    }
    
  },
  inCanvasBorder: function() {
    
    if (mouse.x > 0 && mouse.y > 0 && mouse.x < w && mouse.y < h) {
      return true;
    } else {
      return false;
    }
    
  },
  inMoveStick: false
};

function detectLeftClick(evt) {
  evt = evt || window.event;
  
  if ("buttons" in evt) {
    return evt.buttons == 1;
  }
  
  let button = evt.which || evt.button;
  
  return button == 1;
}

document.addEventListener('mousedown', function(e) {
  
  mouse.event = e;
  
  mouse.lClick = detectLeftClick(e);
  
  
});

document.addEventListener('mouseup', function(e) {
  
  mouse.event = e;
  
  mouse.lClick = false;
  
  mouse.clicked = false;
  
  if (currentMove.length > 0) {
    
    undoMoves.push(currentMove);
    currentMove = [];
    
    document.getElementById('undoButton').classList.remove('gray');
    
  }
  
  mouse.inMoveStick = false;
  
});

let idleCounter = 0;
document.addEventListener('mousemove', function(e) {
  
  mouse.event = e;
  
  let rect = canvas0.getBoundingClientRect();
	mouse.x = (e.clientX - rect.left) * scaleX;
  mouse.y = (e.clientY - rect.top) * scaleY;
  mouse.vx = e.movementX * scaleX;
  mouse.vy = e.movementY * scaleY;
  idleCounter = 2;
  
  if (tool.selected == 'Move' && mouse.lClick && grid != null && mouse.inCanvas()) {
    
    grid.x += mouse.vx;
    grid.y += mouse.vy;
    
    if (grid.x + (hexConst.size * 1.5 * (grid.width - 1)) * grid.zoom - 10 < 0) {
      grid.x = -((hexConst.size * 1.5 * (grid.width - 1)) * grid.zoom - 10);
    } else if (grid.x + 10 > w) {
      grid.x = w - 10;
    }
    
    if (grid.y + (hexConst.apothem * 2 * (grid.height - 1)) * grid.zoom - 60 < 0) {
      grid.y = -((hexConst.apothem * 2 * (grid.height - 1)) * grid.zoom - 60);
    } else if (grid.y + 60 > h) {
      grid.y = h - 60;
    }
    
  }
  
});

document.addEventListener('wheel', function(e) {
  
  if (grid != null && mouse.inCanvas()) {
    
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      
      grid.zoomTo -= e.deltaY / 250;
      
    } else {
      
      grid.zoomTo -= e.deltaX / 250;
      
    }
    
  }
  
  document.getElementById('zoomSlider').value = grid.zoomTo;
  
});

const activeTouchFunc = function(e) {
  
  mouse.event = e;
  
  let rect = canvas0.getBoundingClientRect();
  
  let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
  let touches = evt.touches || evt.changedTouches;
  let touch = touches[0];
  
  let setVel = (mouse.x == prevTouchX && mouse.y == prevTouchY) ? false : true;
  
  let prevMouseX = mouse.x, prevMouseY = mouse.y;
  
  mouse.x = (touch.pageX - rect.left) * scaleX;
  mouse.y = (touch.pageY - rect.top) * scaleY;
  
  /*
  if (!mouse.inCanvas()) {
    mouse.x = prevMouseX;
    mouse.y = prevMouseY;
  }
  */
  
  if (setVel) {
    mouse.vx = mouse.x - ((prevTouchX - rect.left) * scaleX);
    mouse.vy = mouse.y - ((prevTouchY - rect.top) * scaleY);
  }
  
  idleCounter = 2;
  
  prevTouchX = touch.pageX;
  prevTouchY = touch.pageY;

  mouse.lClick = true;
  
  if (tool.selected == 'Move' && mouse.lClick && grid != null && mouse.inCanvas()) {
    
    grid.x += mouse.vx;
    grid.y += mouse.vy;
    
    if (grid.x + (hexConst.size * 1.5 * (grid.width - 1)) * grid.zoom - 10 < 0) {
      grid.x = -((hexConst.size * 1.5 * (grid.width - 1)) * grid.zoom - 10);
    } else if (grid.x + 10 > w) {
      grid.x = w - 10;
    }
    
    if (grid.y + (hexConst.apothem * 2 * (grid.height - 1)) * grid.zoom - 60 < 0) {
      grid.y = -((hexConst.apothem * 2 * (grid.height - 1)) * grid.zoom - 60);
    } else if (grid.y + 60 > h) {
      grid.y = h - 60;
    }
    
  }
  
}

let prevTouchX = mouse.x, prevTouchY = mouse.y;

document.addEventListener('touchstart', activeTouchFunc);

document.addEventListener('touchmove', activeTouchFunc);

document.addEventListener('touchend', function(e) {
  
  prevTouchX = mouse.x;
  prevTouchY = mouse.y;
  
  mouse.vx = 0;
  mouse.vy = 0;
  
  mouse.lClick = false;
  mouse.clicked = false;
  mouse.inMoveStick = false;
  
});


const key = {
  p: false,
  e: false,
  f: false,
  m: false,
  shift: false,
  enter: false,
  escape: false,
  control: false,
  z: false,
  r: false,
  w: false,
  a: false,
  s: false,
  d: false,
  q: false
};

function changeTool(changeTo) {
  
  if (tool.selected != changeTo) {
      tool.previous = tool.selected;
    }
  
  tool.selected = changeTo;
  
  document.getElementById('penSelect').classList.replace('selected', 'norm');
  document.getElementById('eraseSelect').classList.replace('selected', 'norm');
  document.getElementById('fillSelect').classList.replace('selected', 'norm');
  
  if (system == 'pc') {
    document.getElementById('moveSelect').classList.replace('selected', 'norm');
  }
  
  document.getElementById(`${tool.selected.toLowerCase()}Select`).classList.replace('norm', 'selected');
  
  if (system == 'pc') {
    document.getElementById('toolBar').innerHTML = (`Tools > ${tool.selected}`);
  }
  
}

function flipMoveFunc() {
  
  if (tool.selected == 'Move') {
    
    tool.selected = tool.previous;
    tool.previous = 'Move';
    
    document.getElementById('penSelect').classList.replace('selected', 'norm');
    document.getElementById('eraseSelect').classList.replace('selected', 'norm');
    document.getElementById('fillSelect').classList.replace('selected', 'norm');
    document.getElementById('moveSelect').classList.replace('selected', 'norm');
    document.getElementById(`${tool.selected.toLowerCase()}Select`).classList.replace('norm', 'selected');
      
  } else {
    
    tool.previous = tool.selected;
    tool.selected = 'Move';
    
    document.getElementById('penSelect').classList.replace('selected', 'norm');
    document.getElementById('eraseSelect').classList.replace('selected', 'norm');
    document.getElementById('fillSelect').classList.replace('selected', 'norm');
    
    document.getElementById('moveSelect').classList.replace('norm', 'selected');
    
  }
  
  document.getElementById('toolBar').innerHTML = `Tools > ${tool.selected}`;
  
}

document.addEventListener('keydown', function(e) {
  
  if (key[e.key.toLowerCase()] != undefined) {
    key[e.key.toLowerCase()] = true;
  }
  
  if (mouse.inCanvas()) {
    
    if (system == 'pc') {
      
      switch (e.key.toLowerCase()) {
        case 'p':
          changeTool('Pen');
          break;
        case 'e':
          changeTool('Erase');
          break;
        case 'f':
          changeTool('Fill');
          break;
        case 'm':
          changeTool('Move');
          break;
        case ' ':
          e.preventDefault();
          flipMoveFunc();
          break;
        case 'escape':
          e.preventDefault();
          document.getElementById('mapSettings').click();
          break;
      }
      
    }
    
  }
  
  if (key.control) {
    
    if (key.z) { e.preventDefault(); document.getElementById('undoButton').click(); }
    
    if (key.r) { e.preventDefault(); document.getElementById('redoButton').click(); }
    
  }
  
});

document.addEventListener('keyup', function(e) {
  
  if (key[e.key.toLowerCase()] != undefined) {
    key[e.key.toLowerCase()] = false;
  }
  
});



let scaleX, scaleY;
function setScale() {

  let rect = canvas0.getBoundingClientRect();
  
  scaleX = w / rect.width,
  scaleY = h / rect.height;

}

