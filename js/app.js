// 2018-06-11, Bruce

// Model
var dcmData = {
	selMonthObj: monthImpl.CurrentMonth(),
	selYearObj: yearImpl.CurrentYear(),

	selDay: new Date().getDate(),
	selRoom: roomImpl.arrRooms[0],

	arrMonths: monthImpl.arrMonthsEng,
	arrDays: dayImpl.arrDays,
	arrHours: hourImpl.arrHours,
	arrRooms: roomImpl.arrRooms,
	arrEvents: eventImpl.arrEvents,

	selMonth: monthImpl.CurrentMonth().Code,
	monthOptions: monthImpl.arrMonthOptions,

	selYear: yearImpl.CurrentYear().value,
	yearOptions: yearImpl.arrYearOptions,

	startDay: 0,
	endDay: 15,

	// Info
	x: 0,
	y: 0,
	width: 0,
	height: 0,

	// size
	fontSize: 20,
	rowHeight: 35,
	zoom: 1.0,
	winWidth: document.body.clientWidth,
}

var vue = new Vue({
	el: '#app',
	data: dcmData,
	methods: {
		loadData: function() {
			const that = this;
			that.winWidth = document.body.clientWidth;
			that.zoom = that.winWidth / 1920.0;
		},
		
		onToday: function() {
			this.selYearObj = yearImpl.CurrentYear();
			this.selYear = yearImpl.CurrentYear().value;
			
			this.selMonthObj = monthImpl.CurrentMonth();
			this.selMonth = this.selMonthObj.Code;
			
			this.selDay = new Date().getDate(),
			this.onResetDays();
		},

		// Next month
		onNextMonth: function() {
			this.selMonthObj = monthImpl.NextMonth(this.selMonthObj);
			this.selMonth = this.selMonthObj.Code;
			this.onResetDays();
		},
		// Previous month
		onPreviousMonth: function() {
			this.selMonthObj = monthImpl.PreviousMonth(this.selMonthObj);
			this.selMonth = this.selMonthObj.Code;
			this.onResetDays();
		},
		// Change month
		onChangeMonth: function() {
			this.selMonthObj = monthImpl.ChangeMonth(this.selMonth);
			this.onResetDays();
		},

		// Next year
		onNextYear: function() {
			var yearObj = yearImpl.NextYear(this.selYearObj);
			if(yearObj) {
				this.selYearObj = yearObj;
				this.selYear++;
				this.onResetDays();
			}
		},
		// Previous year
		onPreviousYear: function() {
			var yearObj = yearImpl.PreviousYear(this.selYearObj);
			if(yearObj) {
				this.selYearObj = yearObj;
				this.selYear--;
				this.onResetDays();
			}
		},
		// Change year
		onChangeYear: function() {
			this.selYearObj = yearImpl.ChangeYear(this.selYear);
			this.onResetDays();
		},

		// Next day
		onNextDay: function() {
			var maxDay = dayImpl.arrDays[dayImpl.arrDays.length - 1];
			if(this.endDay < maxDay) {
				this.startDay++;
				this.endDay++;
			}
		},
		// Previous day
		onPreviousDay: function() {
			if(this.startDay > 0) {
				this.startDay--;
				this.endDay--;
			}
		},
		onResetDays: function() {
			this.arrDays = dayImpl.ResetDays(this.selYear, this.selMonthObj.Code);
			while(this.endDay > this.arrDays.length) {
				this.startDay--;
				this.endDay--;
			}
		},
		// Change day
		onSelectDay: function(day) {
			this.selDay = day;
		},
		isToday: function(day) {
			var date = new Date();
			if(day == date.getDate() && this.selYear == date.getFullYear() && this.selMonthObj.Code == date.getMonth()) {
				return true;
			}
			return false;
		},
		isSelDay: function(day) {
			if(day == this.selDay) {
				return true;
			}
			return false;
		},

		isTodayHour: function(hour) {
			var date = new Date();
			if(this.selYear == date.getFullYear() && this.selMonthObj.Code == date.getMonth() && this.selDay == date.getDate() && date.getHours() == hour) {
				return true;
			}
			return false;
		},

		// Change room
		onSelectRoom: function(room) {
			this.selRoom = room;
		},
		isSelRoom: function(room) {
			if(room.Code == this.selRoom.Code) {
				return true;
			}
			return false;
		},

		calEventLeftPersen: function(eventObj) {
			//console.log(eventObj.showInfo());
			var totalHours = hourImpl.end - hourImpl.start + 1;
			var leftHours = eventObj.TimeFrom.getHours() - hourImpl.start;
			var leftPer = leftHours / totalHours * 100;
			//console.log("calEventLeftPersen " + totalHours + ", " + leftHours + ", " + leftPer);
			return leftPer;
		},
		calEventWidthPersen: function(eventObj) {
			//console.log(eventObj.showInfo());
			var totalHours = hourImpl.end - hourImpl.start + 1;
			var widthHours = eventObj.TimeTo.getHours() - eventObj.TimeFrom.getHours();
			var widthPer = widthHours / totalHours * 100;
			//console.log("calEventWidthPersen " + totalHours + ", " + widthHours + ", " + widthPer);
			return widthPer;
		},
		isSelectedDateEvent: function(eventObj) {
			var selDateFrom = new Date(this.selYear, this.selMonth, this.selDay, 0, 0, 0);
			var selDatetTo = new Date(this.selYear, this.selMonth, this.selDay, 23, 59, 59);
			if(eventObj.TimeFrom < selDatetTo && eventObj.TimeTo > selDateFrom) {
				return true;
			}
			return false;
		},

		updateXY: function(event) {
			//this.x = event.offsetX; // 元素內部的x坐標位置
			//this.y = event.offsetY; // 元素內部的y坐標位置

			var rect = event.target.getBoundingClientRect()
			this.x = rect.left
			this.y = rect.top
			//this.width = rect.right - rect.left;
			//this.height = rect.bottom - rect.top;
		},

		save: function() {},
		clear: function() {},
		copyToData: function() {},
		copyFromData: function() {},

	},
	/*mounted: function() {
		const that = this;
		// _.debounce 是一个通过 lodash 限制操作频率的函数。
		window.onresize = _.debounce(() => {
			console.log("onresize:" + that.winWidth);
			that.winWidth = document.body.clientHeight;
			if(that.winWidth > 1920) {
				that.zoom = 1.5;
			} else if(that.winWidth > 1080) {
				that.zoom = 1;
			} else if(that.winWidth < 1080) {
				that.zoom = 0.5;
			}
		}, 400);
	},*/

})