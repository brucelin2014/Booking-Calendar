// 2018-06-13, bruce

// 定义类
function OptionObj() {
	// 创建类的属性
	this.text = '';
	this.value = '';
	
	this.Sort = ''; // 排序

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}
	
}