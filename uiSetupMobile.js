// initialize ui (but for losers on mobile)

function initializeUIMobile() {
  
  const menuDiv = new Element('div', '', '', 'menuDiv', `0px`, `0px`, `100%`, `100%`, 'transparent', '');
  menuDiv.create();
  
  const menuBarDiv = new Element('div', '', '', 'menuBarDiv', `0px`, `50%`, `100%`, `50%`, 'norm', '');
  menuBarDiv.div = menuDiv;
  menuBarDiv.create();

  const menuBarDiv2 = new Element('div', '', '', 'menuBarDiv2', `0px`, `40%`, `100%`, `60%`, 'norm', '');
  menuBarDiv2.div = menuDiv;
  menuBarDiv2.create();
  
  const menuNew = new Element('button', '', 'New Map', 'menuNew', `10%`, `calc(100% - 250px)`, `80%`, `50px`, 'norm', function() {
    //action func
    menuBarDiv.deselect(-1, menuNew);
    
    menuBarDiv2.hide(-1, menuNewDiv);
    menuBarDiv2.show(0);
    menuBack.show(0);
    
    menuNew.flipSel();
    menuNewDiv.flipVis();
    
  });
  menuNew.div = menuBarDiv;
  menuNew.create();
  
  const menuNewDiv = new Element('div', '', 'New Map Settings', 'menuNewDiv', `0px`, `0px`, `100%`, `calc(100% - 50px)`, 'norm', '');
  menuNewDiv.div = menuBarDiv2;
  menuNewDiv.create();

  const menuNewWidth = new Element('input', 'number', 'Width:&nbsp;', 'menuNewWidth', `70px`, `40px`, `200px`, `30px`, 'norm', function() {
    //action func
    // set map width
    
  });
  menuNewWidth.div = menuNewDiv;
  menuNewWidth.create();
  menuNewWidth.setVal(100);

  const menuNewHeight = new Element('input', 'number', 'Height:&nbsp;', 'menuNewHeight', `70px`, `80px`, `200px`, `30px`, 'norm', function() {
    //action func
    // set map height
    
  });
  menuNewHeight.div = menuNewDiv;
  menuNewHeight.create();
  menuNewHeight.setVal(100);

  const menuNewGo = new Element('button', '', 'Generate Map', 'menuNewGo', `10%`, `calc(100% - 60px)`, `80%`, `50px`, 'norm', function() {
    //action func
    menuBarDiv.deselect(-1);
    menuDiv.hide(-1);
    mapDiv.show(1, [mapFactionsDiv, mapFactionsTopDiv, mapFactionsNewDiv, mapFactionsEditDiv, mapSettingsDiv]);
    penSelect.show();
    eraseSelect.show();
    fillSelect.show();
    undoButton.show();
    redoButton.show();
    //moveStickDiv.show();
    
    let g = new Grid(50, 50, 1, parseInt(menuNewWidth.getVal()), parseInt(menuNewHeight.getVal()));
    
    g.fill('none');
    
    g.setBorders();
    
    g.load();
    
    hexConst.count = grid.width * grid.height;
    
    mapSettingsGridStroke.setVal(rgbStrToHex(grid.getStrokeColor()));
    
    backgroundImage.img = 'none';
    
    mapSettingsImage.setVal('');
    mapSettingsImageScaleX.setVal('');
    mapSettingsImageScaleY.setVal('');
    
  });
  menuNewGo.div = menuNewDiv;
  menuNewGo.create();
  
  const menuLoad = new Element('button', '', 'Load Map', 'menuLoad', `10%`, `calc(100% - 190px)`, `80%`, `50px`, 'norm', function() {
    
    menuBarDiv.deselect(-1, menuLoad);
    
    menuBarDiv2.hide(-1, menuLoadDiv);
    menuBarDiv2.show(0);
    menuBack.show(0);
    
    menuLoad.flipSel();
    menuLoadDiv.flipVis();
    
  });
  menuLoad.div = menuBarDiv;
  menuLoad.create();

  const menuLoadDiv = new Element('div', '', 'Load Map from File', 'menuLoadDiv', `0px`, `0px`, `100%`, `calc(100% - 50px)`, 'norm', '');
  menuLoadDiv.div = menuBarDiv2;
  menuLoadDiv.create();
  
  const menuLoadFile = new Element('input', 'file', 'Map File', 'menuLoadFile', `10%`, `40px`, `80%`, `50px`, 'norm', function() {
    
    document.getElementById('menuLoadFileLabelText').innerHTML = menuLoadFile.getVal().split('\\')[menuLoadFile.getVal().split('\\').length - 1];
    
  });
  menuLoadFile.div = menuLoadDiv;
  menuLoadFile.create();
  //menuLoadFile.addAttribute('accept', '.json'); // for some reason this breaks things on phones
  document.getElementById(menuLoadFile.id).style = 'display: none;';
  
  let loadLabel = document.getElementById(`menuLoadFileLabel`);
  loadLabel.setAttribute('class', 'file');
  loadLabel.style.top = '40px';
  loadLabel.style.left = '10%';
  loadLabel.style.width = '80%';
  loadLabel.style.height = '50px';
  
  const menuLoadFileLabelText = new Element('p', '', '...', 'menuLoadFileLabelText', 'calc(10% + 5px)', '50px', 'calc(80% - 5px)', '20px', 'light', '');
  menuLoadFileLabelText.div = menuLoadDiv;
  menuLoadFileLabelText.create();
  document.getElementById(menuLoadFileLabelText.id).style.textAlign = 'center';
  document.getElementById(menuLoadFileLabelText.id).style.pointerEvents = 'none';
  
  const menuLoadGo = new Element('button', '', 'Load Map', 'menuLoadGo', `10%`, `calc(100% - 60px)`, `80%`, `50px`, 'norm', function(e) {
    //action func
    let fileName = document.getElementById('menuLoadFile').files[0];
    if (fileName != undefined && fileName != '' && menuLoadFile.getVal().split('\\')[menuLoadFile.getVal().split('\\').length - 1].includes('.json')) {
      
      menuBarDiv.deselect(-1);
      menuDiv.hide(-1);
      mapDiv.show(1, [mapFactionsDiv, mapFactionsTopDiv, mapFactionsNewDiv, mapFactionsEditDiv, mapSettingsDiv]);
      penSelect.show();
      eraseSelect.show();
      fillSelect.show();
      undoButton.show();
      redoButton.show();
      
      let reader = new FileReader();
      
      reader.onload = function(e) {
        
        let map = JSON.parse(e.target.result);
        loadMap(map);
        
        mapSettingsGridStroke.setVal(rgbStrToHex(grid.getStrokeColor()));
        
      };
      
      reader.readAsText(document.getElementById('menuLoadFile').files[0]);
      
    }
    
  });
  menuLoadGo.div = menuLoadDiv;
  menuLoadGo.create();

  const menuOptions = new Element('button', '', 'Options', 'menuOptions', `10%`, `calc(100% - 130px)`, `80%`, `50px`, 'norm', function() {
    //action func
    menuBarDiv.deselect(-1, menuOptions);
    
    menuBarDiv2.hide(-1, menuOptionsDiv);
    menuBarDiv2.show(0);
    menuBack.show(0);
    
    menuOptions.flipSel();
    menuOptionsDiv.flipVis();
    
  });
  menuOptions.div = menuBarDiv;
  menuOptions.create();
  
  const menuOptionsDiv = new Element('div', '', 'Options', 'menuOptionsDiv', `0px`, `0px`, `100%`, `calc(100% - 50px)`, 'norm', '');
  menuOptionsDiv.div = menuBarDiv2;
  menuOptionsDiv.create();
  
  const menuThemesText = new Element('p', '', 'Themes', 'menuThemesText', `10%`, `22px`, `80%`, `150px`, 'light', '');
  menuThemesText.div = menuOptionsDiv;
  menuThemesText.create();
  document.getElementById('menuThemesText').style.textAlign = 'center';
  
  const menuThemesDiv = new Element('div', '', '', 'menuThemesDiv', `10%`, `30px`, `80%`, `200px`, 'transparent', '');
  menuThemesDiv.div = menuOptionsDiv;
  menuThemesDiv.create();
  
  const menuOptionsBasic = new Element('button', '', 'Basic', 'menuOptionsBasic', `10%`, `30px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsBasic.select();
    
    document.getElementById('theme').setAttribute('href', 'basic.css');
    
    localStorage.setItem('selected_theme', 'basic.css');
    
    theme = 'basic';
    
  });
  menuOptionsBasic.div = menuThemesDiv;
  menuOptionsBasic.create();
  
  const menuOptionsDark = new Element('button', '', 'Dark', 'menuOptionsDark', `10%`, `80px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsDark.select();
    
    document.getElementById('theme').setAttribute('href', 'dark.css');
    
    localStorage.setItem('selected_theme', 'dark.css');
    
    theme = 'dark';
    
  });
  menuOptionsDark.div = menuThemesDiv;
  menuOptionsDark.create();
  
  const menuOptionsCoolDark = new Element('button', '', 'Cool Dark', 'menuOptionsCoolDark', `10%`, `130px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsCoolDark.select();
    
    document.getElementById('theme').setAttribute('href', 'coolDark.css');
    
    localStorage.setItem('selected_theme', 'coolDark.css');
    
    theme = 'coolDark';
    
  });
  menuOptionsCoolDark.div = menuThemesDiv;
  menuOptionsCoolDark.create();
  
  switch (localStorage.getItem('selected_theme')) {
    case null:
      menuOptionsCoolDark.select();
      
      theme = 'coolDark';
      
      break;
    case 'basic.css':
      menuOptionsBasic.select();
      
      theme = 'basic';
      
      break;
    case 'dark.css':
      menuOptionsDark.select();
      
      theme = 'dark';
      
      break;
    case 'coolDark.css':
      menuOptionsCoolDark.select();
      
      theme = 'coolDark';
      
      break;
  }
  
  const menuOptionsSwitch = new Element('button', '', 'Switch to PC UI', 'menuOptionsSwitch', `5%`, `230px`, `90%`, `50px`, 'norm', function() {
    //action func
    
    system = 'pc';
    
    clearAllUI();
    initializeUI();
    
    changeTool('Pen');
    
  });
  menuOptionsSwitch.div = menuOptionsDiv;
  menuOptionsSwitch.create();

  const menuGuide = new Element('button', '', 'Guide', 'menuGuide', `10%`, `calc(100% - 70px)`, `80%`, `50px`, 'norm', function() {
    //action func
    
    window.open('guide.html', '_blank');
    
  });
  menuGuide.div = menuBarDiv;
  menuGuide.create();
  menuGuide.setVis('visible');
  
  const menuBack = new Element('button', '', '<- Back', 'menuBack', '0px', 'calc(100% - 50px)', '50%', '50px', 'norm', function() {
    
    menuBarDiv2.hide(-1);
    menuBarDiv.deselect(-1);
    
  });
  menuBack.div = menuBarDiv2;
  menuBack.create();
  
  
  //  map  //
  
  
  const mapDiv = new Element('div', '', '', 'mapDiv', '0px', '0px', '100%', '100%', 'transparent', '');
  mapDiv.create();
  
  const undoButton = new Element('button', '', '', 'undoButton', '5px', 'calc(100% - 105px)', '50px', '50px', 'norm gray', function() {
    //action func
    if (undoMoves.length > 0) {
      undo();
    }
    
  });
  undoButton.div = mapDiv;
  undoButton.create();
  
  undoButton.setHTML(`<img src="undoarrow.png" class="mono" width="50px" height="50px" style="right: 7px; border-radius: 25px;" draggable="false">`);
  
  const redoButton = new Element('button', '', '', 'redoButton', '5px', 'calc(100% - 160px)', '50px', '50px', 'norm gray', function() {
    //action func
    if (redoMoves.length > 0) {
      redo();
    }
    
  });
  redoButton.div = mapDiv;
  redoButton.create();
  
  redoButton.setHTML(`<img src="redoarrow.png" class="mono" width="50px" height="50px" style="right: 7px; border-radius: 25px;" draggable="false">`);
  
  const zoomSlider = new Element('input', 'range', '', 'zoomSlider', 'calc(100% - 155px)', '180px', '275px', '30px', 'norm vertical', function() {

    let zs = parseFloat(zoomSlider.getVal());
    
    grid.zoomTo = zs;
    
  });
  zoomSlider.div = mapDiv;
  zoomSlider.create();
  document.getElementById('zoomSlider').setAttribute('min', 0.05);
  document.getElementById('zoomSlider').setAttribute('max', 10);
  document.getElementById('zoomSlider').setAttribute('step', 0.05);
  
  const zoomIcon = new Element('img', '', '', 'zoomIcon', 'calc(100% - 30px)', '337px', '30px', '30px', 'mono', '');
  zoomIcon.div = mapDiv;
  zoomIcon.create();
  document.getElementById('zoomIcon').setAttribute('src', 'zoomIcon.png');
  document.getElementById('zoomIcon').setAttribute('draggable', 'false');
  
  const penSelect = new Element('button', '', '<img class="mono" src="tool_Pen.png" href="Pen" width="25px" height="25px" style="top: 2px;" draggable="false">', 'penSelect', '50%', 'calc(100% - 50px)', 'calc(50% / 3)', '50px', 'norm', function() {
    //action func
    changeTool('Pen');
    
  });
  penSelect.div = mapDiv;
  penSelect.create();
  penSelect.setcss('selected');
  
  const eraseSelect = new Element('button', '', '<img class="mono" src="tool_Erase.png" href="Erase" width="25px" height="25px" style="top: 2px;" draggable="false">', 'eraseSelect', 'calc(50% + 50% / 3)', 'calc(100% - 50px)', 'calc(50% / 3)', '50px', 'norm', function() {
    //action func
    changeTool('Erase');
    
  });
  eraseSelect.div = mapDiv;
  eraseSelect.create();
  
  const fillSelect = new Element('button', '', '<img class="mono" src="tool_Fill.png" href="Fill" width="25px" height="25px" style="top: 2px;" draggable="false">', 'fillSelect', 'calc(50% + 50% / 3 + 50% / 3)', 'calc(100% - 50px)', 'calc(50% / 3)', '50px', 'norm', function() {
    //action func
    changeTool('Fill');
    
  });
  fillSelect.div = mapDiv;
  fillSelect.create();
  
  const mapImage = new Element('button', '','Convert to Image...', 'mapImage', '0px', '0px', '50%', '50px', 'norm', function() {
    //action func
    
    
  });
  mapImage.div = mapDiv;
  mapImage.create();
  mapImage.setCursor('not-allowed');
  
  const mapFactions = new Element('button', '','Factions', 'mapFactions', '0px', 'calc(100% - 50px)', '50%', '50px', 'norm', function() {
    //action func
    mapFactions.flipSel();
    mapFactionsDiv.flipVis();
    mapFactionsTopDiv.flipVis();
    mapFactionsNewDiv.hide(-1);
    mapFactionsNew.deselect();
    mapFactionsEditDiv.hide(-1);
    
  });
  mapFactions.div = mapDiv;
  mapFactions.create();

  const mapFactionsDiv = new Element('div', '','', 'mapFactionsDiv', '0px', '150px', '100%', 'calc(100% - 200px)', 'norm', '');
  mapFactionsDiv.div = mapDiv;
  mapFactionsDiv.create();
  
  const mapFactionsBottomText = new Element('p', '', '^', 'mapFactionsBottomText', 'calc(50% - 7px)', '30px', '30px', '30px', 'light', '');
  mapFactionsBottomText.div = mapFactionsDiv;
  mapFactionsBottomText.create();
  
  const mapFactionsTopDiv = new Element('div', '','Faction List', 'mapFactionsTopDiv', '0px', '100px', 'calc(100% - 5px)', '50px', 'norm text', '');
  mapFactionsTopDiv.div = mapDiv;
  mapFactionsTopDiv.create();
  document.getElementById(mapFactionsTopDiv.id).style.textAlign = 'left';
  document.getElementById(mapFactionsTopDiv.id).style.paddingLeft = '5px';
  
  const mapFactionsNew = new Element('button', '', 'New Faction', 'mapFactionsNew', 'calc(100% - 150px)', '0px', '150px', '55px', 'norm', function() {
    
    mapFactionsNew.flipSel();
    mapFactionsNewDiv.flipVis(-1);
    
  });
  mapFactionsNew.div = mapFactionsTopDiv;
  mapFactionsNew.create();
  
  const mapFactionsNewDiv = new Element('div', '','New Faction', 'mapFactionsNewDiv', '0px', '180px', '100%', 'calc(100% - 230px)', 'norm text', '');
  mapFactionsNewDiv.div = mapDiv;
  mapFactionsNewDiv.create();
  
  const mapFactionsNewName = new Element('input', 'text', 'Full Name:&nbsp;', 'mapFactionsNewName', '100px', '30px', 'calc(100% - 150px)', '30px', 'norm', '');
  mapFactionsNewName.div = mapFactionsNewDiv;
  mapFactionsNewName.create();
  
  const mapFactionsNewAbb = new Element('input', 'text', 'Abbreviation:&nbsp;', 'mapFactionsNewAbb', '125px', '70px', 'calc(100% - 175px)', '30px', 'norm', '');
  mapFactionsNewAbb.div = mapFactionsNewDiv;
  mapFactionsNewAbb.create();
  
  const mapFactionsNewColorCode = new Element('input', 'text', 'Hex Color Code: #', 'mapFactionsNewColorCode', '160px', '110px', 'calc(100% - 210px)', '30px', 'norm', function() {
    
    mapFactionsNewColorCode.setVal(whitelistChars('0-9a-fA-F', mapFactionsNewColorCode.getVal().substring(0, 6)).toLowerCase());
    
    mapFactionsNewColor.setVal(`#${mapFactionsNewColorCode.getVal()}`);
    
  });
  mapFactionsNewColorCode.div = mapFactionsNewDiv;
  mapFactionsNewColorCode.create();
  
  const mapFactionsNewColor = new Element('input', 'color', 'Color:&nbsp;', 'mapFactionsNewColor', '75px', '150px', '50px', '50px', 'norm', function() {
    
    mapFactionsNewColorCode.setVal(mapFactionsNewColor.getVal().split('#')[1]);
    
  });
  mapFactionsNewColor.div = mapFactionsNewDiv;
  mapFactionsNewColor.create();
  
  const mapFactionsNewGo = new Element('button', '', 'Create', 'mapFactionsNewGo', '10%', '230px', '80%', '50px', 'norm', function() {
    
    if (mapFactionsNewColorCode.getVal().length >= 6 && mapFactionsNewName.getVal().length > 0 && mapFactionsNewAbb.getVal().length > 0) {
      
      let newfac = new Faction(`${whitelistChars('0-9a-fA-F', mapFactionsNewColorCode.getVal().substring(0, 6)).toLowerCase()}`, '000000', mapFactionsNewName.getVal(), mapFactionsNewAbb.getVal());
      newfac.create();
      
      mapFactionsNewDiv.hide(-1);
      mapFactionsNew.deselect();
      
      mapFactionsDiv.show(-1);
      
    }
    
  });
  mapFactionsNewGo.div = mapFactionsNewDiv;
  mapFactionsNewGo.create();
  
  const mapFactionsEditDiv = new Element('div', '','Editing ', 'mapFactionsEditDiv', '0px', '180px', '100%', 'calc(100% - 230px)', 'norm text', '');
  mapFactionsEditDiv.div = mapDiv;
  mapFactionsEditDiv.create();
  
  const mapFactionsEditName = new Element('input', 'text', 'Full Name:&nbsp;', 'mapFactionsEditName', '100px', '30px', 'calc(100% - 150px)', '30px', 'norm', '');
  mapFactionsEditName.div = mapFactionsEditDiv;
  mapFactionsEditName.create();
  
  const mapFactionsEditAbb = new Element('input', 'text', 'Abbreviation:&nbsp;', 'mapFactionsEditAbb', '125px', '70px', 'calc(100% - 175px)', '30px', 'norm', '');
  mapFactionsEditAbb.div = mapFactionsEditDiv;
  mapFactionsEditAbb.create();
  
  const mapFactionsEditColorCode = new Element('input', 'text', 'Hex Color Code: #', 'mapFactionsEditColorCode', '160px', '110px', 'calc(100% - 210px)', '30px', 'norm', function() {
    
    mapFactionsEditColorCode.setVal(whitelistChars('0-9a-fA-F', mapFactionsEditColorCode.getVal().substring(0, 6)).toLowerCase());
    
    mapFactionsEditColor.setVal(`#${mapFactionsEditColorCode.getVal()}`);
    
  });
  mapFactionsEditColorCode.div = mapFactionsEditDiv;
  mapFactionsEditColorCode.create();
  
  const mapFactionsEditColor = new Element('input', 'color', 'Color:&nbsp;', 'mapFactionsEditColor', '75px', '150px', '50px', '50px', 'norm', function() {
    
    mapFactionsEditColorCode.setVal(mapFactionsEditColor.getVal().split('#')[1]);
    
  });
  mapFactionsEditColor.div = mapFactionsEditDiv;
  mapFactionsEditColor.create();
  
  const mapFactionsEditGo = new Element('button', '', 'Save Edits', 'mapFactionsEditGo', '10%', '230px', '80%', '50px', 'norm', function() {
    
    let id = document.getElementById(mapFactionsEditDiv.id).value;
    
    for (let i = 0; i < factions.length; i++) {
      
      if (factions[i].id == id) {
        
        factions[i].name = mapFactionsEditName.getVal();
        factions[i].abb = mapFactionsEditAbb.getVal();
        factions[i].fill = `${whitelistChars('0-9a-fA-F', mapFactionsEditColorCode.getVal().substring(0, 6))}`;
        
        factions[i].refresh();
        break;
        
      }
      
    }
    
    mapFactionsEditDiv.hide(-1);
    
    let es = document.getElementsByName('facEditButton');
    
    for (let i = 0; i < es.length; i++) {
      
      es[i].setAttribute('class', 'norm');
      
    }
    
  });
  mapFactionsEditDiv.addAttribute('value', -1);
  mapFactionsEditGo.div = mapFactionsEditDiv;
  mapFactionsEditGo.create();
  
  const mapFactionsEditBack = new Element('button', '', 'Cancel', 'mapFactionsEditBack', '10%', '280px', '80%', '50px', 'norm', function() {
    
    mapFactionsEditDiv.hide(-1);
    
    let es = document.getElementsByName('facEditButton');
    
    for (let i = 0; i < es.length; i++) {
      
      es[i].setAttribute('class', 'norm');
      
    }
    
  });
  mapFactionsEditBack.div = mapFactionsEditDiv;
  mapFactionsEditBack.create();
  
  const mapSettings = new Element('button', '','Settings', 'mapSettings', '50%', '0px', '50%', '50px', 'norm', function() {
    //action func
    mapSettings.flipSel();
    mapSettingsDiv.flipVis();
    
  });
  mapSettings.div = mapDiv;
  mapSettings.create();
  
  const mapSettingsDiv = new Element('div', '', 'Map Settings', 'mapSettingsDiv', '5%', '80px', '90%', 'calc(100% - 150px)', 'norm text', '');
  mapSettingsDiv.div = mapDiv;
  mapSettingsDiv.create();
  
  const mapSettingsDownloadName = new Element('input', 'text', 'Map Name:&nbsp;', 'mapSettingsDownloadName', '30%', '40px', '60%', '30px', 'norm', function() {
    //action func
    grid.name = mapSettingsDownloadName.getVal();
    
  });
  mapSettingsDownloadName.div = mapSettingsDiv;
  mapSettingsDownloadName.create();
  mapSettingsDownloadName.setVal('map');
  
  const mapSettingsDownloadGo = new Element('button', 'submit', 'Download Map File', 'mapSettingsDownloadGo', '10%', '85px', '80%', '50px', 'norm', function() {
    //action func
    
    let hexArr = grid.hexes.map((rowArr) => {
      
      let fullArr = [];
      
      for (let i = 0; i < rowArr.length; i++) {
        fullArr.push(rowArr[i].fac.id);
      }
      
      return fullArr;
      
    });
    
    let factionsCopy = factions.map((f) => {
      
      let nf = new Faction(f.fill, f.stroke, f.name, f.abb);
      nf.id = f.id;
      nf.hexCount = f.hexCount;
      
      return nf;
      
    });
    
    let factionArr = factionsCopy.map((fac) => {
      
      fac.hexes.splice(0, fac.hexes.length);
      
      return fac;
      
    });
    
    let saveGrid = {
      name: grid.name,
      width: grid.width,
      height: grid.height,
      hexOpacity: grid.hexOpacity,
      stroke: grid.stroke,
      factions: factionArr,
      hexes: hexArr,
      image: backgroundImage,
      imageData: backgroundImage.img.src
    }
    
    download(`${saveGrid.name}.json`, JSON.stringify(saveGrid));
    
  });
  mapSettingsDownloadGo.div = mapSettingsDiv;
  mapSettingsDownloadGo.create();
  
  const mapSettingsOutlineText = new Element('p', '', 'Outline Style', 'mapSettingsOutlineText', '0%', '122px', '100%', '30px', 'norm', '');
  mapSettingsOutlineText.div = mapSettingsDiv;
  mapSettingsOutlineText.create();
  document.getElementById('mapSettingsOutlineText').style.textAlign = 'center';
  
  const mapSettingsGridStroke = new Element('input', 'color', 'Color:&nbsp;', 'mapSettingsGridStroke', '30%', '160px', '60%', '30px', 'norm', function() {
    //action func
    let color = hexToRGB(mapSettingsGridStroke.getVal());
    
    grid.stroke.r = color.r;
    grid.stroke.g = color.g;
    grid.stroke.b = color.b;
    
  });
  mapSettingsGridStroke.div = mapSettingsDiv;
  mapSettingsGridStroke.create();
  
  const mapSettingsOutlineAll = new Element('button', '', 'All', 'mapSettingsOutlineAll', '5%', '200px', '30%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.select();
    mapSettingsOutlineBorder.deselect();
    mapSettingsOutlineNone.deselect();
    
    outline = 'norm';
    
  });
  mapSettingsOutlineAll.div = mapSettingsDiv;
  mapSettingsOutlineAll.create();
  mapSettingsOutlineAll.select();
  
  const mapSettingsOutlineBorder = new Element('button', '', 'Borders', 'mapSettingsOutlineBorder', '35%', '200px', '30%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.deselect();
    mapSettingsOutlineBorder.select();
    mapSettingsOutlineNone.deselect();
    
    outline = 'border';
    
  });
  mapSettingsOutlineBorder.div = mapSettingsDiv;
  mapSettingsOutlineBorder.create();
  
  const mapSettingsOutlineNone = new Element('button', '', 'None', 'mapSettingsOutlineNone', '65%', '200px', '30%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.deselect();
    mapSettingsOutlineBorder.deselect();
    mapSettingsOutlineNone.select();
    
    outline = 'none';
    
  });
  mapSettingsOutlineNone.div = mapSettingsDiv;
  mapSettingsOutlineNone.create();
  
  const mapSettingsOutlineOpacity = new Element('input', 'range', 'Outline: 100%&nbsp;', 'mapSettingsOutlineOpacity', '40%', '240px', '55%', '30px', 'norm slider', function() {
    
    let a = parseInt(mapSettingsOutlineOpacity.getVal());

    grid.stroke.a = a / 100;
    document.getElementById(`mapSettingsOutlineOpacityLabel`).innerHTML = `Outline: ${a}%&nbsp;`;
    
  });
  mapSettingsOutlineOpacity.div = mapSettingsDiv;
  mapSettingsOutlineOpacity.create();
  mapSettingsOutlineOpacity.setVal(100);
  mapSettingsOutlineOpacity.setCursor('pointer');
  document.getElementById(`mapSettingsOutlineOpacity`).min = 0;
  document.getElementById(`mapSettingsOutlineOpacity`).max = 100;
  
  const mapSettingsFillOpacity = new Element('input', 'range', 'Fill: 100%&nbsp;', 'mapSettingsFillOpacity', '40%', '280px', '55%', '30px', 'norm slider', function() {
    
    let a = parseInt(mapSettingsFillOpacity.getVal());

    grid.hexOpacity = a / 100;
    document.getElementById(`mapSettingsFillOpacityLabel`).innerHTML = `Fill: ${a}%&nbsp;`;
    
  });
  mapSettingsFillOpacity.div = mapSettingsDiv;
  mapSettingsFillOpacity.create();
  mapSettingsFillOpacity.setVal(100);
  mapSettingsFillOpacity.setCursor('pointer');
  document.getElementById(`mapSettingsFillOpacity`).min = 0;
  document.getElementById(`mapSettingsFillOpacity`).max = 100
  
  const mapSettingsImage = new Element('input', 'text', 'Background Image URL:&nbsp;', 'mapSettingsImage', '55%', '335px', '40%', '30px', 'norm', function() {
    
    let im = new Image();
    im.src = document.getElementById('mapSettingsImage').value;
    im.crossOrigin = 'anonymous';
    
    im.onload = function() {
      
      backgroundImage.img = im;
      backgroundImage.width = im.width;
      backgroundImage.height = im.height;
      
      let xs = (grid.width - 1) * hexConst.size * 1.5;
      let ys = (grid.height - 0.5) * hexConst.apothem * 2;
      
      backgroundImage.scaleX = xs / im.width;
      backgroundImage.scaleY = ys / im.height;
      
      mapSettingsImageScaleX.setVal(xs / im.width);
      mapSettingsImageScaleY.setVal(ys / im.height);
      
      //console.log(backgroundImage.img, backgroundImage.x, backgroundImage.y, backgroundImage.width, backgroundImage.height);
    }
    
  });
  mapSettingsImage.div = mapSettingsDiv;
  mapSettingsImage.create();
  
  const mapSettingsImageScaleX = new Element('input', 'number', 'Scale X:&nbsp;', 'mapSettingsImageScaleX', '25%', '380px', '20%', '30px', 'norm', function() {
    
    backgroundImage.scaleX = parseFloat(mapSettingsImageScaleX.getVal());
    
  });
  mapSettingsImageScaleX.div = mapSettingsDiv;
  mapSettingsImageScaleX.create();
  mapSettingsImageScaleX.setVal(1);
  
  const mapSettingsImageScaleY = new Element('input', 'number', 'Scale Y:&nbsp;', 'mapSettingsImageScaleY', '70%', '380px', '20%', '30px', 'norm', function() {
    
    backgroundImage.scaleY = parseFloat(mapSettingsImageScaleY.getVal());
    
  });
  mapSettingsImageScaleY.div = mapSettingsDiv;
  mapSettingsImageScaleY.create();
  mapSettingsImageScaleY.setVal(1);
  
  const mapSettingsImageClear = new Element('button', '', 'Clear background Image', 'mapSettingsImageClear', '10%', '420px', '80%', '50px', 'norm', function() {
    //action func
    mapSettingsImage.setVal('');
    backgroundImage.img = 'none';
    
  });
  mapSettingsImageClear.div = mapSettingsDiv;
  mapSettingsImageClear.create();
  
  const mapSettingsExit = new Element('button', '','Exit to Main Menu', 'mapSettingsExit', '10%', '485px', '80%', '50px', 'norm', function() {
    //action func
    mapDiv.hide(-1);
    mapDiv.deselect(-1);

    menuDiv.show(2, menuBarDiv2, false);
    
    grid.unload();
    
    faction.selected = 'none';
    hexConst.selected = 'none';
    
    mapFactions.setHTML('Factions');
    
  });
  mapSettingsExit.div = mapSettingsDiv;
  mapSettingsExit.create();
  
  
  
  menuDiv.show(2, menuBarDiv2, false);
  
  initializeFactions();
  
}