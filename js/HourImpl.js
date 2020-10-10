// 2018-06-12, bruce

var hourImpl = new HourImpl();
hourImpl.InitHours();

// 定义类
function HourImpl() {
	// 创建类的属性
	this.arrHours = [];
	this.start = 8.0;
	this.end = 24.0;

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitHours = function() {
		this.arrHours = [];
		for(var i = this.start; i <= this.end; i++) {
			this.arrHours.push(i);
		}
		return this.arrHours;
	}

	this.ResetHours = function(start, end) {
		this.arrHours = [];
		for(var i = start; i <= end; i++) {
			this.arrHours.push(i);
		}
		return this.arrHours;
	}

	this.GetAmPmHour = function(hour) {
		if(hour < 12) {
			return hour + 'am';
		} else if(hour == 12) {
			return hour + 'pm';
		} else if(hour > 12 && hour < 24) {
			return hour - 12 + 'pm';
		} else if(hour == 24) {
			return hour - 12 + 'am';
		}
	}

}