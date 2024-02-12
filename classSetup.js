// setup classes and objects for the gen and stuff

let debug = true;

let system = 'none';
let theme = 'coolDark';
let outline = 'norm';

let currentMove = [];
let undoMoves = [];
let redoMoves = [];

let backgroundImage = {
  img: 'none',
  scaleX: 1,
  scaleY: 1,
  width: 0,
  height: 0
};

// useful functions
function download(filename, text) {
  let elem = document.createElement('a');
  
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  elem.setAttribute('download', filename);

  elem.style.display = 'none';
  document.body.appendChild(elem);

  elem.click();

  document.body.removeChild(elem);
  
}

function rad(a) {
  return a * (Math.PI / 180);
}

function rand(min, max) {
  return (Math.random() * (max - min) + min);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function whitelistChars(whitelist, str) {
  let regex = new RegExp(`[^${whitelist}]`, 'g');
  return str.replace(regex, '');
}

function padZeros(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertHexColor(hex, mono) {
  
  if (hex[0] == '#') {
    hex = hex.substring(1, 7);
  }
  
  let r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16);
  let g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16);
  let b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16);
  
  if (mono) {
    // turn to black or white depending on color clarity
    
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000':'#ffffff';
    
  }
  
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  
  return `#${padZeros(r)}${padZeros(g)}${padZeros(b)}`;
  
}

function hexToRGB(hex) {
  
  if (hex[0] == '#') {
    hex = hex.substring(1, 7);
  }
  
  let r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16);
  let g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16);
  let b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16);
  
  return {r: r, g: g, b: b};
  
}

function compToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + compToHex(r) + compToHex(g) + compToHex(b);
}

function rgbStrToHex(str) {
  
  let r = parseInt(str.split('(')[1].split(',')[0].trim());
  let g = parseInt(str.split(',')[1].trim());
  let b = parseInt(str.split(',')[2].trim());
  
  return rgbToHex(r, g, b);
  
}

function shiftIntInRange(num, start, end, shift) {
  
  let result = num;
  
  for (let i = 0; i < shift; i++) {
    
    result += 1;
    
    if (result > end) {
      result = start;
    }
    
  }
  
  return result;
  
}

function transformNumInRange(num, start, end, newStart, newEnd, linear) {
  
  let lin = linear || false;
  
  let startRange = end - start;
  let newRange = newEnd - newStart;
  
  let mult;
  
  if (lin) {
    mult = newRange / startRange;
  } else {
    mult = newRange / (startRange ** 2);
  }
  
  return num * mult;
  
}

function colorObjMult(t, b) {
  
  let nr = (t.r * b.r) / 255;
  let ng = (t.g * b.g) / 255;
  let nb = (t.b * b.b) / 255;
  
  return {r: nr, g: ng, b: nb};
  
}

function setUndoGrays() {
  
  if (redoMoves.length == 0) {
    document.getElementById(`redoButton`).classList.add('gray');
  } else {
    document.getElementById(`redoButton`).classList.remove('gray');
  }
  
  if (undoMoves.length == 0) {
    document.getElementById(`undoButton`).classList.add('gray');
  } else {
    document.getElementById(`undoButton`).classList.remove('gray');
  }
  
}

function undo() {
  
  let redoArr = [];
  
  let fac, addFac = false;
  
  for (let i = 0; i < undoMoves[undoMoves.length - 1].length; i++) {
    
    if (undoMoves[undoMoves.length - 1][i].hasOwnProperty('fac')) {
      
      let hex = undoMoves[undoMoves.length - 1][i];
      
      redoArr.push(Object.assign({}, grid.hexes[hex.x][hex.y]));
      
      grid.hexes[hex.x][hex.y].setFac(hex.fac);
      
      // old method
      /*
      grid.hexes[hex.x][hex.y].fac.hexCount--;
      hex.fac.hexCount++;
      
      grid.hexes[hex.x][hex.y].fac = hex.fac;
      grid.updateBorders(hex.x, hex.y);
      */
      
    } else {
      
      fac = undoMoves[undoMoves.length - 1][i];
      addFac = true;
      
      //redoArr.push(fac);
      
      fac.create();
      
      if (document.getElementById('mapFactionsDiv').style.visibility == 'visible') {
        
        document.getElementById(`factionButton${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionButtonColorText${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionHex1${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionButtonNameText${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionButtonOptionsDiv${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionButtonEdit${fac.id}`).style.visibility = 'visible';
        document.getElementById(`factionButtonDelete${fac.id}`).style.visibility = 'visible';
        
      }
      
    }
    
  }
  
  if (addFac) {
    redoArr.push(fac);
  }
  
  undoMoves.length--;
  redoMoves.push(redoArr);
  
  setUndoGrays();
  
}

function redo() {
  
  let undoArr = [];
  
  let fac, delFac = false;
  
  for (let i = 0; i < redoMoves[redoMoves.length - 1].length; i++) {
    
    if (redoMoves[redoMoves.length - 1][i].hasOwnProperty('fac')) {
      
      let hex = redoMoves[redoMoves.length - 1][i];
      
      undoArr.push(Object.assign({}, grid.hexes[hex.x][hex.y]));
      
      grid.hexes[hex.x][hex.y].setFac(hex.fac);
      
      // old method
      /*
      grid.hexes[hex.x][hex.y].fac.hexCount--;
      hex.fac.hexCount++;
      
      grid.hexes[hex.x][hex.y].fac = hex.fac;
      grid.updateBorders(hex.x, hex.y);
      */
      
    } else {
      
      fac = redoMoves[redoMoves.length - 1][i];
      delFac = true;
      
    }
    
  }
  
  if (delFac) {
    
    undoArr.push(fac);
    
    fac.delete(false);
    
    document.getElementById(`factionButtonEdit${fac.id}`).remove();
    document.getElementById(`factionButtonDelete${fac.id}`).remove();
    document.getElementById(`factionButtonOptionsDiv${fac.id}`).remove();
    document.getElementById(`factionButtonNameText${fac.id}`).remove();
    document.getElementById(`factionButtonColorText${fac.id}`).remove();
    document.getElementById(`factionHex1${fac.id}`).remove();
    document.getElementById(`factionButton${fac.id}`).remove();
    
  }
  
  if (redoMoves.length > 0) {
    redoMoves.length--;
  }
  
  undoMoves.push(undoArr);
  
  setUndoGrays();
  
}

function refreshMonoImages() {
  
  let imgs = document.getElementsByClassName('mono');
  
  for (let i = 0; i < imgs.length; i++) {
    
    let p = imgs[i].parentElement;
    let inner = imgs[i].parentElement.innerHTML;
    
    p.innerHTML = '';
    
    p.innerHTML = `${inner}`;
    
  }
  
}

function firstMissingInt(nums) {
  
  function swap(i, j) {
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
  }
  
  for (let i = 0; i < nums.length; i++) {
    
    while (0 < nums[i] && nums[i] - 1 < nums.length && nums[i] != i + 1 && nums[i] != nums[nums[i] - 1]) {
      
      swap(i, nums[i] - 1);
      
    }
    
  }
  
  for (let i = 0; i < nums.length; i++) {
    
    if (nums[i] != i + 1) { return i + 1; }
    
  }
  
  return nums.length + 1;
  
}

function getAng(x1, y1, x2, y2) {
  
  let disx = x1 - x2;
  let disy = y1 - y2;
  
  return Math.atan2(disy, disx);
  
}

function getDis(x1, y1, x2, y2) {
  
  return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
  
}

const tool = {
  selected: 'Pen',
  previous: 'Pen',
  prevMoves: []
};

const faction = {
  selected: 'none',
  previous: 'none'
};

const hexConst = {
  size: 25,
  apothem: 21.65,
  realApothem: 21.650635094610966,
  count: 0,
  selected: 'none'
};

let factions = [];

class Faction {
  constructor(fill, stroke, name, abb) {
    this.fill = fill;
    this.stroke = stroke;
    this.hexCount = 0;
    this.id = -1;
    this.name = name;
    this.abb = abb;
    this.hexes = [];
  }
  
  create(takenIds) {
    
    takenIds = takenIds || factions.map((f) => { return f.id });
    
    let newId = firstMissingInt(takenIds);
    
    this.id = this.id == -1 ? newId : this.id;
    
    let newFac = this;

    let facDiv = document.getElementById('mapFactionsDiv');
    
    factions.push(newFac);
    
    let fc = document.getElementsByClassName('norm fac').length + 1 + document.getElementsByClassName('selected fac').length;
    
    let editDiv = document.getElementById(`mapFactionsEditDiv`);
    let editName = document.getElementById(`mapFactionsEditName`);
    let editAbb = document.getElementById(`mapFactionsEditAbb`);
    let editColorCode = document.getElementById(`mapFactionsEditColorCode`);
    let editColor = document.getElementById(`mapFactionsEditColor`);
    let editGo = document.getElementById(`mapFactionsEditGo`);
    let editCancel = document.getElementById(`mapFactionsEditBack`);
    
    // create a button for the faction
    let facButton = new Element('button', '', `${newFac.abb}`, `factionButton${newFac.id}`, `5%`, `${-70 + (110 * fc)}px`, `90%`, `100px`, 'norm fac', function() {
      
      faction.selected = newFac;
      
      document.getElementById('mapFactions').innerHTML = `<span class="hex1" style="color: #${newFac.fill}; left: 5px; top: -11px;"></span>&nbsp;${newFac.abb}`;

      let facButtons = document.getElementsByClassName('noselect selected fac');
        
      let thisFacButton = document.getElementById(`factionButton${newFac.id}`);

      if (thisFacButton != null) {
        
        for (let i = 0; i < facButtons.length; i++) {
          facButtons[i].setAttribute('class', 'noselect norm fac');
        }
        
        thisFacButton.setAttribute('class', 'noselect selected fac');
        
      }
      
    });
    facButton.div = facDiv;
    facButton.create();

    // place text within button (faction name)
    let facNameText = new Element('p', '', `${newFac.name}`, `factionButtonNameText${newFac.id}`, `calc(5% + 5px)`, `${-20 + (110 * fc)}px`, `calc(90% - 115px)`, `30px`, 'light facbutton', '');
    facNameText.div = facDiv;
    facNameText.create();
    document.getElementById(facNameText.id).style.pointerEvents = 'none';
    facNameText.setCursor('pointer');
    
    let facHex1 = new Element('span', '', '', `factionHex1${newFac.id}`, `35px`, `35px`, `35px`, `35px`, 'hex1 fac', '');
    facHex1.div = facDiv;
    facHex1.create();
    document.getElementById(facHex1.id).setAttribute('style', `color: #${newFac.fill}; left: calc(95% - 110px); top: ${-20 + (110 * fc)}px;`);
    
    let facColorText = new Element('p', '', `#${newFac.fill}`, `factionButtonColorText${newFac.id}`, `calc(95% - 80px)`, `${-20 + (110 * fc)}px`, `80px`, `30px`, 'light facbutton', '');
    facColorText.div = facDiv;
    facColorText.create();
    document.getElementById(facColorText.id).style.pointerEvents = 'none';
    
    facColorText.setCursor('pointer');

    // div to hold delete and edit button
    let facOptionsDiv = new Element('div', '', '', `factionButtonOptionsDiv${newFac.id}`, '50%', `${-70 + (110 * fc)}px`, '45%', '50px', 'norm facbutton', '');
    facOptionsDiv.div = facDiv;
    facOptionsDiv.create();
    
    // move the bottom separator
    document.getElementById('mapFactionsBottomText').style.top = `${40 + (110 * fc)}px`;
    
    // faction delete button
    let facDeleteButton = new Element('button', '', `Delete`, `factionButtonDelete${newFac.id}`, `0px`, `0px`, `50%`, `100%`, 'norm', function() {
      
      redoMoves.splice(0, redoMoves.length);
      setUndoGrays();
      
      newFac.delete();

      let deletedButton = document.getElementById(facButton.id);
      let dOptionsDiv = document.getElementById(facOptionsDiv.id);
      let dNameText = document.getElementById(facNameText.id);
      let dColorText = document.getElementById(facColorText.id);

      let otherFacs = document.getElementsByClassName('fac');
      let otherFacButtons = document.getElementsByClassName('facbutton');

      let y = parseFloat(deletedButton.style.top.split('px')[0]);
      
      for (let i = 0; i < otherFacs.length; i++) {

        let oy = parseFloat(otherFacs[i].style.top.split('px')[0]);
        
        if (oy > y) {
          otherFacs[i].style.top = `${oy - 110}px`;
        }
        
      }
      
      for (let i = 0; i < otherFacButtons.length; i++) {
        
        let oy = parseFloat(otherFacButtons[i].style.top.split('px')[0]);
        
        if (oy > y) {
          otherFacButtons[i].style.top = `${oy - 110}px`;
        }
        
      }
      
      deletedButton.remove();
      dOptionsDiv.remove();
      dNameText.remove();
      dColorText.remove();
      document.getElementById(facHex1.id).remove();
      
    });
    facDeleteButton.div = facOptionsDiv;
    facDeleteButton.create();

    // faction edit button
    let facEditButton = new Element('button', '', `Edit`, `factionButtonEdit${newFac.id}`, `50%`, `0px`, `50%`, `100%`, 'norm', function() {
      
      editDiv.value = newFac.id;
      
      editName.value = newFac.name;
      editAbb.value = newFac.abb;
      editColorCode.value = newFac.fill;
      editColor.value = `#${newFac.fill}`;
      
      let v = 'visible';
      let c = 'selected';
      
      if (document.getElementById(facEditButton.id).className == 'selected') {
        v = 'hidden';
        c = 'norm';
      }
      
      editDiv.style.visibility = v;
      editName.style.visibility = v;
      editAbb.style.visibility = v;
      editColorCode.style.visibility = v;
      editColor.style.visibility = v;
      editGo.style.visibility = v;
      if (editCancel != null) {
        editCancel.style.visibility = v;
      }
      
      document.getElementById(`mapFactionsEditNameLabel`).style.visibility = v;
      document.getElementById(`mapFactionsEditAbbLabel`).style.visibility = v;
      document.getElementById(`mapFactionsEditColorCodeLabel`).style.visibility = v;
      document.getElementById(`mapFactionsEditColorLabel`).style.visibility = v;
      
      let es = document.getElementsByName('facEditButton');
      
      for (let i = 0; i < es.length; i++) {
        
        if (es[i].id == facEditButton.id) {
          es[i].setAttribute('class', c);
        } else {
          es[i].setAttribute('class', 'norm');
        }
        
      }
      
    });
    facEditButton.div = facOptionsDiv;
    facEditButton.create();
    document.getElementById(facEditButton.id).setAttribute('name', 'facEditButton');
    
  }

  delete(undo) {
    
    if (undo == undefined) {
      undo = true;
    }
    
    if (faction.selected == this) {
      faction.selected = 'none';
      document.getElementById('mapFactions').innerHTML = `<span class="hex1" style="color: #ffffff; left: 5px; top: -11px;"></span>&nbsp;Factions`;
    }
    
    if (undo) {
      
      let undoArr = [this];
      
      for (let i = 0; i < this.hexes.length; i++) {
        
        undoArr.push(Object.assign({}, grid.hexes[this.hexes[i].x][this.hexes[i].y]));
        grid.hexes[this.hexes[i].x][this.hexes[i].y].setFac('none');
        
      }
      
      undoMoves.push(undoArr);
      
      document.getElementById('undoButton').classList.remove('gray');
      
    }
    
    let fc = document.getElementsByClassName('norm fac').length + document.getElementsByClassName('selected fac').length - 1;
    
    for (let i = 0; i < factions.length; i++) {
      if (factions[i].id == this.id) {
        factions.splice(i, 1);
        break;
      }
    }
    
    document.getElementById('mapFactionsBottomText').style.top = `${70 + (110 * fc)}px`;

    if (factions.length < 1) {
      
      faction.selected = 'none';
      
    }
    
  }
  
  refresh() {
    
    document.getElementById(`factionButton${this.id}`).innerHTML = `${this.abb}`;
    
    document.getElementById(`factionButtonNameText${this.id}`).innerText = `${this.name}`;
    
    document.getElementById(`factionButtonColorText${this.id}`).innerText = `#${this.fill}`;
    
    document.getElementById(`factionHex1${this.id}`).style.color = `#${this.fill}`;
    
  }
  
  correctHexIds(id, count) {
    
    for (let i = id; i < this.hexes.length; i++) {
      
      this.hexes[i].id -= count;
      
    }
    
  }
  
}


function loadMap(map) {
  // get factions from save file, slap em on the map
  
  clearFactions();
  
  let g = new Grid(50, 50, 1, map.width, map.height);
  g.name = map.name;
  g.hexOpacity = map.hexOpacity;
  g.stroke = map.stroke;
  
  // set factions
  initializeFactions(map.factions);
  
  // set hexes
  g.fill('none');
  
  g.setBorders();
  
  g.load();
  
  for (let x = 0; x < g.width; x++) {
    for (let y = 0; y < g.height; y++) {
      
      if (map.hexes[x][y] != null) {
        g.hexes[x][y].setFac(getFacById(map.hexes[x][y]));
      }
      
    }
  }
  
  hexConst.count = grid.width * grid.height;
  
  document.getElementById(`mapSettingsDownloadName`).value = map.name;
  document.getElementById(`mapSettingsOutlineOpacity`).value = map.stroke.a * 100;
  document.getElementById(`mapSettingsFillOpacity`).value = map.hexOpacity;
  document.getElementById(`mapSettingsOutlineOpacityLabel`).innerHTML = `Outline Opacity: ${map.stroke.a * 100}%&nbsp;`;
  document.getElementById(`mapSettingsFillOpacityLabel`).innerHTML = `Fill Opacity: ${map.hexOpacity * 100}%&nbsp;`;
  
  console.log(map.stroke);
  
  let im = new Image();
  //console.log(map);
  
  im.src = map.imageData;
  document.getElementById('mapSettingsImage').value = map.imageData;
    
    im.onload = function() {
      
      backgroundImage.img = im;
      backgroundImage.width = im.width;
      backgroundImage.height = im.height;
      
      backgroundImage.scaleX = map.image.scaleX;
      backgroundImage.scaleY = map.image.scaleY;
      
      document.getElementById('mapSettingsImageScaleX').value = (backgroundImage.scaleX);
      document.getElementById('mapSettingsImageScaleY').value = (backgroundImage.scaleY);
      
    }
  
}

function getFacById(id) {
  
  for (let i = 0; i < factions.length; i++) {
    if (factions[i].id == id) { return factions[i]; }
  }
  
}

let cleared = true;
function clearFactions() {
  
  let bottomText = document.getElementById(`mapFactionsBottomText`);
  bottomText.style.top = `${30}px`;
  
  let facDiv = document.getElementById('mapFactionsDiv');
  
  if (system == 'pc') {
    facDiv.innerHTML = `Faction List`;
  } else {
    facDiv.innerHTML = ``;
  }
  
  facDiv.append(bottomText);
  
  for (let i = 0; i < facDiv.children.length; i++) {
    if (facDiv.children[i] && facDiv.children[i].nodeName == 'BUTTON') {
      facDiv.children[i].remove();
    }
  }
  
  factions.splice(0, factions.length);
  
  cleared = true;
  
}

function initializeFactions(facArr) {
  
  facArr = facArr || [];
  
  for (let i = 0; i < facArr.length; i++) {
    
    let f = facArr[i];
    
    let nf = new Faction(f.fill, f.stroke, f.name, f.abb);
    nf.id = f.id;
    nf.hexCount = f.hexCount;
    
    nf.create();
    
  }
  
  if (debug && factions.length == 0) {
    const testFac1 = new Faction('ffffff', 'ffffff', 'testFac1', 'tf1');
    const testFac2 = new Faction('999999', 'ffffff', 'testFac2', 'tf2');
    testFac1.create();
    testFac2.create();
    const redFac = new Faction('ff0000', 'ffffff', 'redFac', 'rf');
    const greenFac = new Faction('00ff00', 'ffffff', 'greenFac', 'gf');
    const blueFac = new Faction('0000ff', 'ffffff', 'blueFac', 'bf');
    redFac.create();
    greenFac.create();
    blueFac.create();
  }
  
}

let grid = null;

class Grid {
  constructor(x, y, zoom, width, height) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.zoomTo = zoom;
    this.zoomVel = zoom / 10;
    this.minZoom = 0.05;
    this.maxZoom = 10;
    this.width = width;
    this.height = height;
    this.hexes = [];
    this.name = 'map';
    this.stroke = {r: 255, g: 255, b: 255, a: 1};
    this.borders = [];
    this.hexOpacity = 1; // from 0 to 1
  }
  
  smoothZoom() {
    
    if (this.zoomTo > this.maxZoom) {
        this.zoomTo = this.maxZoom;
      } else if (this.zoomTo < this.minZoom) {
        this.zoomTo = this.minZoom;
      }
    
    if (this.zoom != this.zoomTo) {
      
      let oldz = this.zoom;
      
      let diff = Math.abs(this.zoom - this.zoomTo);
      
      if (diff <= this.zoomVel) {
        this.zoom = this.zoomTo;
      } else {
        this.zoomVel = this.zoom / 10;
      }
      
      if (this.zoom < this.zoomTo) {
        
        this.zoom += this.zoomVel;
        
      } else if (this.zoom > this.zoomTo) {
        
        this.zoom -= this.zoomVel;
        
      }
      
      if (this.zoom > this.maxZoom) {
        this.zoom = this.maxZoom;
      } else if (this.zoom < this.minZoom) {
        this.zoom = this.minZoom;
      }
      
      // maintain accurate position during zoom
      
      let dscale = this.zoom - oldz;
      
      let px, py;
      if (system == 'pc') {
        
        if (mouse.event.target.id == 'zoomSlider') {
          px = w / 2;
          py = h / 2;
        } else {
          px = mouse.x;
          py = mouse.y;
        }
        
      } else {
        
        px = w / 2;
        py = h / 2;
        
      }
      
      let hx = (px - this.x) / (hexConst.size * 1.5) / oldz;
      let hy = (py - this.y) / (hexConst.apothem * 2) / oldz;
      
      this.x -= hx * (hexConst.size * 1.5) * dscale;
      this.y -= hy * (hexConst.apothem * 2) * dscale;
      
      if (this.x + (hexConst.size * 1.5 * (this.width - 1)) * this.zoom - 10 < 0) {
        this.x = -((hexConst.size * 1.5 * (this.width - 1)) * this.zoom - 10);
      } else if (this.x + 10 > w) {
        this.x = w - 10;
      }
      
      if (this.y + (hexConst.apothem * 2 * (this.height - 1)) * this.zoom - 60 < 0) {
        this.y = -((hexConst.apothem * 2 * (this.height - 1)) * this.zoom - 60);
      } else if (this.y + 60 > h) {
        this.y = h - 60;
      }
      
    } else {
      
      this.zoomVel = this.zoom / 10
      
    }
    
  }
  
  fill(fac) {
    
    fac = fac || 'none';

    let hexes = [];
    
    for (let x = 0; x < this.width; x++) {
      
      let verticalHexes = [];
      
      for (let y = 0; y < this.height; y++) {
        
        let cx = x * (hexConst.size * 1.5);
        let cy = y * 2 * hexConst.apothem;
        
        if (x % 2 == 1) {
          cy += hexConst.apothem;
        }
        
        verticalHexes.push(new Hex(x, y, fac, cx, cy));
        
      }
      
      hexes.push(verticalHexes);
      
    }
    
    this.hexes = hexes;
    
  }
  
  load() {
    
    let backgroundColor = '#696969';
    
    switch (theme) {
      case 'basic':
        backgroundColor = '#dfdfdf';
        break;
      case 'dark':
        backgroundColor = '#202020';
        break;
      case 'coolDark':
        backgroundColor = '#0c0b19';
        break;
    }
    
    let color = hexToRGB(invertHexColor(backgroundColor, true));
    
    this.stroke = {r: color.r, g: color.g, b: color.b, a: this.stroke.a};
    
    document.getElementById('mapSettingsGridStroke').value = rgbToHex(color.r, color.g, color.b);
    
    document.getElementById('zoomSlider').value = this.zoom;
    
    grid = this;
    
  }
  
  unload() {
    
    grid = null;
    
    clearFactions();
    
  }
  
  getHighlightColor(obj) {
    
    obj = obj || false;
    
    let r = this.stroke.r > 127 ? this.stroke.r - 60 : this.stroke.r + 60;
    let g = this.stroke.g > 127 ? this.stroke.g - 60 : this.stroke.g + 60;
    let b = this.stroke.b > 127 ? this.stroke.b - 60 : this.stroke.b + 60;
    
    return obj ? {r: r, g: g, b: b, a: this.stroke.a} : `rgba(${r}, ${g}, ${b}, ${this.stroke.a})`;
    
  }
  
  getStrokeColor() {
    
    return `rgba(${this.stroke.r}, ${this.stroke.g}, ${this.stroke.b}, ${this.stroke.a})`;
    
  }
  
  // returns array of arrays (parallel to hexes array) of six 0's and 1's, 0 = no side, 1 = side
  setBorders() {
    
    let borders = [];
    
    for (let i = 0; i < this.width; i++) {
      
      let verticalBorders = [];
      
    for (let j = 0; j < this.height; j++) {
      
      let hex = this.hexes[i][j];
      
      let cx = hex.x;
      let cy = hex.y;
      
      let dy = hex.x % 2 == 0 ? -1 : 1;
      
      let h1 = cx - 1 > -1 ? this.hexes[cx - 1][cy] : null,
          h2 = cx + 1 < this.width ? this.hexes[cx + 1][cy] : null,
          h3 = cy + 1 < this.height ? this.hexes[cx][cy + 1] : null,
          h4 = cy - 1 > -1 ? this.hexes[cx][cy - 1] : null,
          h5 = cx - 1 > -1 && cy + dy > -1 && cy + dy < this.height ? this.hexes[cx - 1][cy + dy] : null,
          h6 = cx + 1 < this.width && cy + dy > -1 && cy + dy < this.height ? this.hexes[cx + 1][cy + dy] : null;
      
      let testHexes;
      
      if (dy == 1) {
        testHexes = [h6, h3, h5, h1, h4, h2];
      } else {
        testHexes = [h2, h3, h1, h5, h4, h6];
      }
      
      let sides = [];
      
      for (let j = 0; j < testHexes.length; j++) {
        
        if (testHexes[j] == null || testHexes[j].fac != hex.fac) {
          sides.push(1);
        } else {
          sides.push(0);
        }
        
      }
      
      verticalBorders.push(sides);
      
    }
      
      borders.push(verticalBorders);
      
    }
    
    this.borders = borders;
    
    //this.setContinuousBorders();
    
  }
  
  // updates the borders array at specified coordinates and surrounding area
  updateBorders(x, y) {
    
    let newBorder = [];
    
    let hex = this.hexes[x][y];
    
    let cx = hex.x;
    let cy = hex.y;
    
    let dy = hex.x % 2 == 0 ? -1 : 1;
    
    let h1 = cx - 1 > -1 ? this.hexes[cx - 1][cy] : null,
        h2 = cx + 1 < this.width ? this.hexes[cx + 1][cy] : null,
        h3 = cy + 1 < this.height ? this.hexes[cx][cy + 1] : null,
        h4 = cy - 1 > -1 ? this.hexes[cx][cy - 1] : null,
        h5 = cx - 1 > -1 && cy + dy > -1 && cy + dy < this.height ? this.hexes[cx - 1][cy + dy] : null,
        h6 = cx + 1 < this.width && cy + dy > -1 && cy + dy < this.height ? this.hexes[cx + 1][cy + dy] : null;
    
    let testHexes;
    
    if (dy == 1) {
      testHexes = [h6, h3, h5, h1, h4, h2];
    } else {
      testHexes = [h2, h3, h1, h5, h4, h6];
    }
    
    let sides = [];
    
    for (let j = 0; j < testHexes.length; j++) {
      
      if (testHexes[j] == null || testHexes[j].fac != hex.fac) {
        
        sides.push(1);
        
        if (testHexes[j] != null) {
        
        let index = shiftIntInRange(j, 0, 5, 3);
        this.borders[testHexes[j].x][testHexes[j].y][index] = 1;
        
        }
        
      } else {
        
        sides.push(0);
        
        if (testHexes[j] != null) {
        
        let index = shiftIntInRange(j, 0, 5, 3);
        this.borders[testHexes[j].x][testHexes[j].y][index] = 0;
          
        }
        
      }
      
    }
    
    newBorder = sides;
    
    this.borders[x][y] = newBorder;
    
  }
  
  // returns the border data of a single hexagon
  getBorder(x, y) {
    
    return this.borders[x][y];
    
  }
  
}

const hexSin = [0, 0.866, 0.866, 0, -0.866, -0.866, 0];
const hexCos = [1, 0.5, -0.5, -1, -0.5, 0.5, 1];

class Hex {
  constructor(x, y, fac, cx, cy) {
    this.x = x;
    this.y = y;
    this.fac = fac;
    this.cx = cx;
    this.cy = cy;
    this.id = -1; // equal to the hex's index in its faction array (-1 if fac is none)
    this.thicknessMult = 1;
  }
  
  getPoints(size) {
    
    let points = [];
    
    for (let i = 0; i < 7; i++) {
      
      points.push([this.cx + size * hexCos[i], this.cy + size * hexSin[i]]);
      
    }
    
    return points;
    
  }
  
  getSurroundingHexes() {
    
    // check if the x is odd, check surroundings accordingly
    // theres probably a better way to do this
    
    let cx = this.x;
    let cy = this.y;
    
    let dy = this.x % 2 == 0 ? -1 : 1;
    
    let h1 = cx - 1 > -1 ? grid.hexes[cx - 1][cy] : null,
        h2 = cx + 1 < grid.width ? grid.hexes[cx + 1][cy] : null,
        h3 = cy + 1 < grid.height ? grid.hexes[cx][cy + 1] : null,
        h4 = cy - 1 > -1 ? grid.hexes[cx][cy - 1] : null,
        h5 = cx - 1 > -1 && cy + dy > -1 && cy + dy < grid.height ? grid.hexes[cx - 1][cy + dy] : null,
        h6 = cx + 1 < grid.width && cy + dy > -1 && cy + dy < grid.height ? grid.hexes[cx + 1][cy + dy] : null;
    
    return [h1, h2, h3, h4, h5, h6];
    
  }
  
  setFac(fac) {

    if (this.fac != 'none') {
      
      this.fac.hexes.splice(this.id, 1);
      
      this.fac.correctHexIds(this.id, 1);
      
      this.fac.hexCount--;
      
    }
    
    this.fac = fac;
    
    if (fac != 'none' && fac != undefined && fac != null) {
      
      this.id = fac.hexes.length;
      fac.hexes.push(this);
      
      fac.hexCount++;
      
    } else {
      
      this.id = -1;
      
    }
    
    grid.updateBorders(this.x, this.y);
    
  }
  
}

