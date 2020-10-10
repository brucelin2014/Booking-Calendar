// 2018-06-12, bruce

// 定义类
function MonthObj() {
	// 创建类的属性
	this.SChiName = ''; // 简体
	this.ChiName = ''; // 繁体
	this.EngName = ''; // 英文
	this.Code = ''; // 代码
	
	this.Sort = ''; // 排序

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}
	
}