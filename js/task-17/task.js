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
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var green = 50,
    blue = 150,
    red = 250,
    grey = 350,
    black = 450;
  var dayWidth = '5px',
    weekWidth = '15px',
    monthWidth = '30px';
  var div = document.querySelector('.aqi-chart-wrap');
  var size = div.children.length;
  for (var i = 0; i < size; i++) {
    div.children.item(0).remove();
  }
  for (var k in chartData) {
    var p = document.createElement('p');
    var style = 'display: inline-block;margin: 0.5px;';
    if (k[0] == 'M') {
      style = style + 'width:' + monthWidth + ';';
    } else if (k[0] == 'W') {
      style = style + 'width:' + weekWidth + ';';
    } else {
      style = style + 'width:' + dayWidth + ';';
    }
    style = style + 'height:' + chartData[k] / 5 + '%;';
    if (chartData[k] < green) {
      style = style + 'background-color:green;';
    } else if (chartData[k] < blue) {
      style = style + 'background-color:blue;';
    } else if (chartData[k] < red) {
      style = style + 'background-color:red;';
    } else if (chartData[k] < grey) {
      style = style + 'background-color:grey;';
    } else {
      style = style + 'background-color:black;';
    }
    p.style = style;
    div.appendChild(p);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(elm) {
  // 确定是否选项发生了变化 
  var val = elm.target.value;
  if (val == pageState.nowGraTime) return;
  pageState.nowGraTime = val;
  // 设置对应数据

  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(elm) {
  // 确定是否选项发生了变化 
  var select = elm.target;
  var opt = select[select.selectedIndex];
  var val = opt.getAttribute('data');

  if (val == pageState.nowSelectCity) return;
  pageState.nowSelectCity = val;
  // 设置对应数据

  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < radios.length; i++) {
    EventUtil.addHandler(radios[i], 'click', graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.querySelector('#city-select');
  var html = '';
  for (var key in aqiSourceData) {
    html = html + '<option data="' + key + '">' + key + '</option>';
  }
  select.innerHTML = html;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  EventUtil.addHandler(select, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var city = aqiSourceData[pageState.nowSelectCity]
  switch (pageState.nowGraTime) {
    case 'day':
      for (var k in city) {
        chartData[k] = city[k];
      }
      break;
    case 'week':
      var date = new Date();
      var dayCount = 0;
      var daySum = 0;
      var weekNum = 1;
      for (var k in city) {
        var ks = k.split('-');
        date.setFullYear(parseInt(ks[0], 10));
        date.setMonth(parseInt(ks[1], 10) - 1);
        date.setDate(parseInt(ks[2], 10));
        var newDay = date.getDay();
        if (newDay != 0) {
          daySum += city[k];
          dayCount = dayCount + 1;
        } else {
          if (dayCount != 0) {
            chartData['W' + weekNum] = daySum / dayCount;
          }
          dayCount = 1;
          daySum = city[k];
          weekNum = weekNum + 1;
        }
      }
      if (dayCount != 0) {
        chartData['W' + weekNum] = daySum / dayCount;
      }
      break;
    case 'month':
      var date = new Date();
      var month = -1;
      var monthCount = 0;
      var monthSum = 0;
      for (var k in city) {
        var ks = k.split('-');
        var newMonth = parseInt(ks[1], 10)
        if (month == -1) {
          month = newMonth;
        }
        if (month == newMonth) {
          monthSum += city[k];
          monthCount = monthCount + 1;
        } else {
          chartData['M' + month] = monthSum / monthCount;
          month = newMonth;
          monthCount = 1;
          monthSum = city[k];
        }
      }
      if (monthCount != 0) {
        chartData['M' + newMonth] = monthSum / monthCount;
      }
      break;
    default:
      break;
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
