var loadXML = function(xmlFile) {
    var xmlDoc = null;
    //IE
    if (!window.DOMParser && window.ActiveXObject) {
        var xmlDomVersions = ["MSXML.2.DOMDocument.6.0", "MSXML.2.DOMDocument.3.0", "Microsoft.XMLDOM", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "Microsoft.XMLDOM", "MSXML.DOMDocument"];
        for (var i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                break;
            } catch (e) {
                xmlDoc = null;
                console.log(e.name + ": " + e.message);
                alert(e.name + ": " + e.message);
            }
        }
        //console.log("loadXML. IE");
    }
    //Mozilla
    else if (document.implementation && document.implementation.createDocument) {
        try {
            /* document.implementation.createDocument('','',null); 方法的三个参数说明
            * 第一个参数是包含文档所使用的命名空间URI的字符串； 
            * 第二个参数是包含文档根元素名称的字符串； 
            * 第三个参数是要创建的文档类型（也称为doctype）
            */
            xmlDoc = document.implementation.createDocument('', '', null);
        } catch (e) {
            xmlDoc = null;
            console.log(e.name + ": " + e.message);
            alert(e.name + ": " + e.message);
        }
        //console.log("loadXML. Mozilla");
    }
    else {
        return null;
    }

    try {
        if (xmlDoc != null) {
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        }
    }
    catch (e) {
        xmlDoc = null;
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
    }
    return xmlDoc;
}

var loadXML2 = function(xmlFile) {
    var xmlDoc = null;
    try {
        if (window.ActiveXObject) {
            //console.log("1");
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM'); //IE浏览器
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        } else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
            //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
            //console.log("2");
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.load(xmlFile);

        } else { //谷歌浏览器
            //console.log("3");
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", xmlFile, false);
            xmlhttp.send(null);
            if (xmlhttp.readyState == 4) {
                xmlDoc = xmlhttp.responseXML.documentElement;
            }
        }
    }
    catch (e) {
        xmlDoc = null;
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
    }

    return xmlDoc;
}

function ValidBookTime(BookTimeFrom, BookTimeTo, dtNow) {
    var dtFrom = Date.parse(dtNow.pattern("yyyy/MM/dd " + BookTimeFrom));
    var dtTo = Date.parse(dtNow.pattern("yyyy/MM/dd " + BookTimeTo));

    //alert(dtNow.pattern("HH:mm:ss") + ", " + BookTimeTo + ", " + BookTimeTo);

    if (dtFrom <= dtNow && dtTo >= dtNow) {
        return true;
    }
    else {
        return false;
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
* 对Date的扩展，将 Date 转化为指定格式的String
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
* eg:
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
*/
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//替换所有的回车换行
function TransferString(title, content) {
    var string = title;
    try {
        var brIndex = content.toLowerCase().indexOf("<br>");
        //console.debug("brIndex : " + brIndex);

        var spaceIndex = string.indexOf(" ");
        //console.debug("spaceIndex : " + spaceIndex);

        var brIndex2 = string.toLowerCase().indexOf("<br>");
        //console.debug("brIndex2 : " + brIndex2);

        if (brIndex > 0 && spaceIndex > 0 && brIndex2 < 0) {
            var arrTitle = new Array();
            arrTitle = string.split(" ");

            var startIndex = content.indexOf(arrTitle[0]);
            var endIndex = content.lastIndexOf(arrTitle[arrTitle.length - 1]);

            if (startIndex > 0 && startIndex < endIndex) {
                string = content.substring(startIndex, endIndex);
            }

            //console.debug("startIndex : " + startIndex + ", endIndex : " + endIndex);
        }
    } catch (e) {
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
    }
    return string;
}

var ConverToDateTime = function(dateTimeString, format){
	if (dateTimeString.indexOf('T') > 0){
		dateTimeString = dateTimeString.replace("T", " ");
		dateTimeString = dateTimeString.replace(/-/g, "/"); // Safari处理
	}
	var date = new Date(dateTimeString);
	return date.Format(format);
}
