const countdown = document.querySelector('.countdown');

//Set launch Date 
const launchDate = new Date('Nov 21,2019 11:00:00').getTime();

// console.log(launchDate);

// Update every Second

const intvl = setInterval(() => {
	// console.log('hello');
	// Get todays date and time in ms
	const now = new Date().getTime();

	//distance from now to the launch date
	const distance = launchDate - now;
	// console.log(distance);

	// Time Calculation
	const days = Math.floor(distance / (1000 * 60 * 60 *24));
	const hours = Math.floor(distance % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
	const mins = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
	const seconds = Math.floor(distance % (1000 * 60) / (1000));

	//Display result
	countdown.innerHTML = `
		<div>${days}<span>Days</span></div>
		<div>${hours}<span>Hours</span></div>
		<div>${mins}<span>Minutes</span></div>
		<div>${seconds}<span>Seconds</span></div>
		
	`;

	//if launch date passed
	if(distance < 0) {
		//stop countdown
		clearInterval(intvl);
		//style and output text
		countdown.style.color = '#1712b8';
		countdown.innerHTML = 'Launched';
	}

}, 1000);