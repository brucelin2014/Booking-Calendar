// 2018-06-12, bruce

var monthImpl = new MonthImpl();
monthImpl.InitMonths();

// 定义类
function MonthImpl() {
	// 创建类的属性
	this.arrMonths = [];
	this.arrMonthsEng = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	this.arrMonthsChs = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月');

	this.arrMonthOptions = [];

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitMonths = function() {
		this.arrMonths = [];
		for(var i = 0; i < 12; i++) {
			var month = new MonthObj();
			month.Code = i;
			month.EngName = this.arrMonthsEng[i];
			month.SChiName = this.arrMonthsChs[i];
			month.ChiName = this.arrMonthsChs[i];

			this.arrMonths.push(month);
		}

		this.arrMonthOptions = [];
		for(var i = 0; i < 12; i++) {
			var option = new OptionObj();
			option.text = this.arrMonthsEng[i];
			option.value = i;

			this.arrMonthOptions.push(option);
		}
	}

	this.CurrentMonth = function() {
		var d = new Date();
		return this.arrMonths[d.getMonth()];
	}

	this.NextMonth = function(monthObj) {
		if(monthObj) {
			var next = monthObj.Code;
			next++;
			if(next < this.arrMonths.length) {
				monthObj = this.arrMonths[next];
			}
		}
		//console.log(monthObj.showInfo());
		return monthObj;
	}

	this.PreviousMonth = function(monthObj) {
		if(monthObj) {
			var pre = monthObj.Code;
			pre--;
			if(pre >= 0) {
				monthObj = this.arrMonths[pre];
			}
		}
		//console.log(monthObj.showInfo());
		return monthObj;
	}

	this.ChangeMonth = function(value) {
		var monthObj = this.arrMonths[value];
		//console.log(monthObj.showInfo());
		return monthObj;
	}

}