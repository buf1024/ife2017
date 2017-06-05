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
    html = html + '<p>' + data[i] + '</p>';
  }
  elm.innerHTML = html;
}


function leftIn(elm) {
  var input = document.querySelector('#input');
  if (input.value.length <= 0) {
    alert("input text first.")
    return;
  }

  var val = parseInt(input.value, 10);
  if (isNaN(val)) {
    alert(input.value + ' is nan');
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
  var input = document.querySelector('#input');
  if (input.value.length <= 0) {
    alert("input text first.")
    return;
  }

  var val = parseInt(input.value, 10);
  if (isNaN(val)) {
    alert(input.value + ' is nan');
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
