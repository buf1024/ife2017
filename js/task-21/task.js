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

var tags = [];
var interest = [];
var maxtag = 10;

function render() {
  var elm = document.querySelector('.tags')
  var children = elm.children;
  for (var i = 0; i < children.length; i++) {
    children.item(0).remove();
  }
  var html = '';
  for (var i = 0; i < tags.length; i++) {
    html = html + '<p class="tag-output">' + tags[i] + '</p>';
  }
  elm.innerHTML = html;
  
  for (var i = 0; i < children.length; i++) {
    EventUtil.addHandler(children.item(i), 'click', function(event) {
      var text = event.currentTarget.innerText;
      var index = tags.indexOf(text);
      tags.splice(index, 1);      
      render();
    });
  }
  elm = document.querySelector('.interest');
  children = elm.children;
  for (var i = 0; i < children.length; i++) {
    children.item(0).remove();
  }
  html = '';
  for (var i = 0; i < interest.length; i++) {
    html = html + '<p class="interest-output">' + interest[i] + '</p>';
  }
  elm.innerHTML = html;
}

function tagInput(event) {
  var refresh = false;
  if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 188) {
    var text = event.currentTarget.value;
    var str = text.split(/[, \n]/);
    for(var i=0; i<str.length; i++) {
      text = str[i].trim();
      if(text.length == 0) continue;

      var index = tags.indexOf(text);
      if(index < 0) {
        if(tags.length >= maxtag) {
          tags.splice(0, 1);
        }
        tags.push(text);
        refresh = true;
      }
    }
  }
  if(refresh) {
    render();
  }
}

function interestComfirm(event) {
  var refresh = false;
  var elm = document.querySelector('#interest-input');
  var text = elm.value;
  var str = text.split(/[,，、 \t\n]/);
  for(var i=0; i<str.length; i++) {
    text = str[i].trim();
    if(text.length <= 0) continue;

    var index = interest.indexOf(text);
    if(index < 0) {
        if(interest.length >= maxtag) {
          interest.splice(0, 1);
        }
        interest.push(text);
        refresh = true;
      }
  }
  render();
}

function init() {
  EventUtil.addHandler(
    document.querySelector("#tag-input"),
    'keydown', tagInput);

  EventUtil.addHandler(
    document.querySelector("#interest-comfirm"),
    'click', interestComfirm); 
}

init();
