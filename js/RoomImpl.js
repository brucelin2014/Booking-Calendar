// 2018-06-12, bruce

var roomImpl = new RoomImpl();
roomImpl.InitRooms();

// 定义类
function RoomImpl() {
	// 创建类的属性
	this.arrRooms = [];

	// 创建类的方法
	this.showInfo = function() {
		return JSON.stringify(this);
	}

	this.InitRooms = function() {
		this.arrRooms = [];
		for(var i = 1; i < 12; i++) {
			var room = new RoomObj();
			room.Code = i;
			room.Name = 'Taining Room ' + i;

			this.arrRooms.push(room);
		}
	}

}