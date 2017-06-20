"use strict";

var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
};

var elms = [];
var elmsel = null;



function delclick() {
  if(elmsel != null) {
    elmsel.remove();
    elms = [];
    setUp(); 
  }
}

function addclick() {
  var elm = document.querySelector("#addtext");
  
  var text = elm.value;
  if(text.length > 0) {
    if(elms.length == 0) {
      elmsel = document.querySelector(".container")
    }
    if (elmsel == null) {
      return;
    }
    var newElm = document.createElement("div");
    var textElm = document.createTextNode(text);
    newElm.appendChild(textElm);
    newElm.style.background = "white";
   
    if(elms.length > 0) {
      newElm.setAttribute("class", "leaf");
      var selCls = elmsel.getAttribute("class");
      if(selCls == "leaf") {
        elmsel.setAttribute("class", "node");
      }
      elmsel.appendChild(newElm);
    }else{
      newElm.setAttribute("class", "root");
      var beforeElm = document.querySelector(".input")
      var parent = beforeElm.parentNode;
      parent.insertBefore(newElm, beforeElm);
      elmsel = null;
    }
    elms = [];
    setUp();
  }
}

function addkeydown(event) {
    if(event.keyCode == 13) {
      addclick();
    }
}

function setupElm(elm) {
    elms.push(elm);
    EventUtil.addHandler(
      elm, 'click', function (event) {
        var nodelm = event.currentTarget;
        elmsel = nodelm;
        for(var i=0; i<elms.length; i++) {
          elms[i].style.background = "white";
        }
        nodelm.style.background = "blue";
        event.stopPropagation();
    });
}

function addElm(elm) {
  if(elm.childElementCount > 0){
    setupElm(elm);
    elm = elm.firstElementChild;
    while(elm != null) {
      addElm(elm);
      elm = elm.nextElementSibling
    }
  }else {
    setupElm(elm);
  }
}

function setUp() {
  var elm = document.querySelector(".root");
  if(elm != null) {
    addElm(elm);
  }
}

function init() {
  EventUtil.addHandler(
    document.querySelector("#addbtn"),
    'click', addclick);

  EventUtil.addHandler(
    document.querySelector("#addtext"),
    'keydown', addkeydown );
  
  EventUtil.addHandler(
    document.querySelector("#delbtn"),
    'click', delclick);

  setUp();
}


init();
