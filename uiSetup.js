// setup (initialize and change ui within this function)
function initializeUI() {
  
  const menuDiv = new Element('div', '', '', 'menuDiv', `0px`, `0px`, `100%`, `100%`, 'transparent', '');
  menuDiv.create();
  
  const menuBarDiv = new Element('div', '', '', 'menuBarDiv', `0px`, `0px`, `300px`, `100%`, 'norm', '');
  menuBarDiv.div = menuDiv;
  menuBarDiv.create();

  const menuBarDiv2 = new Element('div', '', '', 'menuBarDiv2', `300px`, `0px`, `300px`, `100%`, 'transparent', '');
  menuBarDiv2.div = menuDiv;
  menuBarDiv2.create();
  
  const menuIcon = new Element('img', '', '', 'menuIcon', '0px', '0px', '300px', '300px', 'mono', '');
  menuIcon.div = menuBarDiv;
  menuIcon.create();
  menuIcon.addAttribute('src', 'menu_icon.png');
  
  const menuNew = new Element('button', '', 'New Map', 'menuNew', `10%`, `calc(100% - 250px)`, `80%`, `50px`, 'norm', function() {
    //action func
    menuBarDiv.deselect(-1, menuNew);
    
    menuBarDiv2.hide(-1, menuNewDiv);
    menuBarDiv2.show(0);
    
    menuNew.flipSel();
    menuNewDiv.flipVis();
    
  });
  menuNew.div = menuBarDiv;
  menuNew.create();

  const menuNewDiv = new Element('div', '', 'New Map Settings', 'menuNewDiv', `1px`, `calc(100% - 450px)`, `298px`, `300px`, 'norm text', '');
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

  const menuNewGo = new Element('button', '', 'Generate Map', 'menuNewGo', `10%`, `calc(100% - 180px)`, `80%`, `50px`, 'norm', function() {
    //action func
    menuBarDiv.deselect(-1);
    menuDiv.hide(-1);
    mapDiv.show(1, [toolBarDiv, mapFactionsDiv, mapFactionsNewDiv, mapFactionsEditDiv, mapSettingsDiv, mapImageDiv]);
    undoButton.show();
    redoButton.show();
    flipMove.show();
    
    let g = new Grid(50, 50, 1, parseInt(menuNewWidth.getVal()), parseInt(menuNewHeight.getVal()));
    
    g.fill('none');
    
    g.load();
    
    g.setBorders();
    
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
    //action func
    menuBarDiv.deselect(-1, menuLoad);
    
    menuBarDiv2.hide(-1, menuLoadDiv);
    menuBarDiv2.show(0);
    
    menuLoad.flipSel();
    menuLoadDiv.flipVis();
    
  });
  menuLoad.div = menuBarDiv;
  menuLoad.create();

  const menuLoadDiv = new Element('div', '', 'Load Map from File', 'menuLoadDiv', `1px`, `calc(100% - 450px)`, `298px`, `300px`, 'norm text', '');
  menuLoadDiv.div = menuBarDiv2;
  menuLoadDiv.create();
  
  const menuLoadFile = new Element('input', 'file', 'Map File', 'menuLoadFile', `10%`, `40px`, `80%`, `50px`, 'norm', function() {
    
    document.getElementById('menuLoadFileLabelText').innerHTML = menuLoadFile.getVal().split('\\')[menuLoadFile.getVal().split('\\').length - 1];
    
  });
  menuLoadFile.div = menuLoadDiv;
  menuLoadFile.create();
  menuLoadFile.addAttribute('accept', '.json');
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
      mapDiv.show(1, [toolBarDiv, mapFactionsDiv, mapFactionsNewDiv, mapFactionsEditDiv, mapSettingsDiv, mapImageDiv]);
      undoButton.show();
      redoButton.show();
      flipMove.show();
      
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
    
    menuOptions.flipSel();
    menuOptionsDiv.flipVis();
    
  });
  menuOptions.div = menuBarDiv;
  menuOptions.create();
  
  const menuOptionsDiv = new Element('div', '', 'Options', 'menuOptionsDiv', `1px`, `1px`, `calc(100% - 2px)`, `calc(100% - 50px)`, 'norm text', '');
  menuOptionsDiv.div = menuBarDiv2;
  menuOptionsDiv.create();
  
  const menuThemesText = new Element('p', '', 'Themes', 'menuThemesText', `10%`, `22px`, `80%`, `150px`, 'light', '');
  menuThemesText.div = menuOptionsDiv;
  menuThemesText.create();
  document.getElementById('menuThemesText').style.textAlign = 'center';
  
  const menuThemesDiv = new Element('div', '', '', 'menuThemesDiv', `10%`, `60px`, `80%`, `160px`, 'norm text', '');
  menuThemesDiv.div = menuOptionsDiv;
  menuThemesDiv.create();
  
  const menuOptionsBasic = new Element('button', '', 'Basic', 'menuOptionsBasic', `10%`, `10px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsBasic.select();
    
    document.getElementById('theme').setAttribute('href', 'basic.css');
    
    localStorage.setItem('selected_theme', 'basic.css');
    
    theme = 'basic';
    
    refreshMonoImages();
    
  });
  menuOptionsBasic.div = menuThemesDiv;
  menuOptionsBasic.create();
  
  const menuOptionsDark = new Element('button', '', 'Dark', 'menuOptionsDark', `10%`, `60px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsDark.select();
    
    document.getElementById('theme').setAttribute('href', 'dark.css');
    
    localStorage.setItem('selected_theme', 'dark.css');
    
    theme = 'dark';
    
    refreshMonoImages();
    
  });
  menuOptionsDark.div = menuThemesDiv;
  menuOptionsDark.create();
  
  const menuOptionsCoolDark = new Element('button', '', 'Cool Dark', 'menuOptionsCoolDark', `10%`, `110px`, `80%`, `50px`, 'norm', function() {
    //action func
    
    menuThemesDiv.deselect(-1);
    menuOptionsCoolDark.select();
    
    document.getElementById('theme').setAttribute('href', 'coolDark.css');
    
    localStorage.setItem('selected_theme', 'coolDark.css');
    
    theme = 'coolDark';
    
    refreshMonoImages();
    
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
      
    case 'coolDark.css':
      menuOptionsCoolDark.select();
      
      theme = 'coolDark';
      
  }
  
  const menuOptionsSwitch = new Element('button', '', 'Switch to Mobile UI', 'menuOptionsSwitch', `5%`, `250px`, `90%`, `50px`, 'norm', function() {
    //action func
    
    system = 'mobile';
    
    clearAllUI();
    initializeUIMobile();
    
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
  
  
  //  map  //
  
  
  const mapDiv = new Element('div', '', '', 'mapDiv', '0px', '0px', '100%', '100%', 'transparent', '');
  mapDiv.create();
  
  const undoButton = new Element('button', '', '', 'undoButton', '0px', 'calc(100% - 50px)', '50px', '50px', 'norm gray', function() {
    //action func
    if (undoMoves.length > 0) {
      undo();
    }
    
  });
  undoButton.div = mapDiv;
  undoButton.create();
  
  undoButton.setHTML(`<img src="undoarrow.png" class="mono" width="50px" height="50px" style="right: 7px;" draggable="false">`);
  
  const redoButton = new Element('button', '', '', 'redoButton', '50px', 'calc(100% - 50px)', '50px', '50px', 'norm gray', function() {
    //action func
    if (redoMoves.length > 0) {
      redo();
    }
    
  });
  redoButton.div = mapDiv;
  redoButton.create();
  
  redoButton.setHTML(`<img src="redoarrow.png" class="mono" width="50px" height="50px" style="right: 4px; top: 0.25px;" draggable="false">`);
  
  const zoomSlider = new Element('input', 'range', '', 'zoomSlider', '-135px', '300px', '300px', '30px', 'norm vertical', function() {
    
    grid.zoomTo = parseFloat(zoomSlider.getVal());
    
  });
  zoomSlider.div = mapDiv;
  zoomSlider.create();
  document.getElementById('zoomSlider').setAttribute('min', 0.05);
  document.getElementById('zoomSlider').setAttribute('max', 10);
  document.getElementById('zoomSlider').setAttribute('step', 0.05);
  
  const zoomIcon = new Element('img', '', '', 'zoomIcon', '3px', '470px', '30px', '30px', 'mono', '');
  zoomIcon.div = mapDiv;
  zoomIcon.create();
  document.getElementById('zoomIcon').setAttribute('src', 'zoomIcon.png');
  document.getElementById('zoomIcon').setAttribute('draggable', 'false');

  const toolBar = new Element('button', '', 'Tools > Pen', 'toolBar', '0px', '0px', 'calc(25% - 30px)', '30px', 'norm', function() {
    //action func
    toolBar.flipSel();
    toolBarDiv.flipVis();
    
  });
  toolBar.div = mapDiv;
  toolBar.create();

  const flipMove = new Element('button', '', '<img class="mono" src="tool_FlipMove.png" href="FlipMove" width="25px" height="25px" style="top: 2px; left: -3px;" draggable="false">', 'flipMove', 'calc(25% - 30px)', '0px', '30px', '30px', 'norm', function() {
    //action func
    flipMoveFunc();
    
  });
  flipMove.div = mapDiv;
  flipMove.create();

  const toolBarDiv = new Element('div', '', '', 'toolBarDiv', '0px', '30px', '25%', '30px', 'norm', '');
  toolBarDiv.div = mapDiv;
  toolBarDiv.create();

  const penSelect = new Element('button', '', '<img class="mono" src="tool_Pen.png" href="Pen" width="25px" height="25px" style="top: 2px;" draggable="false">', 'penSelect', '0px', '0px', '25%', '30px', 'norm', function() {
    //action func
    changeTool('Pen');
    
  });
  penSelect.div = toolBarDiv;
  penSelect.create();
  penSelect.setcss('selected');

  const eraseSelect = new Element('button', '', '<img class="mono" src="tool_Erase.png" href="Erase" width="25px" height="25px" style="top: 2px;" draggable="false">', 'eraseSelect', '25%', '0px', '25%', '30px', 'norm', function() {
    //action func
    changeTool('Erase');
    
  });
  eraseSelect.div = toolBarDiv;
  eraseSelect.create();
  
  const fillSelect = new Element('button', '', '<img class="mono" src="tool_Fill.png" href="Fill" width="25px" height="25px" style="top: 2px;" draggable="false">', 'fillSelect', '50%', '0px', '25%', '30px', 'norm', function() {
    //action func
    changeTool('Fill');
    
  });
  fillSelect.div = toolBarDiv;
  fillSelect.create();
  
  const moveSelect = new Element('button', '', '<img class="mono" src="tool_Move.png" href="Move" width="25px" height="25px" style="top: 2px;" draggable="false">', 'moveSelect', '75%', '0px', '25%', '30px', 'norm', function() {
    //action func
    changeTool('Move');
    
  });
  moveSelect.div = toolBarDiv;
  moveSelect.create();

  const mapImage = new Element('button', '','Image Conversion', 'mapImage', '25%', '0px', '25%', '30px', 'norm', function() {
    //action func
    mapImage.flipSel();
    mapImageDiv.flipVis();
    
    mapSettings.deselect();
    mapSettingsDiv.hide(-1);
    
  });
  mapImage.div = mapDiv;
  mapImage.create();
  
  const mapSettings = new Element('button', '','Settings', 'mapSettings', '50%', '0px', '25%', '30px', 'norm', function() {
    //action func
    mapSettings.flipSel();
    mapSettingsDiv.flipVis();
    
    mapImage.deselect();
    mapImageDiv.hide(-1);
    
  });
  mapSettings.div = mapDiv;
  mapSettings.create();
  
  const mapFactions = new Element('button', '', '<span class="hex1" style="color: #ffffff; left: 5px; top: -11px;"></span>&nbsp;Factions', 'mapFactions', '75%', '0px', '25%', '30px', 'norm', function() {
    //action func
    mapFactions.flipSel();
    mapFactionsDiv.flipVis();
    mapFactionsNewDiv.flipVis();
    mapFactionsEditDiv.hide(-1);
    
    let es = document.getElementsByName('facEditButton');
    
    for (let i = 0; i < es.length; i++) {
      
      es[i].setAttribute('class', 'norm');
      
    }
    
  });
  mapFactions.div = mapDiv;
  mapFactions.create();
  
  const mapFactionsDiv = new Element('div', '','Factions List', 'mapFactionsDiv', 'calc(100% - 400px)', '30px', '400px', 'calc(100% - 280px)', 'norm text', '');
  mapFactionsDiv.div = mapDiv;
  mapFactionsDiv.create();
  
  const mapFactionsBottomText = new Element('p', '', '^', 'mapFactionsBottomText', 'calc(50% - 7px)', '30px', '30px', '30px', 'light', '');
  mapFactionsBottomText.div = mapFactionsDiv;
  mapFactionsBottomText.create();
  
  const mapFactionsNewDiv = new Element('div', '','Add Faction', 'mapFactionsNewDiv', 'calc(100% - 400px)', 'calc(100% - 250px)', '400px', '245px', 'norm text', '');
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
  
  const mapFactionsNewColor = new Element('input', 'color', 'Color:&nbsp;', 'mapFactionsNewColor', '75px', '150px', '50px', '30px', 'norm', function() {
    
    mapFactionsNewColorCode.setVal(mapFactionsNewColor.getVal().split('#')[1]);
    
  });
  mapFactionsNewColor.div = mapFactionsNewDiv;
  mapFactionsNewColor.create();
  
  const mapFactionsNewGo = new Element('button', '', 'Create', 'mapFactionsNewGo', '10%', '200px', '80%', '30px', 'norm', function() {
    
    if (mapFactionsNewColorCode.getVal().length >= 6 && mapFactionsNewName.getVal().length > 0 && mapFactionsNewAbb.getVal().length > 0) {
      
      let newfac = new Faction(`${whitelistChars('0-9a-fA-F', mapFactionsNewColorCode.getVal().substring(0, 6)).toLowerCase()}`, '000000', mapFactionsNewName.getVal(), mapFactionsNewAbb.getVal());
      newfac.create();
      
      mapFactionsDiv.show(-1);
      
    }
    
  });
  mapFactionsNewGo.div = mapFactionsNewDiv;
  mapFactionsNewGo.create();
  
  const mapFactionsEditDiv = new Element('div', '','Editing ', 'mapFactionsEditDiv', 'calc(100% - 400px)', 'calc(100% - 250px)', '400px', '245px', 'norm text', '');
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
  
  const mapFactionsEditColor = new Element('input', 'color', 'Color:&nbsp;', 'mapFactionsEditColor', '75px', '150px', '50px', '30px', 'norm', function() {
    
    mapFactionsEditColorCode.setVal(mapFactionsEditColor.getVal().split('#')[1]);
    
  });
  mapFactionsEditColor.div = mapFactionsEditDiv;
  mapFactionsEditColor.create();
  
  const mapFactionsEditGo = new Element('button', '', 'Save Edits', 'mapFactionsEditGo', '10%', '200px', '80%', '30px', 'norm', function() {
    
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
  
  const mapImageDiv = new Element('div', '', 'Image Conversion', 'mapImageDiv', 'calc(50% - 250px)', '100px', '500px', '80%', 'norm text', '');
  mapImageDiv.div = mapDiv;
  mapImageDiv.create();

  const mapImageKeySide = new Element('button', '', 'Key at Side', 'mapImageKeySide', '10%', '40px', '40%', '30px', 'norm gray', function() {
    /*
    mapImageKeySide.select();
    mapImageKeyOn.deselect();
    
    mapImageKeySideDiv.show(-1);
    mapImageKeyOnDiv.hide(-1);
    */
    
  });
  mapImageKeySide.div = mapImageDiv;
  mapImageKeySide.create();
  mapImageKeySide.setTip('Faction information will be displayed in a sidebar (currently inoperable)');
  
  const mapImageKeyOn = new Element('button', '', 'Key Overlay', 'mapImageKeyOn', '50%', '40px', '40%', '30px', 'norm', function() {
    
    mapImageKeyOn.select();
    mapImageKeySide.deselect();
    
    mapImageKeyOnDiv.show(-1);
    mapImageKeySideDiv.hide(-1);
    
  });
  mapImageKeyOn.div = mapImageDiv;
  mapImageKeyOn.create();
  mapImageKeyOn.select();
  mapImageKeyOn.setTip('Faction abbreviations will be displayed directly on top of owned territory');
  
  const mapImageKeySideDiv = new Element('div', '', '', 'mapImageKeySideDiv', '10%', '80px', '80%', '200px', 'norm', '');
  mapImageKeySideDiv.div = mapImageDiv;
  mapImageKeySideDiv.create();
  
  const mapImageKeyOnDiv = new Element('div', '', '', 'mapImageKeyOnDiv', '10%', '80px', '80%', '200px', 'norm', '');
  mapImageKeyOnDiv.div = mapImageDiv;
  mapImageKeyOnDiv.create();
  
  const mapImageKeyOnMinFont = new Element('input', 'number', 'Min Faction Name Size: &nbsp;', 'mapImageKeyOnMinFont', '180px', '20px', '100px', '30px', 'norm', function() {
    
    if (mapImageKeyOnMinFont.getVal() == '') {
      mapImageKeyOnMinFont.setVal(1);
    }
    
    if (parseInt(mapImageKeyOnMinFont.getVal()) < 1) {
      mapImageKeyOnMinFont.setVal(1);
    }
    
    if (parseInt(mapImageKeyOnMinFont.getVal()) > 256) {
      mapImageKeyOnMinFont.setVal(256);
    }
    
    if (parseInt(mapImageKeyOnMinFont.getVal()) > parseInt(mapImageKeyOnMaxFont.getVal())) {
      mapImageKeyOnMaxFont.setVal(parseInt(mapImageKeyOnMinFont.getVal()));
    }
    
    
    
  });
  mapImageKeyOnMinFont.div = mapImageKeyOnDiv;
  mapImageKeyOnMinFont.create();
  mapImageKeyOnMinFont.setVal(16);
  
  const mapImageKeyOnMaxFont = new Element('input', 'number', 'Max Faction Name Size: &nbsp;', 'mapImageKeyOnMaxFont', '180px', '60px', '100px', '30px', 'norm', function() {
    
    if (mapImageKeyOnMaxFont.getVal() == '') {
      mapImageKeyOnMaxFont.setVal(1);
    }
    
    if (parseInt(mapImageKeyOnMaxFont.getVal()) < 1) {
      mapImageKeyOnMaxFont.setVal(1);
    }
    
    if (parseInt(mapImageKeyOnMaxFont.getVal()) > 256) {
      mapImageKeyOnMaxFont.setVal(256);
    }
    
    if (parseInt(mapImageKeyOnMaxFont.getVal()) < parseInt(mapImageKeyOnMinFont.getVal())) {
      mapImageKeyOnMinFont.setVal(parseInt(mapImageKeyOnMaxFont.getVal()));
    }
    
    
    
  });
  mapImageKeyOnMaxFont.div = mapImageKeyOnDiv;
  mapImageKeyOnMaxFont.create();
  mapImageKeyOnMaxFont.setVal(32);
  
  mapImageKeySideDiv.hide(-1);
  
  const mapImageSizeX = new Element('input', 'number', 'Image Resolution: &nbsp;', 'mapImageSizeX', '160px', '320px', '100px', '30px', 'norm', function() {
    
    
    
  });
  mapImageSizeX.div = mapImageDiv;
  mapImageSizeX.create();
  mapImageSizeX.setVal(1960);
  
  const mapImageSizeY = new Element('input', 'number', 'x &nbsp;', 'mapImageSizeY', '290px', '320px', '100px', '30px', 'norm', function() {
    
    
    
  });
  mapImageSizeY.div = mapImageDiv;
  mapImageSizeY.create();
  mapImageSizeY.setVal(1080);
  
  const mapImageDownloadKey = new Element('button', '', 'Download Image With Map Key', 'mapImageDownloadKey', '10%', '360px', '80%', '30px', 'norm', function() {
    
    
    
  });
  mapImageDownloadKey.div = mapImageDiv;
  mapImageDownloadKey.create();
  
  const mapImageDownloadNorm = new Element('button', '', 'Download Image Without Key', 'mapImageDownloadNorm', '10%', '400px', '80%', '30px', 'norm', function() {
    
    let width = parseInt(mapImageSizeX.getVal());
    let height = parseInt(mapImageSizeY.getVal());
    
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvas.style.width = `${width}px`;
    tempCanvas.style.height = `${height}px`;
    
    let depth = grid.width > grid.height ? (grid.width - 1) * hexConst.size * 1.5 : (grid.height - 1) * hexConst.apothem * 2;
    
    let realSize = width > height ? width / depth : height / depth;
    /*
    if (backgroundImage.img != 'none') {
      
      let im = new Image();
      im.src = backgroundImage.img.src;
      im.crossOrigin = 'anonymous';
      
      q.drawImage(im, 0, 0, backgroundImage.width * realSize * backgroundImage.scaleX, backgroundImage.height * realSize * backgroundImage.scaleY);
      
      
      
    }
    */
    
    let hexOpacityD = 0.69;
    let borderModeD = 'norm';
    
    for (let i = 0; i < factions.length; i++) {
      
      tempCanvasCtx.beginPath();
      
      for (let j = 0; j < factions[i].hexes.length; j++) {
        
        let hex = factions[i].hexes[j];
        
        let ps = hex.getPoints(hexConst.size);
        
        let sx = ps[0][0] * realSize;
        let sy = ps[0][1] * realSize;
        
        tempCanvasCtx.moveTo(sx, sy);
        
        for (let k = 1; k < ps.length; k++) {
          
          tempCanvasCtx.lineTo(ps[k][0] * realSize, ps[k][1] * realSize);
          
        }
        
      }
      
      let fc = hexToRGB(factions[i].fill);
      
      tempCanvasCtx.fillStyle = `rgba(${fc.r}, ${fc.g}, ${fc.b}, ${hexOpacityD})`;
      
      tempCanvasCtx.fill();
      
    }
    
    tempCanvasCtx.strokeStyle = grid.getStrokeColor();
    tempCanvasCtx.lineWidth = 2;
    
    if (borderModeD == 'norm') {
      tempCanvasCtx.beginPath();
      
      for (let x = 0; x < grid.width; x++) {
        
        for (let y = 0; y < grid.height; y++) {
          
          let hex = grid.hexes[x][y];
          
          let ps = hex.getPoints(hexConst.size);
          
          let sx = ps[0][0] * realSize;
          let sy = ps[0][1] * realSize;
          
          tempCanvasCtx.moveTo(sx, sy);
          
          for (let k = 1; k < ps.length; k++) {
            
            tempCanvasCtx.lineTo(ps[k][0] * realSize, ps[k][1] * realSize);
            
          }
          
        }
        
      }
      
      tempCanvasCtx.stroke();
      
    } else if (borderModeD == 'border') {
      
      tempCanvasCtx.beginPath();
      
      for (let i = 0; i < factions.length; i++) {
        
        for (let j = 0; j < factions[i].hexes.length; j++) {
          
          let hex = factions[i].hexes[j];
          
          let ps = hex.getPoints(hexConst.size);
          
          for (let k = 1; k <= 6; k++) {
            
            if (grid.borders[hex.x][hex.y][k - 1] == 1) {
              
              tempCanvasCtx.moveTo(ps[k - 1][0] * grid.zoom + grid.x, ps[k - 1][1] * grid.zoom + grid.y);
              tempCanvasCtx.lineTo(ps[k][0] * grid.zoom + grid.x, ps[k][1] * grid.zoom + grid.y);
              
            }
            
          }
          
        }
        
        tempCanvasCtx.stroke();
        
      }
      
    }
    
    let a = document.createElement('a');
    
    a.onclick = function() {
      
      let dt = tempCanvas.toDataURL('image/png');
      
      dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      
      dt = dt.replace(/^data:application\/octet-stream/, `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=${grid.name}.png`);
      
      this.href = dt;
      
    }
    
    a.click();
    
    a.remove();
    
  });
  mapImageDownloadNorm.div = mapImageDiv;
  mapImageDownloadNorm.create();
  
  const mapSettingsDiv = new Element('div', '', 'Map Settings', 'mapSettingsDiv', 'calc(50% - 250px)', '100px', '500px', '80%', 'norm text', '');
  mapSettingsDiv.div = mapDiv;
  mapSettingsDiv.create();
  
  const mapSettingsDownloadName = new Element('input', 'text', 'Map Name:&nbsp;', 'mapSettingsDownloadName', '30%', '40px', '60%', '30px', 'norm', function() {
    //action func
    grid.name = mapSettingsDownloadName.getVal();
    
  });
  mapSettingsDownloadName.div = mapSettingsDiv;
  mapSettingsDownloadName.create();
  mapSettingsDownloadName.setVal('map');
  
  const mapSettingsDownloadGo = new Element('button', 'submit', 'Download Map File', 'mapSettingsDownloadGo', '10%', '80px', '80%', '30px', 'norm', function() {
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
  
  const mapSettingsOutlineText = new Element('p', '', 'Outline Style', 'mapSettingsOutlineText', '0%', '102px', '100%', '30px', 'norm', '');
  mapSettingsOutlineText.div = mapSettingsDiv;
  mapSettingsOutlineText.create();
  document.getElementById('mapSettingsOutlineText').style.textAlign = 'center';
  
  const mapSettingsGridStroke = new Element('input', 'color', 'Color:&nbsp;', 'mapSettingsGridStroke', '30%', '140px', '60%', '30px', 'norm', function() {
    //action func
    let color = hexToRGB(mapSettingsGridStroke.getVal());
    
    grid.stroke.r = color.r;
    grid.stroke.g = color.g;
    grid.stroke.b = color.b;
    
  });
  mapSettingsGridStroke.div = mapSettingsDiv;
  mapSettingsGridStroke.create();
  
  const mapSettingsOutlineAll = new Element('button', '', 'All', 'mapSettingsOutlineAll', '12.5%', '180px', '25%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.select();
    mapSettingsOutlineBorder.deselect();
    mapSettingsOutlineNone.deselect();
    
    outline = 'norm';
    
  });
  mapSettingsOutlineAll.div = mapSettingsDiv;
  mapSettingsOutlineAll.create();
  mapSettingsOutlineAll.select();
  
  const mapSettingsOutlineBorder = new Element('button', '', 'Borders', 'mapSettingsOutlineBorder', '37.5%', '180px', '25%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.deselect();
    mapSettingsOutlineBorder.select();
    mapSettingsOutlineNone.deselect();
    
    outline = 'border';
    
  });
  mapSettingsOutlineBorder.div = mapSettingsDiv;
  mapSettingsOutlineBorder.create();
  
  const mapSettingsOutlineNone = new Element('button', '', 'None', 'mapSettingsOutlineNone', '62.5%', '180px', '25%', '30px', 'norm', function() {
    
    mapSettingsOutlineAll.deselect();
    mapSettingsOutlineBorder.deselect();
    mapSettingsOutlineNone.select();
    
    outline = 'none';
    
  });
  mapSettingsOutlineNone.div = mapSettingsDiv;
  mapSettingsOutlineNone.create();
  
  const mapSettingsOutlineOpacity = new Element('input', 'range', 'Outline Opacity: 100%&nbsp;', 'mapSettingsOutlineOpacity', '50%', '220px', '150px', '30px', 'norm slider', function() {
    
    let a = parseInt(mapSettingsOutlineOpacity.getVal());

    grid.stroke.a = a / 100;
    document.getElementById(`mapSettingsOutlineOpacityLabel`).innerHTML = `Outline Opacity: ${a}%&nbsp;`;
    
  });
  mapSettingsOutlineOpacity.div = mapSettingsDiv;
  mapSettingsOutlineOpacity.create();
  mapSettingsOutlineOpacity.setVal(100);
  mapSettingsOutlineOpacity.setCursor('pointer');
  document.getElementById(`mapSettingsOutlineOpacity`).min = 0;
  document.getElementById(`mapSettingsOutlineOpacity`).max = 100;
  
  const mapSettingsFillOpacity = new Element('input', 'range', 'Fill Opacity: 100%&nbsp;', 'mapSettingsFillOpacity', '50%', '260px', '150px', '30px', 'norm slider', function() {
    
    let a = parseInt(mapSettingsFillOpacity.getVal());

    grid.hexOpacity = a / 100;
    document.getElementById(`mapSettingsFillOpacityLabel`).innerHTML = `Fill Opacity: ${a}%&nbsp;`;
    
  });
  mapSettingsFillOpacity.div = mapSettingsDiv;
  mapSettingsFillOpacity.create();
  mapSettingsFillOpacity.setVal(100);
  mapSettingsFillOpacity.setCursor('pointer');
  document.getElementById(`mapSettingsFillOpacity`).min = 0;
  document.getElementById(`mapSettingsFillOpacity`).max = 100;
  
  const mapSettingsImage = new Element('input', 'text', 'Background Image URL:&nbsp;', 'mapSettingsImage', '45%', '315px', '50%', '30px', 'norm', function() {
    
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
  
  const mapSettingsImageScaleX = new Element('input', 'number', 'Scale X:&nbsp;', 'mapSettingsImageScaleX', '25%', '370px', '20%', '30px', 'norm', function() {
    
    backgroundImage.scaleX = parseFloat(mapSettingsImageScaleX.getVal());
    
  });
  mapSettingsImageScaleX.div = mapSettingsDiv;
  mapSettingsImageScaleX.create();
  mapSettingsImageScaleX.setVal(1);
  
  const mapSettingsImageScaleY = new Element('input', 'number', 'Scale Y:&nbsp;', 'mapSettingsImageScaleY', '70%', '370px', '20%', '30px', 'norm', function() {
    
    backgroundImage.scaleY = parseFloat(mapSettingsImageScaleY.getVal());
    
  });
  mapSettingsImageScaleY.div = mapSettingsDiv;
  mapSettingsImageScaleY.create();
  mapSettingsImageScaleY.setVal(1);
  
  const mapSettingsImageClear = new Element('button', '', 'Clear background Image', 'mapSettingsImageClear', '10%', '410px', '80%', '30px', 'norm', function() {
    //action func
    mapSettingsImage.setVal('');
    backgroundImage.img = 'none';
    
  });
  mapSettingsImageClear.div = mapSettingsDiv;
  mapSettingsImageClear.create();

  const mapSettingsExit = new Element('button', '', 'Exit to Main Menu', 'mapSettingsExit', '10%', 'calc(100% - 40px)', '80%', '30px', 'norm', function() {
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