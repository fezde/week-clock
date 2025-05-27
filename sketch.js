/*
No comment

- background rendering
- time2angle
- pointer

*/

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);
 	frameRate(1);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER);
	textSize(42);
}

function date2angle(theDate) {


	let day = theDate.getDay(); // 0-6 0=Sunday
	let hour = theDate.getHours();
	let minute = theDate.getMinutes();
	let second = theDate.getSeconds();

	return getAngle(day, hour, minute, second);
}

function getAngle(weekday, hour, minute, second) {
	
	let day = (weekday - 1) % 7;
	let minutePart = second / 60;
	let hourPart = (minute + minutePart) / 60;
	let dayPart = (hour + hourPart) / 24;

	const angle = (((day + dayPart) / 7) * 360) - 90;
	
	return angle;
}

function draw() {
	clear();
	// Background
	
	noStroke();
	
	strokeWeight(1);
	fill("#E1D27CD3");
	const radius = min(width, height) / 2 - 20;

	// Basis
	for(let weekday=0;weekday<7;weekday++){
		arc(
			width / 2, height / 2,
			radius*2, radius*2,
			getAngle(weekday, 0,0,0), getAngle(weekday, 23,59,59),
			PIE
		);
	}
	
	// nights
	let angleStep = 0.1;
	for(let weekday=0;weekday<7;weekday++){
		let startAngle = getAngle(weekday-1, 21,0,0);
		let endAngle = getAngle(weekday, 7,0,0);
		fill(0,0,42,10)
		while(startAngle < endAngle){
			arc(
				width / 2, height / 2,
				radius*2, radius*2,
				startAngle, endAngle,
				PIE
			);
			startAngle += angleStep;
			endAngle -= angleStep;
		}
	}
	
	// working hours
	angleStep = 0.1;
	for(let weekday=1;weekday<6;weekday++){
		fill(123,42,42,42);
		let startAngle = getAngle(weekday, 8,0,0);
		let endAngle = getAngle(weekday, 17,0,0);
		while(startAngle < endAngle){
			arc(
				width / 2, height / 2,
				radius*2, radius*2,
				startAngle, endAngle,
				PIE
			);
			startAngle += angleStep;
			endAngle -= angleStep;
		}
	}

	
	// Day names
	fill(255, 255, 255, 128);

	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	for(let i=0; i<days.length; i++){
		push();
		translate(width/2, height/2);
		rotate(getAngle(i+1, 12, 0, 0) + 90);
		text(days[i], 0, -height * 0.4242);

		pop();
	}
	
	stroke(0);
	noFill();
	strokeWeight(5);
	circle(width/2, height/2, radius*2);

	
	
	const pointer = date2angle(new Date());
	
	push();
	translate(width/2, height/2);
	
	stroke(0);
	fill(0);
	rotate(pointer+90);
	circle(0,0,42);
	
	stroke(0,0,0, 255);
	strokeWeight(13);
	line(0,0,0,0-radius+50);
	stroke(200);
	strokeWeight(3);
	line(0,0,0,0-radius+52);
	pop();
	
}
