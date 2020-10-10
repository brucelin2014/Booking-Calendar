// 2018-06-13, bruce

var yearImpl = new YearImpl();
yearImpl.InitYears();

// 定义类
function YearImpl() {
	// 创建类的属性
	this.arrYearOptions = [];

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitYears = function() {
		this.arrYearOptions = [];
		var year = new Date().getFullYear();
		for(var i = year - 5; i < year + 5; i++) {
			var option = new OptionObj();
			option.text = i;
			option.value = i;

			this.arrYearOptions.push(option);
		}
	}

	this.CurrentYear = function() {
		var d = new Date();
		return this.ChangeYear(d.getFullYear());
	}

	this.NextYear = function(yearObj) {
		if(yearObj) {
			var next = yearObj.value;
			next++;
			yearObj = this.ChangeYear(next);
		}
		//console.log(yearObj.showInfo());
		return yearObj;
	}

	this.PreviousYear = function(yearObj) {
		if(yearObj) {
			var pre = yearObj.value;
			pre--;
			yearObj = this.ChangeYear(pre);
		}
		//console.log(yearObj.showInfo());
		return yearObj;
	}

	this.ChangeYear = function(value) {
		var yearObj = null;
		var size = this.arrYearOptions.length;
		for(var i = 0; i < size; i++) {
			if(this.arrYearOptions[i].value == value) {
				yearObj = this.arrYearOptions[i];
			}
		}
		//console.log(yearObj.showInfo());
		return yearObj;
	}

}