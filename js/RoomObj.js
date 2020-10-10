// 2018-06-12, bruce

// 定义类
function RoomObj() {
	// 创建类的属性
	this.Name = ''; // 名称
	this.Code = ''; // 代码
	
	this.Sort = ''; // 排序

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}
	
}