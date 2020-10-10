// 2018-06-14, bruce

// 定义类
function EventObj() {
	// 创建类的属性
	this.Title = '';
	this.BookedBy = '';
	this.RoomID = '';
	this.TimeFrom = new Date();
	this.TimeTo = new Date();
	this.Status = 1; // 0-Waitting, 1-Approved, 2-Rejected, 3-Cancelled

	this.Sort = ''; // 排序

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.showTime = function() {
		return this.TimeFrom.Format("h:mm") + "-" + this.TimeTo.Format("h:mm");
	}

}