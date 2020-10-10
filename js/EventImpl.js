// 2018-06-14, bruce

var eventImpl = new EventImpl();
eventImpl.InitEvents();

// 定义类
function EventImpl() {
	// 创建类的属性
	this.arrEvents = [];

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitEvents = function() {
		this.arrEvents = [];
		var date = new Date();
		
		var event = new EventObj();
		event.TimeFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0);
		event.TimeTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);
		event.Title = '08:00 - 09:00';
		event.RoomID = 1;
		event.Status = 1;
		event.BookedBy = 'bruce';
		this.arrEvents.push(event);
		
		event = new EventObj();
		event.TimeFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0, 0);
		event.TimeTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
		event.Title = '10:00 - 12:00';
		event.RoomID = 2;
		event.Status = 2;
		event.BookedBy = 'lili';
		this.arrEvents.push(event);
		
		event = new EventObj();
		event.TimeFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0, 0);
		event.TimeTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0);
		event.Title = '15:00 - 18:00';
		event.RoomID = 3;
		event.Status = 3;
		event.BookedBy = 'saly';
		this.arrEvents.push(event);
		
		return this.arrEvents;
	}

}