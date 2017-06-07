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

var testData = [];

function render(data) {
  var elm = document.querySelector('.output')
  var children = elm.children;
  for (var i = 0; i < children.length; i++) {
    children.item(0).remove();
  }
  var html = '';
  for (var i = 0; i < data.length; i++) {
    html = html + '<p style="height: ' + data[i] +'%;"></p>';
  }
  elm.innerHTML = html;
}

function getValue() {
  var input = document.querySelector('#input');
  var pat = /^[1-9][0-9]$|^100$/;
  if(pat.test(input.value)) {
    return parseInt(input.value, 10);
  }
  return -1;
}

function leftIn(elm) {
  var val = getValue();
  if(val < 0) {
    alert('输入范围:10~100');
    return;
  }
  if(testData.length >= 60) {
    alert("超出长度60为极限");
    return;
  }
  testData.splice(0, 0, val);
  render(testData);
}
function leftOut() {
  if (testData.length > 0) {
    testData.splice(0, 1);
    render(testData);
  }
}
function rightIn() {
  var val = getValue();
  if(val < 0) {
    alert('输入范围:10~100');
    return;
  }
  if(testData.length >= 60) {
    alert("超出长度60为极限");
    return;
  }
  testData.push(val);
  render(testData);
}
function rightOut() {
  if (testData.length > 0) {
    testData.splice(testData.length-1, 1);
    render(testData);
  }
}


function init() {
  EventUtil.addHandler(
    document.querySelector("#left-in"),
    'click', leftIn);

  EventUtil.addHandler(
    document.querySelector("#left-out"),
    'click', leftOut);

  EventUtil.addHandler(
    document.querySelector("#right-in"),
    'click', rightIn);

  EventUtil.addHandler(
    document.querySelector("#right-out"),
    'click', rightOut);
}

init();
