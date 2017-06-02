/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city, value) {
    aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    var elms = document.querySelectorAll('table tr');
    elms.forEach(function (elm) {
        elm.remove();
    });
    if (Object.keys(aqiData).length > 0) {
        var tbl = document.querySelector('table');
        var html = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        for (var k in aqiData) {
            html = html + '<tr><td>' + k + '</td><td>' + aqiData[k] + '</td><td><button data="' + k + '">删除</button></td></tr>';
        }
        tbl.innerHTML = html;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var city = document.getElementById('aqi-city-input');
    if (!check(city)) return;

    var value = document.getElementById('aqi-value-input');
    if (!check(value)) return;

    addAqiData(city.value, parseInt(value.value));
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
    // do sth.
    delete aqiData[key];
    renderAqiList();
}

function verifyCity(text) {
    var re = /^[a-zA-Z\u4e00-\u9fa5 ]+/;
    return re.test(text);
}

function verifyValue(text) {
    var re = /^(0|[1-9][0-9]*)$/;
    return re.test(text);
}

function check(elm) {
    var text = elm.value;
    var errDiv = null;
    var pass = false;
    if (elm.id == 'aqi-city-input') {
        errDiv = document.getElementById('city-input-err');
        pass = verifyCity(text);
    } else {
        errDiv = document.getElementById('value-input-err');
        pass = verifyValue(text);
    }
    if (!pass) {
        errDiv.style.display = 'block';
    } else {
        errDiv.style.display = 'none';
    }
    return pass;
}

function checkValue(evt) {
    check(evt.currentTarget);

}

function tableClick(evt) {
    if (evt.target.nodeName.toLowerCase() == 'button') {
        var key = evt.target.getAttribute('data');
        delBtnHandle(key);
    }
}

function init() {
    document.getElementById('aqi-city-input').onblur = checkValue;
    document.getElementById('aqi-value-input').onblur = checkValue;
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById('aqi-table').onclick = tableClick;
}

init();