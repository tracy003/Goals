;(function() {
	/**
	 * 去掉字符串前后的空格
	 */
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	/**
	 * 判断字符串是否已传入的参数字符串开头的
	 * @param {String} str参数字符串
	 */
	String.prototype.startsWith = function(str) {
		var reg = new RegExp("^" + str);
		return reg.test(this);
	}
	/**
	 * 判断字符串是否已传入的参数字符串结尾的
	 * @param {String} str参数字符串
	 */
	String.prototype.endsWith = function(str) {
		var reg = new RegExp(str + "$");
		return reg.test(this);
	}
}());
