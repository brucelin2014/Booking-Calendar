// 2018-06-12, bruce

var dayImpl = new DayImpl();
dayImpl.InitDays();

// 定义类
function DayImpl() {
	// 创建类的属性
	this.arrDays = [];

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitDays = function() {
		this.arrDays = [];
		var date = new Date();
		date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		var days = date.getDate();
		for(var i = 0; i < days; i++) {
			this.arrDays.push(i + 1);
		}
		//console.log(this.arrDays);
		return this.arrDays;
	}
	
	this.ResetDays = function(year, month) {
		this.arrDays = [];
		var date = new Date(year, month + 1, 0);
		var days = date.getDate();
		for(var i = 0; i < days; i++) {
			this.arrDays.push(i + 1);
		}
		//console.log(this.arrDays);
		return this.arrDays;
	}

}