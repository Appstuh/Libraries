/*
	Copyright:	Appstuh 2010
	Based partially on code from Dave Balmer of Palm
	License:	AGPLv3
	Purpose:	Provide a simple HTML5 canvas-based graphing library
*/

var graph = Class.create({
	initialize: function(canvas) {
		this.canvas = canvas.getContext("2d");
	},
	drawArea: function(opt) {
		this.lOffset = opt.lOffset || 30;
		this.bOffset = opt.bOffset || 30;
		this.height = parseInt(canvas.offsetHeight) - this.bOffset;
		this.width = parseInt(canvas.offsetWidth) - this.lOffset;
		try {
			if (opt.numData === undefined || opt.numData === null)
				opt.numData = opt.data.length;
			
			this.canvas.clearRect(0, 0, this.width, this.height);
			this.scale = 0;
			this.shortestData = opt.data[0].length;
			for (h = 0; h < opt.numData; h++) {
				data = opt.data[h];
				for (var i = 0; i < data.length; i++) {
				
					if (data[i] > this.scale)
						this.scale = data[i];
						
				}
				if (data.length < this.shortestData)
					this.shortestData;
				
				//TODO: use the shortestData variable to shorten the data arrays to the shortest length
			}
			
			this.scale = this.scale + 2; // automatically prevent it from EVER hitting the top of the canvas element
			
			if (opt.numData === undefined || opt.numData === null || opt.numData < 1) {
				opt.numData = opt.data.length;
			}
			
			for (h = 0; h < opt.numData; h++) {
				this.canvas.lineWidth = opt.lineWidth;
				this.canvas.strokeStyle = opt.strokeStyle[h];
				this.canvas.fillStyle = opt.fillStyle[h];
				data = opt.data[h];
				var x = 0;
				var y = 0;
				var scale = this.scale;
				this.xscale = this.width / (data.length - 1);
				this.yscale = this.height / scale;
				this.canvas.beginPath();
				this.canvas.moveTo(this.scalex(-2), this.scaley(-2));
				
				for (var i = 0; i < data.length; i++)
					this.canvas.lineTo(this.scalex(i), this.scaley(data[i]));
				
				this.canvas.lineTo(this.scalex(data.length) + 2, this.scaley(-2));
				this.canvas.closePath();
				this.canvas.stroke();
				this.canvas.fill();
			}
			this.canvas.clearRect(0, 0, this.lOffset, canvas.offsetHeight);
			this.canvas.clearRect(0, this.height, canvas.offsetWidth, this.bOffset);
			this.canvas.beginPath();
			this.canvas.fillStyle = "#000";
			this.canvas.font = "14px Prelude Medium"; // webOS' font
			for (i = 0; i < opt.xLabel.length; i++) {
				this.canvas.fillText(opt.xLabel[i], this.scalex(i) - (this.canvas.measureText(opt.xLabel[i]).width), this.height + 15);
			}
			if (opt.yLabel === "values") {
				this.canvas.font = "12px Prelude Medium"; // webOS' font
				for (i = 4; i > -1; i--) {
					text = i * Math.ceil(this.scale / 5) + "-";
					this.canvas.fillText(text, this.lOffset - this.canvas.measureText(text).width, this.height - (i * (this.height / 5)) + 3);
				}
				text = this.scale + "-";
				this.canvas.fillText(text, this.lOffset - this.canvas.measureText(text).width, 12);
			} else {
				// do the same as above with the xLabel
			}
			this.canvas.stroke();
			this.canvas.fill();
			if (opt.legend !== undefined && opt.legend === true) {
				hOff = 5;
				for (i = 0; i < opt.numData; i++) {
					this.canvas.fillStyle = opt.fillStyle[i];
					this.canvas.fillRect(this.width + this.lOffset - 20, hOff, 20, 20);
					this.canvas.fillStyle = "#000";
					text = opt.legendLabel[i];
					this.canvas.fillText(text, (this.width + this.lOffset - 20) - this.canvas.measureText(text).width - 5, hOff + 12);
					hOff += 22;
				}
			}
		} catch(e) {
			if (Mojo !== undefined) { // on webOS
				Mojo.Log.error("-------ERROR IN graph.js drawArea()--------");
				Mojo.Log.error(e.message);
				Mojo.Log.error(Object.toJSON(e));
				Mojo.Log.error("-----END ERROR IN graph.js drawArea()------");
			} else {
				alert("ERROR IN graph.js drawArea():\n" + e.message);
			}
		}
	},
	drawLine: function(opt) {
		this.lOffset = opt.lOffset || 30;
		this.bOffset = opt.bOffset || 30;
		this.height = parseInt(canvas.offsetHeight) - this.bOffset;
		this.width = parseInt(canvas.offsetWidth) - this.lOffset;
		try {
			if (opt.numData === undefined || opt.numData === null)
				opt.numData = opt.data.length;
			
			this.canvas.clearRect(0, 0, this.width, this.height);
			this.scale = 0;
			this.shortestData = opt.data[0].length;
			for (h = 0; h < opt.numData; h++) {
				data = opt.data[h];
				for (var i = 0; i < data.length; i++) {
				
					if (data[i] > this.scale)
						this.scale = data[i];
						
				}
				if (data.length < this.shortestData)
					this.shortestData;
				
				//TODO: use the shortestData variable to shorten the data arrays to the shortest length
			}
			
			this.scale = this.scale + 2; // automatically prevent it from EVER hitting the top of the canvas element
			
			if (opt.numData === undefined || opt.numData === null || opt.numData < 1) {
				opt.numData = opt.data.length;
			}
			
			for (h = 0; h < opt.numData; h++) {
				this.canvas.lineWidth = opt.lineWidth;
				this.canvas.strokeStyle = opt.strokeStyle[h];
				this.canvas.fillStyle = "transparent";
				data = opt.data[h];
				var x = 0;
				var y = 0;
				var scale = this.scale;
				this.xscale = this.width / (data.length - 1);
				this.yscale = this.height / scale;
				this.canvas.beginPath();
				this.canvas.moveTo(this.scalex(-2), this.scaley(-2));
				
				for (var i = 0; i < data.length; i++)
					this.canvas.lineTo(this.scalex(i), this.scaley(data[i]));
				
				this.canvas.lineTo(this.scalex(data.length) + 2, this.scaley(-2));
				this.canvas.closePath();
				this.canvas.stroke();
				this.canvas.fill();
			}
			this.canvas.clearRect(0, 0, this.lOffset, canvas.offsetHeight);
			this.canvas.clearRect(0, this.height, canvas.offsetWidth, this.bOffset);
			this.canvas.beginPath();
			this.canvas.fillStyle = "#000";
			this.canvas.font = "14px Prelude Medium"; //webOS' font
			for (i = 0; i < opt.xLabel.length; i++) {
				this.canvas.fillText(opt.xLabel[i], this.scalex(i) - (this.canvas.measureText(opt.xLabel[i]).width), this.height + 15);
			}
			if (opt.yLabel === "values") {
				this.canvas.font = "12px Prelude Medium"; //webOS' font
				for (i = 4; i > -1; i--) {
					text = i * Math.ceil(this.scale / 5) + "-";
					this.canvas.fillText(text, this.lOffset - this.canvas.measureText(text).width, this.height - (i * (this.height / 5)) + 3);
				}
				text = this.scale + "-";
				this.canvas.fillText(text, this.lOffset - this.canvas.measureText(text).width, 12);
			} else {
				// do the same as above with the xLabel
			}
			this.canvas.stroke();
			this.canvas.fill();
			if (opt.legend !== undefined && opt.legend === true) {
				hOff = 5;
				for (i = 0; i < opt.numData; i++) {
					this.canvas.fillStyle = opt.strokeStyle[i];
					this.canvas.fillRect(this.width + this.lOffset - 20, hOff, 20, 20);
					this.canvas.fillStyle = "#000";
					text = opt.legendLabel[i];
					this.canvas.fillText(text, (this.width + this.lOffset - 20) - this.canvas.measureText(text).width - 5, hOff + 12);
					hOff += 22;
				}
			}
		} catch(e) {
			if (Mojo !== undefined) { // on webOS
				Mojo.Log.error("-------ERROR IN graph.js drawArea()--------");
				Mojo.Log.error(e.message);
				Mojo.Log.error(Object.toJSON(e));
				Mojo.Log.error("-----END ERROR IN graph.js drawArea()------");
			} else {
				alert("ERROR IN graph.js drawArea():\n" + e.message);
			}
		}
	},
	scalex: function(x) {
		return this.lOffset + (x * this.xscale);
	},
	scaley: function(y) {
		return this.height - (y * this.yscale);
	}
});