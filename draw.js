// the draw loop is in here somewhere

// set to false in public release
debug = false;

addEventListener('load', (e) => {
  
  refreshPos();
  
  if (debug) {
    
    const deviceDiv = new Element('div', '', 'User Device', 'deviceDiv', 'calc(50% - 150px)', '40%', '300px', '140px', 'norm text', '');
  deviceDiv.create();
    
    const pcButton = new Element('button', '', 'PC / Other', 'pcButton', '5%', '30px', '90%', '50px', 'norm', function() {
      
      deviceDiv.hide(-1);
      
      system = 'pc';
      
      initializeUI();
      
    });
    pcButton.div = deviceDiv;
    pcButton.create();
    
    const mobileButton = new Element('button', '', 'Mobile', 'mobileButton', '5%', '80px', '90%', '50px', 'norm', function() {
      
      deviceDiv.hide(-1);
      
      system = 'mobile';
      
      initializeUIMobile();
      
    });
    mobileButton.div = deviceDiv;
    mobileButton.create();
    
    deviceDiv.show(-1);
    
  } else {
    
    if (w < 750) {
      
      system = 'mobile';
      
      initializeUIMobile();
      
    } else {
      
      system = 'pc'
      
      initializeUI();
      
    }
    
  }

  if (!localStorage.getItem('selected_theme')) {
      localStorage.setItem('selected_theme', 'coolDark.css');
    }
  
  document.getElementById('theme').setAttribute('href', localStorage.getItem('selected_theme'));
  
});

// dont use this one its slow
function drawHexes(q, outlineWidth, borderMode) {
  
  let size = borderMode != 'norm' ? hexConst.size + 1 : hexConst.size;
  
  let hx = Math.floor(((0 - grid.x) / (hexConst.size * 1.5)) / grid.zoom + 0.25);
  let hy = Math.floor(((0 - grid.y) / (hexConst.apothem * 2)) / grid.zoom);
  
  hx = hx < 0 ? 0 : hx;
  hy = hy < 0 ? 0 : hy;
  
  let endX = hx + Math.floor(w / (hexConst.size * 1.5 * grid.zoom) + 3);
  let endY = hy + Math.floor(h / (hexConst.apothem * 2 * grid.zoom) + 3);
  
  endX = endX > grid.width ? grid.width : endX;
  endY = endY > grid.height ? grid.height : endY;
  
  q.lineWidth = grid.zoom * outlineWidth;
  
  for (let i = hx; i < endX; i++) {
  for (let j = hy; j < endY; j++) {
      
    let ps = grid.hexes[i][j].getPoints(size);
    
    let sx = ps[0][0] * grid.zoom + grid.x;
    let sy = ps[0][1] * grid.zoom + grid.y;
      
      q.beginPath();
      
      q.moveTo(sx, sy);
      
      for (let k = 1; k < ps.length; k++) {
        
        q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
        
      }
      
      if (grid.hexes[i][j].fac != 'none') {
        
        let fillColor = hexToRGB(grid.hexes[i][j].fac.fill);
        
        q.fillStyle = `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${grid.hexOpacity})`;
        q.fill();
        
        if (borderMode == 'border') {
          
          for (let k = 1; k <= 6; k++) {
            
            q.beginPath();
            
            q.moveTo(ps[k - 1][0] * grid.zoom + grid.x, ps[k - 1][1] * grid.zoom + grid.y);
            q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
            
            if (grid.borders[i][j][k - 1] == 1) {
              
              q.strokeStyle = grid.getStrokeColor();
              q.stroke();
              
            }
            
          
          }
          
        } // end of borderMode
        
      }
      
      if (borderMode == 'norm') {
        
        q.strokeStyle = grid.getStrokeColor();
        
        q.stroke();
        
      }
    
    
  } // end of j
  } // end of i
  
  if (hexConst.selected != 'none') {
    drawHighlightHex(q, outlineWidth + 0.5);
  }
  
}

// use this one it is far better
function drawHexesNew(q, outlineWidth, borderMode) {
  
  let hx = Math.floor(((0 - grid.x) / (hexConst.size * 1.5)) / grid.zoom + 0.25);
  let hy = Math.floor(((0 - grid.y) / (hexConst.apothem * 2)) / grid.zoom);
  
  let endX = hx + Math.floor(w / (hexConst.size * 1.5 * grid.zoom) + 3);
  let endY = hy + Math.floor(h / (hexConst.apothem * 2 * grid.zoom) + 3);
  
  for (let i = 0; i < factions.length; i++) {
    
    q.beginPath();
    
    for (let j = 0; j < factions[i].hexes.length; j++) {
      
      let hex = factions[i].hexes[j];
      
      if (hex.x > endX || hex.y > endY || hex.x < hx || hex.y < hy) { continue; }
      
      let ps = hex.getPoints(hexConst.size);
      
      let sx = ps[0][0] * grid.zoom + grid.x;
      let sy = ps[0][1] * grid.zoom + grid.y;
      
      q.moveTo(sx, sy);
      
      for (let k = 1; k < ps.length; k++) {
        
        q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
        
      }
      
    }
    
    let fc = hexToRGB(factions[i].fill);
    
    q.fillStyle = `rgba(${fc.r}, ${fc.g}, ${fc.b}, ${grid.hexOpacity})`;
    q.strokeStyle = grid.getStrokeColor();
    q.lineWidth = grid.zoom * outlineWidth;
    
    q.fill();
    
  }
  
  if (borderMode == 'norm') {
    drawHexBordersAll(q, outlineWidth, hx, hy, endX, endY);
  } else if (borderMode == 'border') {
    drawHexBorders(q, outlineWidth, hx, hy, endX, endY);
  }
  
  if (hexConst.selected != 'none') {
    drawHighlightHex(q, (outlineWidth * 2) + 1);
  }
  
}

function drawHexBordersAll(q, outlineWidth, hx, hy, endX, endY) {

  hx = hx < 0 ? 0 : hx;
  hy = hy < 0 ? 0 : hy;

  endX = endX > grid.width ? grid.width : endX;
  endY = endY > grid.height ? grid.height : endY;
  
  q.strokeStyle = grid.getStrokeColor();
  q.lineWidth = grid.zoom * outlineWidth;
  
  q.beginPath();
  
  for (let x = hx; x < endX; x++) {
    
    for (let y = hy; y < endY; y++) {
      
      let hex = grid.hexes[x][y];
      
      let ps = hex.getPoints(hexConst.size);
      
      let sx = ps[0][0] * grid.zoom + grid.x;
      let sy = ps[0][1] * grid.zoom + grid.y;
      
      q.moveTo(sx, sy);
      
      for (let k = 1; k < ps.length; k++) {
        
        q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
        
      }
      
    }
    
  }
  
  q.stroke();
  
}

function drawHexBorders(q, outlineWidth, hx, hy, endX, endY) {
  
  q.lineWidth = grid.zoom * outlineWidth;
  q.strokeStyle = grid.getStrokeColor();
  
  q.beginPath();
  
  for (let i = 0; i < factions.length; i++) {
    
    for (let j = 0; j < factions[i].hexes.length; j++) {
      
      let hex = factions[i].hexes[j];
      
      if (hex.x > endX || hex.y > endY || hex.x < hx || hex.y < hy) { continue; }
      
      let ps = hex.getPoints(hexConst.size);
      
      for (let k = 1; k <= 6; k++) {
        
        if (grid.borders[hex.x][hex.y][k - 1] == 1) {
          
          q.moveTo(ps[k - 1][0] * grid.zoom + grid.x, ps[k - 1][1] * grid.zoom + grid.y);
          q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
          
        }
        
      }
      
    }
    
    q.stroke();
    
  }
  
}

function drawHighlightHex(q, outlineWidth) {
  
  let ps = hexConst.selected.getPoints(hexConst.size);
  
  let sx = ps[0][0] * grid.zoom + grid.x;
  let sy = ps[0][1] * grid.zoom + grid.y;
  
  q.beginPath();
  
  q.lineWidth = outlineWidth * grid.zoom;
  
  q.moveTo(sx, sy);
  
  for (let k = 1; k < ps.length; k++) {
    
    q.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
    
  }
  
  let facCol = faction.selected != 'none' ? hexToRGB(faction.selected.fill) : grid.getHighlightColor(true);
  
  let fc = colorObjMult(facCol, grid.getHighlightColor(true));
  
  q.strokeStyle = `rgba(${fc.r}, ${fc.g}, ${fc.b}, ${0.9})`;
  
  q.stroke();
  
  /*
  q.fillStyle = `rgba(${facCol.r}, ${facCol.g}, ${facCol.b}, ${0.1})`;
  
  q.fill();
  */
  
}

function inHex(hex, x, y) {
  
  let c = false;
  
  let points = hex.getPoints(hexConst.size);
  let vertx = points.map((p) => { return p[0] * grid.zoom + grid.x });
  let verty = points.map((p) => { return p[1] * grid.zoom + grid.y });
  
  for (let i = 0, j = vertx.length; i < vertx.length; j = i++) {
    if (((verty[i] > y) != (verty[j] > y)) && (x < (vertx[j] - vertx[i]) * (y - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
      c = !c;
    }
  }
  
  return c;
  
}

function getHexAt(x, y) {
  
  // grabs the nearest 9 hexagons to cursor
  let scanHexes = [];
  
  let hx = Math.floor(((x - grid.x) / (hexConst.size * 1.5)) / grid.zoom);
  let hy = Math.floor(((y - grid.y) / (hexConst.apothem * 2)) / grid.zoom);
  
  for (let i = hx - 1; i <= hx + 1; i++) {
    
    for (let j = hy - 1; j <= hy + 1; j++) {
      
      if (i < grid.width && i > -1 && j < grid.height && j > -1) {
        scanHexes.push(grid.hexes[i][j]);
      }
      
    }
    
  }

  // checks which one the cursor is actually in
  for (let i = 0; i < scanHexes.length; i++) {
    
    // displays scanned hexes
    /*
    if (scanHexes[i] != undefined) {
      let outlineWidth = 2;
    let ps = scanHexes[i].getPoints(hexConst.size);
  
  let sx = ps[0][0] * grid.zoom + grid.x;
  let sy = ps[0][1] * grid.zoom + grid.y;
  
  ctx0.beginPath();
  
  ctx0.lineWidth = outlineWidth * grid.zoom;
  
  ctx0.moveTo(sx, sy);
  
  for (let k = 1; k < ps.length; k++) {
    
    ctx0.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
    
  }
  
  ctx0.strokeStyle = inHex(scanHexes[i], x, y) ? `rgba(255, 0, 0, 1)` : `rgba(0, 255, 0, 1)`;
  
  ctx0.stroke();
    }
    */
    
    if (scanHexes[i] != undefined && inHex(scanHexes[i], x, y)) {
      
      hexConst.selected = scanHexes[i];
      
      break;
      
    } else {
      
      hexConst.selected = 'none';
      
    }
    
  }
  
}

function fillHexes(sx, sy) {
  
  let anchorHexes = [grid.hexes[sx][sy]];
  let openHexes = [];
  let filledHexes = [];
  let currentFac = hexConst.selected.fac;
  
  do {
    
    for (let i = 0; i < anchorHexes.length; i++) {
      
      let testHexes = anchorHexes[i].getSurroundingHexes();
      
      for (let j = 0; j < testHexes.length; j++) {
        if (testHexes[j] != undefined && testHexes[j].fac == currentFac) {
          
          let undoHex = Object.assign({}, grid.hexes[testHexes[j].x][testHexes[j].y]);
          
          currentMove.push(undoHex);
          
          openHexes.push(testHexes[j]);
          filledHexes.push(testHexes[j]);
          
          testHexes[j].setFac(faction.selected);
          
          // old method
          /*
          testHexes[j].fac.hexCount--;
          grid.hexes[testHexes[j].x][testHexes[j].y].fac = faction.selected;
          faction.selected.hexCount++;
          
          grid.updateBorders(testHexes[j].x, testHexes[j].y);
          */
          
        }
      }
      
    }
    
    anchorHexes.splice(0, anchorHexes.length);
    anchorHexes = openHexes;
    
  } while (anchorHexes.length > 0);
  
  
  
}

function toolCheck() {
  
  switch (tool.selected) {
    case 'Pen':
      
      if (hexConst.selected != 'none' && faction.selected != 'none' && hexConst.selected.fac != faction.selected) {
        
        let hex = Object.assign({}, grid.hexes[hexConst.selected.x][hexConst.selected.y]);
        
        currentMove.push(hex);
        redoMoves.splice(0, redoMoves.length);
        setUndoGrays();
        
        hexConst.selected.setFac(faction.selected);
        
        // old method
        /*
        if (hexConst.selected.fac != 'none') { hexConst.selected.fac.hexCount--; }
        
        grid.hexes[hexConst.selected.x][hexConst.selected.y].fac = faction.selected;
        
        grid.updateBorders(hexConst.selected.x, hexConst.selected.y);
        
        faction.selected.hexCount++;
        */
        
      }
      
      break;
    case 'Erase':
      
      if (hexConst.selected != 'none' && hexConst.selected.fac != 'none') {
        
        let hex = Object.assign({}, grid.hexes[hexConst.selected.x][hexConst.selected.y]);
        
        currentMove.push(hex);
        redoMoves.splice(0, redoMoves.length);
        setUndoGrays();
        
        hexConst.selected.setFac('none');
        
        // old method
        /*
        grid.hexes[hexConst.selected.x][hexConst.selected.y].fac.hexCount--;
        grid.hexes[hexConst.selected.x][hexConst.selected.y].fac = 'none';
        
        grid.updateBorders(hexConst.selected.x, hexConst.selected.y);
        */
        
      }
      
      break;
    case 'Fill':
      
      if (hexConst.selected != 'none' && mouse.clicked == false && faction.selected != 'none' && faction.selected != hexConst.selected.fac) {
        
        fillHexes(hexConst.selected.x, hexConst.selected.y);
        redoMoves.splice(0, redoMoves.length);
        setUndoGrays();
        
        hexConst.selected.setFac(faction.selected);
        
        // old method
        /*
        grid.hexes[hexConst.selected.x][hexConst.selected.y].fac = faction.selected;
        
        grid.updateBorders(hexConst.selected.x, hexConst.selected.y);
        */
        
        mouse.clicked = true;
        
      }
      
      break;
    case 'Move':
      // testing
      
      break;
  }
  
}


function handleMoveStick(q) {
  
  let rectb = document.getElementById('mapDiv').getBoundingClientRect();
  
  let sx = rectb.right / w;
  let sy = rectb.bottom / h;
  
  let cx = w - (80 * sx);
  let cy = h - (130 * sy);
  
  let stickX = cx;
  let stickY = cy;
  
  q.beginPath();
  
  q.strokeStyle = `rgba(220, 220, 220, 1)`;
  q.fillStyle = `rgba(40, 40, 60, 1)`;
  q.lineWidth = 1;
  
  q.arc(cx, cy, (65 * sx), 0, Math.PI * 2);
  
  q.fill();
  q.stroke();
  
  if (getDis(mouse.x, mouse.y, cx, cy) < 66) {
    
    if (mouse.lClick) {
      
      mouse.inMoveStick = true;
      
      stickX = mouse.x;
      stickY = mouse.y;
      
    }
    
  }
  
  if (mouse.inMoveStick) {
    
    hexConst.selected = 'none';
    
    if (getDis(mouse.x, mouse.y, cx, cy) >= 66) {
      
      let stickAng = getAng(mouse.x, mouse.y, cx, cy);
      
      stickX = cx + 66 * Math.cos(stickAng);
      stickY = cy + 66 * Math.sin(stickAng);
      
    }
    
  }
  
  q.beginPath();
  
  q.strokeStyle = `rgba(70, 70, 90, 1)`;
  q.fillStyle = `rgba(200, 200, 200, 1)`;
  q.lineWidth = 1;
  
  q.arc(stickX, stickY, (25 * sx), 0, Math.PI * 2);
  
  q.fill();
  q.stroke();
  
  grid.x += (cx - stickX) / 5;
  grid.y += (cy - stickY) / 5;
  
}


let frameCount = 0, timeFrame = 0, fps = 0;

let outlineThickness = 2;

function draw() {
  
  ctx0.clearRect(0, 0, w, h);
  
  let startTime = performance.now();

  setScale();
  
  if (grid != null) {
    
    // handle smooth zooming
    grid.smoothZoom();
    
    if (backgroundImage.img != 'none') {
      
      ctx0.drawImage(backgroundImage.img, grid.x, grid.y, backgroundImage.width * grid.zoom * backgroundImage.scaleX, backgroundImage.height * grid.zoom * backgroundImage.scaleY);
      
      let width = parseInt(document.getElementById('mapImageSizeX').value);
      let height = parseInt(document.getElementById('mapImageSizeY').value);
      
      let depth = grid.width > grid.height ? (grid.width - 1) * hexConst.size * 1.5 : (grid.height - 1) * hexConst.apothem * 2;
      
      let realSize = width > height ? width / depth : height / depth;
      
      //ctx0.drawImage(backgroundImage.img, 0, 0, backgroundImage.width * realSize * backgroundImage.scaleX, backgroundImage.height * realSize * backgroundImage.scaleY);
      
    }
    
    getHexAt(mouse.x, mouse.y);
    
    drawHexesNew(ctx0, outlineThickness, outline);
    
    if (system == 'mobile') {
      handleMoveStick(ctx0);
    }
    
    // check for tool usage
    if (mouse.inCanvas()) {
      
      if (key.w) { grid.y += 10; }
      if (key.a) { grid.x += 10; }
      if (key.s) { grid.y -= 10; }
      if (key.d) { grid.x -= 10; }
      
      if (mouse.lClick) { toolCheck(); }

      //if (key.q) { outlineThickness -= 0.25; }
      //if (key.e) { outlineThickness += 0.25; }
      
    }
    
  }
  
  idleCounter--;
  
  if (!mouse.lClick) {
    prevTouchX = mouse.x;
    prevTouchY = mouse.y;
  }
  
  frameCount++;
  
  ///*
  if (debug) {
    
    let endTime = performance.now();
    timeFrame += (endTime - startTime);
    
    if (frameCount % 10 == 0) {
      fps = Math.round((frameCount / (timeFrame / 1000)) * 100) / 100;
      frameCount = 0;
      timeFrame = 0;
    }
    
    ctx0.beginPath();
    
    ctx0.fillStyle = `rgba(255, 255, 255, 1)`;
    ctx0.font = `16px Verdana`;
    ctx0.fillText(`selected: ${hexConst.selected.x}, ${hexConst.selected.y}`, 20, 50);
    ctx0.fillText(`mouse: ${Math.round(mouse.x)}, ${Math.round(mouse.y)}, ${mouse.lClick}, ${mouse.inMoveStick}`, 20, 90);
    //ctx0.fillText(`img: ${backgroundImage.img}, ${backgroundImage.img.src}`, 20, 110);
    
    ctx0.fillText(`fps: ${fps}`, 20, 70);
    
  }
  //*/
  
  requestAnimationFrame(draw);
}

draw();
