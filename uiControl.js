// control html elements with functions and stuff

let uiElems = [];
let elemFuncs = [];
let constFuncs = [];

function runConstFuncs() {
  for (let i = 0; i < constFuncs.length; i++) {
    constFuncs[i]();
  }
}

class Element {
  constructor(elem, type, text, id, x, y, width, height, cssClass, func) {
    this.x = x;
    this.y = y;
    this.cx = 0;
    this.cy = 0;
    this.width = width;
    this.height = height;
    this.elem = elem;
    this.type = type;
    this.func = func;
    this.text = text;
    this.id = id;
    this.div = 0;
    this.cssClass = cssClass;
    this.constFunc = '';
  }
  
  create() {
    
    uiElems.push(this);
    
    let elem = document.createElement(this.elem);
    
    if (this.id != 0 && this.id != '') {
      elem.setAttribute('id', this.id);
      elem.setAttribute('autocomplete', 'off');
    }
    
    let label = 0;
    
    switch (this.elem) {
      case 'button':
        
        elem.innerHTML = this.text;
        
        if (this.func != 0 && this.func != '') {
          elemFuncs.push(this.func);
          
          elem.setAttribute('onclick', `elemFuncs[${elemFuncs.length - 1}]()`);
        }
        
        break;
      case 'input':
        
        elem.style.cursor = 'text';
        
        if (this.type != '') {
          elem.setAttribute('type', this.type);
        }
        
        if (this.func != '') {
          elemFuncs.push(this.func);
          
          elem.setAttribute('oninput', `elemFuncs[${elemFuncs.length - 1}]()`);
        }
        
        if (this.id != '') {
          
          label = document.createElement('label');
          
          label.setAttribute('id', `${this.id}Label`);

          label.setAttribute('for', `${this.id}`);
          
          label.innerHTML = this.text;
          
        }
        
        break;
      case 'p' || 'span':
        
        //let pt = document.createTextNode(this.text);
        
        //elem.appendChild(pt);
        
        elem.innerHTML = this.text;
        
        break;
      case 'div':
        
        elem.innerHTML = this.text;
        elem.style.textAlign = 'center';
        
        break;
    }
    
    elem.style.position = 'absolute';
    
    elem.style.left = this.x;
    elem.style.top = this.y;
    
    elem.style.width = this.width;
    elem.style.height = this.height;
    
    if (this.elem == 'div') {
      elem.style.maxWidth = this.width;
      elem.style.maxHeight = this.height;
      elem.style.overflow = 'auto';
    }
    
    elem.setAttribute('class', `noselect ${this.cssClass}`);
    elem.style.visibility = 'hidden';
    
    if (this.div == '') {
      if (label != '') {
        
        div.appendChild(elem);
        div.appendChild(label);
        
        label.style.top = `${elem.offsetTop + (elem.clientHeight / 2) - (label.offsetHeight / 2)}px`;
        
        label.style.left = `${elem.offsetLeft - (label.clientWidth)}px`;
        
      } else {
        
        div.appendChild(elem);
        
      }
    } else if (!this.div.hasOwnProperty('id')) {
      
      if (label != 0) {
        
        this.div.appendChild(elem);
        this.div.appendChild(label);
        
        label.style.top = `${elem.offsetTop + (elem.clientHeight / 2) - (label.offsetHeight / 2)}px`;
        
        label.style.left = `${elem.offsetLeft - (label.clientWidth)}px`;
        
      } else {
        
        this.div.appendChild(elem);
        
      }
      
    } else {
      
      if (label != 0) {
        
        document.getElementById(this.div.id).appendChild(elem);
        document.getElementById(this.div.id).appendChild(label);
        
        label.style.top = `${elem.offsetTop + (elem.clientHeight / 2) - (label.offsetHeight / 2)}px`;
        
        label.style.left = `${elem.offsetLeft - (label.clientWidth)}px`;
        
      } else {
        
        document.getElementById(this.div.id).appendChild(elem);
        
      }
      
    }
    
    
  }

  hide(layers, exceptions, includeExceptionChildren) {
    
    let el = document.getElementById(this.id);
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    let change = [el];
    
    function changeVis(els) {
      
      let childrenChange = [];
      
      for (let i = 0; i < els.length; i++) {
        
        let p = els[i];

        let isException = false;
        for (let j = 0; j < exceptions.length; j++) {
          if (p.id == exceptions[j].id) {
            isException = true;
            break;
          }
        }

        if (!includeExceptionChildren && isException) {
          break;
        }
        
        if (!isException) {
          p.style.visibility = 'hidden';
        
          if (p.nodeName == 'INPUT') {
            
            document.getElementById(`${p.id}Label`).style.visibility = 'hidden';
            
          }
        }
        
        if (layers != 0) {
          
          for (let k = 0; k < p.children.length; k++) {
            
            childrenChange.push(p.children[k]);
            
          }
          
        }
        
        
      }
      
      if (layers != 0 && childrenChange.length > 0) {
        layers--;
        changeVis(childrenChange);
      }
      
    }
    
    changeVis(change);
    
  }

  show(layers, exceptions, includeExceptionChildren) {
    
    let el = document.getElementById(this.id);
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    let change = [el];
    
    function changeVis(els) {
      
      let childrenChange = [];
      
      for (let i = 0; i < els.length; i++) {
        
        let p = els[i];

        let isException = false;
        for (let j = 0; j < exceptions.length; j++) {
          if (p.id == exceptions[j].id) {
            isException = true;
            break;
          }
        }

        if (!includeExceptionChildren && isException) {
          break;
        }
        
        if (!isException) {
          p.style.visibility = 'visible';
        
          if (p.nodeName == 'INPUT') {
            
            document.getElementById(`${p.id}Label`).style.visibility = 'visible';
            
          }
        }
        
        if (layers != 0) {
          
          for (let k = 0; k < p.children.length; k++) {
            
            childrenChange.push(p.children[k]);
            
          }
          
        }
        
        
      }
      
      if (layers != 0 && childrenChange.length > 0) {
        layers--;
        changeVis(childrenChange);
      }
      
    }
    
    changeVis(change);
    
  }
  
  getVis() {
    return document.getElementById(this.id).style.visibility;
  }
  
  isVis() {
    let v = document.getElementById(this.id).style.visibility;
    
    if (v == 'hidden' || v == 'none') {
      return false;
    } else {
      return true;
    }
    
  }
  
  setVis(v) {
    
    document.getElementById(this.id).style.visibility = v;
    
  }

  flipVis(layers, exceptions, includeExceptionChildren) {
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    if (document.getElementById(this.id).style.visibility == 'visible') {
      this.hide(layers, exceptions, includeExceptionChildren);
    } else {
      this.show(layers, exceptions, includeExceptionChildren);
    }
    
  }
  
  getHTML() {
    return document.getElementById(this.id).innerHTML;
  }
  
  setHTML(h) {
    document.getElementById(this.id).innerHTML = h;
  }
  
  getVal() {
    return document.getElementById(this.id).value;
  }
  
  setVal(val) {
    document.getElementById(this.id).value = val;
  }

  addAttribute(att, set) {
    document.getElementById(this.id).setAttribute(att, set);
  }

  setcss(css) {
    document.getElementById(this.id).setAttribute('class', `noselect ${css}`);
    this.cssClass = `${css}`;
  }

  replacecss(prev, css) {
    let el = document.getElementById(this.id);
    
    el.setAttribute('class', `${el.className.replace(prev, css)}`);
    
    this.cssClass = `${el.className.replace(prev, css)}`;
  }

  isSel() {
    
    if (document.getElementById(this.id).className.includes('norm')) {
      return false;
    } else {
      return true;
    }
    
  }

  flipSel(layers, exceptions, includeExceptionChildren) {
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    if (document.getElementById(this.id).className.includes('norm')) {
      this.select(layers, exceptions, includeExceptionChildren);
    } else {
      this.deselect(layers, exceptions, includeExceptionChildren);
    }
    
  }
  
  select(layers, exceptions, includeExceptionChildren) {
    
    let el = document.getElementById(this.id);
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    let change = [el];
    
    function changeVis(els) {
      
      let childrenChange = [];
      
      for (let i = 0; i < els.length; i++) {
        
        let p = els[i];

        let isException = false;
        for (let j = 0; j < exceptions.length; j++) {
          if (p.id == exceptions[j].id) {
            isException = true;
            break;
          }
        }

        if (!includeExceptionChildren && isException) {
          break;
        }
        
        if (!isException) {
          p.setAttribute('class', `${p.className.replace('norm', 'selected')}`);
        
          if (p.nodeName == 'INPUT') {
            
            document.getElementById(`${p.id}Label`).setAttribute('class', `${p.className.replace('norm', 'selected')}`);
            
          }
        }
        
        if (layers != 0) {
          
          for (let k = 0; k < p.children.length; k++) {
            
            childrenChange.push(p.children[k]);
            
          }
          
        }
        
        
      }
      
      if (layers != 0 && childrenChange.length > 0) {
        layers--;
        changeVis(childrenChange);
      }
      
    }
    
    changeVis(change);
    
  }
  
  deselect(layers, exceptions, includeExceptionChildren) {
    
    let el = document.getElementById(this.id);
    
    if (layers != 0) {
      layers = layers || -1;
    }

    exceptions = exceptions || [];
    
    if (!Array.isArray(exceptions)) {
      
      exceptions = [exceptions];
      
    }

    if (includeExceptionChildren != false) {
      includeExceptionChildren = true;
    }
    
    let change = [el];
    
    function changeVis(els) {
      
      let childrenChange = [];
      
      for (let i = 0; i < els.length; i++) {
        
        let p = els[i];

        let isException = false;
        for (let j = 0; j < exceptions.length; j++) {
          if (p.id == exceptions[j].id) {
            isException = true;
            break;
          }
        }

        if (!includeExceptionChildren && isException) {
          break;
        }
        
        if (!isException) {
          p.setAttribute('class', `${p.className.replace('selected', 'norm')}`);
        
          if (p.nodeName == 'INPUT') {
            
            document.getElementById(`${p.id}Label`).setAttribute('class', `${p.className.replace('selected', 'norm')}`);
            
          }
        }
        
        if (layers != 0) {
          
          for (let k = 0; k < p.children.length; k++) {
            
            childrenChange.push(p.children[k]);
            
          }
          
        }
        
        
      }
      
      if (layers != 0 && childrenChange.length > 0) {
        layers--;
        changeVis(childrenChange);
      }
      
    }
    
    changeVis(change);
    
  }

  setCursor(cursor) {
    document.getElementById(this.id).style.cursor = cursor;
  }

  addConstFunc(cf) {
    
    constFuncs.push(cf);
    
  }
  
  setTip(title) {
    document.getElementById(this.id).title = title;
  }
  
}

function refreshPos(elem) {
  
  if (!elem) {
    
    for (let i = 0; i < uiElems.length; i++) {
    
      document.getElementById(uiElems[i].id).style.left = uiElems[i].x;
      document.getElementById(uiElems[i].id).style.top = uiElems[i].y;
    
    }
    
  } else {
    
    document.getElementById(elem.id).style.left = elem.x;
    document.getElementById(elem.id).style.top = elem.y;
    
  }
  
  div.setAttribute('style', `width: 100%; height: 100%;`);
  
}

addEventListener('resize', (e) => {
  refreshPos();
});

function clearAllUI() {
  
  function removeChildren(elem) {
    for (let i = 0; i < elem.children.length; i++) {
      
      if (elem.children[i].className != 'tempCanvas' && elem.children[i].className != 'ctx' && elem.children[i].className != 'cursor') {
        
        elem.children[i].setAttribute('class', '');
        //elem.children[i].setAttribute('style', 'background-color: red;');
        
        elem.children[i].remove();
        
      }
      
      if (elem.children[i] && elem.children.length > 0 && elem.children[i].className != 'ctx' && elem.children[i].className != 'cursor') {
        removeChildren(elem);
      }
      
    }
  }
  
  removeChildren(div);
  
  uiElems = [];
  elemFuncs = [];
  constFuncs = [];
  
  //document.getElementById('canvasDiv').appendChild(tempCanvas);
  
}