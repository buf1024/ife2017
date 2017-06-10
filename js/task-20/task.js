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
var matchData = [];

function render() {
  var elm = document.querySelector('.output')
  var children = elm.children;
  for (var i = 0; i < children.length; i++) {
    children.item(0).remove();
  }
  var html = '';
  for (var i = 0; i < testData.length; i++) {
    html = html + '<p>';
    if (matchData[i] != null) {
      if (matchData[i].i > 0) {
        html = html + testData[i].substr(0, matchData[i].i);
      }
      html = html + '<span>' + matchData[i].m + '</span>';
      var len = matchData[i].m.length;
      if (matchData[i].i + len < testData[i].length) {
        html = html + testData[i].substring(matchData[i].i + len, testData[i].length);
      }
    } else {
      html = html + testData[i];
    }
    html = html + '</p>';
  }
  elm.innerHTML = html;
}


function leftIn(elm) {
  var input = document.querySelector('#input');
  if (input.value.length <= 0) {
    alert("input text first.")
    return;
  }
  var data = input.value.split('\n');
  for (var i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0) {
      testData.splice(0, 0, data[i]);
      matchData.splice(0, 0, null);
    }

  }
  input.value = '';
  render(testData);
}
function leftOut() {
  if (testData.length > 0) {
    testData.splice(0, 1);
    matchData.splice(0, 1);
    render(testData);
  }
}
function rightIn() {
  var input = document.querySelector('#input');
  if (input.value.length <= 0) {
    alert("input text first.")
    return;
  }
  var data = input.value.split('\n');
  for (var i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0) {
      testData.push(data[i]);
      matchData.push(null);
    }

  }
  input.value = '';
  render(testData);
}
function rightOut() {
  if (testData.length > 0) {
    testData.splice(testData.length - 1, 1);  
    matchData.splice(matchData.length - 1, 1);
    render(testData);
  }
}

function querytext() {
  var query = document.querySelector('#query-text');
  if (query.value.length > 0 && testData.length > 0) {
    var match = false;
    matchData = [];
    var re = new RegExp(query.value);
    for (var i = 0; i < testData.length; i++) {
      matchData[i] = null;
      var m = re.exec(testData[i]);
      if (m != null) {
        match = true;
        var ms = m[0];
        var mi = m.index;
        match = true;
        matchData[i] = { 'm': ms, 'i': mi };
      }
    }
    if (match) {
      render();
    }
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

  EventUtil.addHandler(
    document.querySelector("#query"),
    'click', querytext);
}

init();
