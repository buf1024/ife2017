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

var timer = -1;
var elms = [];
var index = 0;
var text = "";

function find() {
  for(var i=0; i<elms.length; i++) {
    elms[i].style.background = "white";
  }
  if(index == elms.length) {
    clearInterval(timer);
    alert("text \"" +text + "\" not found");
    timer = -1;
    return;
  } else {
    elms[index].style.background = "red";
  }

  var nodeText = elms[index].firstChild.nodeValue;
  nodeText = nodeText.trim();
  if (nodeText == text) {
    elms[index].style.background = "green";
    clearInterval(timer);
    timer = -1;
  }
  index++;
}
function stop() {
  for(var i=0; i<elms.length; i++) {
    elms[i].style.background = "white";
  }
  clearInterval(timer);
  timer = -1;
}

function findtext() {
  if(timer != -1) {
    alert("正在遍历，等遍历后再试")
    return;
  }
  var elm = document.querySelector("#findtext");
  text = elm.value;
  index = 0;
  timer = setInterval(find, 500);
}

function findtextdown(event) {
    if(event.keyCode == 13) {
      findtext();
    }
}

function addOrderElm(elm) {
  if(elm.childElementCount > 0){
    elms.push(elm);

    elm = elm.firstElementChild;
    while(elm != null) {
      addOrderElm(elm);
      elm = elm.nextElementSibling
    }
  }else {
    elms.push(elm);
  }
}

function setUp() {
  var elm = document.querySelector(".root");
  addOrderElm(elm);
}

function init() {
  EventUtil.addHandler(
    document.querySelector("#findbtn"),
    'click', findtext);

  EventUtil.addHandler(
    document.querySelector("#findtext"),
    'keydown', findtextdown);
  
  EventUtil.addHandler(
    document.querySelector("#stop"),
    'click', stop);

  setUp();
}


init();
