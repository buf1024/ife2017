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
var preElm = [];
var midElm = [];
var postElm = [];

var timer = -1;
var traElms;
var index = 0;

function order() {
  for(var i=0; i<traElms.length; i++) {
    traElms[i].style.background = "";
  }
  if(index == traElms.length) {
    clearInterval(timer);
    timer = -1;
    return;
  }else{
    traElms[index].style.background = "red";
    index++;
  }
}
function stop() {
  for(var i=0; i<traElms.length; i++) {
    traElms[i].style.background = "";
  }
  clearInterval(timer);
  timer = -1;
  index++;
}

function preOrder() {
  if(timer != -1) {
    alert("正在遍历，等遍历后再试")
    return;
  }
  index = 0;
  traElms = preElm;
  timer = setInterval(order, 500);
}
function midOrder() {
  if(timer != -1) {
    alert("正在遍历，等遍历后再试")
    return;
  }
  index = 0;
  traElms = midElm;
  timer = setInterval(order, 500);
}
function postOrder() {
  if(timer != -1) {
    alert("正在遍历，等遍历后再试")
    return;
  }
  index = 0;
  traElms = postElm;
  timer = setInterval(order, 500);
}

function addPreOrderElm(elm) {
  if(elm.childElementCount > 0){
    preElm.push(elm);
    addPreOrderElm(elm.firstElementChild);
    addPreOrderElm(elm.lastElementChild);
  }else {
    preElm.push(elm);
  }
}


function addMidOrderElm(elm) {
  if(elm.childElementCount > 0){
    addMidOrderElm(elm.firstElementChild);
    midElm.push(elm);
    addMidOrderElm(elm.lastElementChild);
  }else {
    midElm.push(elm);
  }
}
function addPostOrderElm(elm) {
  if(elm.childElementCount > 0){
    addPostOrderElm(elm.firstElementChild);
    addPostOrderElm(elm.lastElementChild);
    postElm.push(elm);
  }else {
    postElm.push(elm);
  }
}

function setUp() {
  var elm = document.querySelector(".root");
  addPreOrderElm(elm);
  addMidOrderElm(elm);
  addPostOrderElm(elm);
}

function init() {
  EventUtil.addHandler(
    document.querySelector("#preOrder"),
    'click', preOrder);

  EventUtil.addHandler(
    document.querySelector("#midOrder"),
    'click', midOrder); 

  EventUtil.addHandler(
    document.querySelector("#postOrder"),
    'click', postOrder); 

  EventUtil.addHandler(
    document.querySelector("#stop"),
    'click', stop); 

  setUp();
}

init();
