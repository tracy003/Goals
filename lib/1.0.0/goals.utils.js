;(function(doc) {
	var Goals = window.Goals = (window.Goals ? (typeof window.Goals === 'function' ? new window.Goals() : window.Goals) : {});
	if(!Goals.utils) {
		Goals.utils = {};
	}
	Goals.utils.assert = function(judge, msg) {
		if(judge !== 0 && !judge) {
			throw new Error(msg);
		}
	};
	Goals.utils.getURIParameter = function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	};
	Goals.utils.isNull = function(arg) {return Object.prototype.toString.call(arg) === '[object Null]'};
	Goals.utils.isUndefined = function(arg) {return Object.prototype.toString.call(arg) === '[object Undefined]'};
	Goals.utils.isString = function(arg) {return Object.prototype.toString.call(arg) === '[object String]'};
	Goals.utils.isNumber = function(arg) {return Object.prototype.toString.call(arg) === '[object Number]'};
	Goals.utils.isBoolean = function(arg) {return Object.prototype.toString.call(arg) === '[object Boolean]'};
	Goals.utils.isFunction = function(arg) {return Object.prototype.toString.call(arg) === '[object Function]'};
	Goals.utils.isDate = function(arg) {return Object.prototype.toString.call(arg) === '[object Date]'};
	Goals.utils.isArray = function(arg) {return Object.prototype.toString.call(arg) === '[object Array]'};
	Goals.utils.isObject = function(arg) {return Object.prototype.toString.call(arg) === '[object Object]'};
	Goals.utils.isRegExp = function(arg) {return Object.prototype.toString.call(arg) === '[object RegExp]'};

	Goals.utils.dateFormat = function(date, format) {
		if(!date) {
			return '';
		}
		if(this.isString(date)) {
			try{
				date = new Date(date);
			}catch(e){
				date = new Date(date.replace(/-/g, '/'));
			}
		}else if(this.isNumber(date)) {
			date = new Date(date);
		}
		var o = {
			"M+": usedDate.getMonth() + 1, //月份
			"d+": usedDate.getDate(), //日
			"h+": usedDate.getHours(), //小时
			"m+": usedDate.getMinutes(), //分
			"s+": usedDate.getSeconds(), //秒
			"q+": Math.floor((usedDate.getMonth() + 3) / 3), //季度
			"S": usedDate.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (usedDate.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
	    return format;  
	};
	(function() {
		function get_dom_value(el, obj) {
			[].forEach.call(el, function(r) {
				var key = r.getAttribute('name');
				if(key) {
					obj[key] = r.value.trim();
				}
			});
		}
		Goals.utils.getTagNameData = function(el) {
			var result = {};
			var inputs = el.querySelectorAll('input');
			var selects = el.querySelectorAll('select');
			var textareas = el.querySelectorAll('textarea');
			get_dom_value(inputs, result);
			get_dom_value(selects, result);
			get_dom_value(textareas, result);
			return result;
		}
	}());
	Goals.utils.event = function() {
		if(document.all) {
			return window.event;
		}
		var func = Goals.utils.event.caller;
		while(func != null){
			var arg0 = func.arguments[0];
			if(arg0) {
				if((arg0.constructor == Event || arg0.constructor == MouseEvent) 
					|| (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
					return arg0;
				}
			}
			func = func.caller;
		}
		return null;
	};
	Goals.utils.on = function(selector, bubbling, event, fn) {
		selector.addEventListener(event, function(e) {
			e = e || tool.event();
			var path = e.path;
			if(path) {
				if(bubbling.substring(0, 1) == ".") {
					bubbling = bubbling.substring(1);
				}
				var isEvent = false;
				var index = 0;
				for(var i = 0, item; item = path[i++];) {
					try {
						if(item.classList.contains(bubbling)) {
							isEvent = true;
							index = i - 1;
							break;
						}
					} catch (e) {}
				}
				if(isEvent) {
					fn(path[index]);
				}
			}else {
				var target = e.target || e.srcElement;
				while(target !== this){
					if([].indexOf.call(this.querySelectorAll(bubbling), target) !== -1){
						fn(target);
						break;
					}
					target = target.parentNode;
				}
			}
		});
	};
	Goals.utils.hover = function(selector, inFn, outFn) {
		var hover_flag = false;
		selector.addEventListener('mouseover', function(e) {
			if(!hover_flag) {
				hover_flag = true;
				inFn && inFn();
			}
		});
		selector.addEventListener('mouseleave', function(e) {
			hover_flag = false;
			outFn && outFn();
		});
	};
}(document));
