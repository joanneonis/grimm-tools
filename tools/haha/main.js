import { loadJSON } from '../../helpers/loadJSON';


function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// use the 1st file from the list
	let f = files[0];

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onloadend = (() => {
			return function(e) {
				// haha
				// countEmojis(e.target.result);

				// splitToMonths(e.target.result);
				// console.log(e.target.result);

				splitMessages(e.target.result);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);


function countEmojis(data) {
	let freq = {};
	// data.replace(/[\u{1F300}-\u{1F6FF}]/gu, char => freq[char] = (freq[char] || 0) + 1);
	//? haha hahaha
	data.replace(/(ha){2,35}/g, char => freq[char] = (freq[char] || 0) + 1);

	var arr = sortObject(freq);

	arr.forEach((row) => {
		addToTable(row);
	});

	// compromiseStuff(data);
}

function sortObject(obj) {
	var arr = [];
	for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
					arr.push({
							'key': prop,
							'value': obj[prop]
					});
			}
	}
	arr.sort(function(a, b) { return a.value > b.value ? -1 : 1; });
	return arr; 
}

function addToTable(row) {
	var table = document.querySelector('table');
	var tr = document.createElement('tr');

	tr.innerHTML = `
		<td>${row.key}</td>
		<td>${row.value}</td>
	`;

	table.appendChild(tr);
}

function splitToMonths(string) {
	var splitted = string.split(/(\r\n|\n|\r)/gm);
	var cleaned = splitted.filter(el => el.trim());

	var yearArray = {
		10: new Array(12).fill([]),
		11: new Array(12).fill([]),
		12: new Array(12).fill([]),
		13: new Array(12).fill([]),
		14: new Array(12).fill([]),
		15: new Array(12).fill([]),
		16: new Array(12).fill([]),
		17: new Array(12).fill([]),
		18: new Array(12).fill([]),
		19: new Array(12).fill([]),
	};

	console.log(yearArray);

	cleaned.forEach((message) => {
		const year = message.substr(nthIndex(message,'/',2) + 1, 2); 
		const monthRough = parseInt(message.substr(message.indexOf('/') + 1, 2));
		const month = monthRough >= 1 && monthRough <= 12 ? monthRough : 0; 

		if (parseInt(year) >= 10 && parseInt(year) <= 19 && month > 0) {	
			console.log(month - 1);	
			yearArray[year][month - 1].push(message);
		}
	});

	console.log(yearArray);
}


function nthIndex(str, pat, n){
	var L= str.length, i= -1;
	while(n-- && i++<L){
			i= str.indexOf(pat, i);
			if (i < 0) break;
	}
	return i;
}



// function splitMessages(string) {
// 	var splitted = string.split(/(\r\n|\n|\r)/gm);
// 	var messages = splitted.filter(el => el.trim());

// 	var yearArray = {
// 		10: new Array(12).fill([]),
// 		11: new Array(12).fill([]),
// 		12: new Array(12).fill([]),
// 		13: new Array(12).fill([]),
// 		14: new Array(12).fill([]),
// 		15: new Array(12).fill([]),
// 		16: new Array(12).fill([]),
// 		17: new Array(12).fill([]),
// 		18: new Array(12).fill([]),
// 		19: new Array(12).fill([]),
// 	};

// 	console.log(messages);

// 	messages.forEach((message) => {
// 		const year = message.substr(nthIndex(message,'/',2) + 1, 2); 
// 		const monthRough = parseInt(message.substr(message.indexOf('/') + 1, 2));
// 		const month = monthRough >= 1 && monthRough <= 12 ? monthRough : 0; 
// 		const isMessage = message.substr(nthIndex(message,'/',2) + 3, 1) === ',' && month > 0 ? true : false;


// 		if (isMessage) {
// 			var date = new Date(Date.parse(message.split(', ')[0]));

// 			yearArray[date.getFullYear() -][monthIndex].push(message);
// 		}
// 	});

// 	console.log(yearArray);
// }




function splitMessages(string) {
	var splitted = string.split(/(\r\n|\n|\r)/gm);
	var messages = splitted.filter(el => el.trim());

	var yearArray = {
		10: [],
		11: [],
		12: [],
		13: [],
		14: [],
		15: [],
		16: [],
		17: [],
		18: [],
		19: [],
	};

	messages.forEach((message) => {
		var messageParts = message.split(', ');
		const isMessage = message.substr(nthIndex(message,'/',2) + 3, 1) === ',';
		var ts = Date.parse(messageParts.length > 0 && isMessage ? messageParts[0] : 0);
		var date = new Date(ts);

		if (ts && date.getFullYear() > 2000) {
			yearArray[date.getFullYear() - 2000].push({
				date: date,
				month: date.getMonth(),
				message: message,
			});
		}
	});

	partTwo(yearArray);
}

function partTwo(yearArray) {
	var yearArrayDup = {
		10: new Array(12).fill([]),
		11: new Array(12).fill([]),
		12: new Array(12).fill([]),
		13: new Array(12).fill([]),
		14: new Array(12).fill([]),
		15: new Array(12).fill([]),
		16: new Array(12).fill([]),
		17: new Array(12).fill([]),
		18: new Array(12).fill([]),
		19: new Array(12).fill([]),
	};

	const years = Object.keys(yearArray);

	const finalData = {};


	years.forEach((year) => {
		if (yearArray[year].length === 0) return;
		var monthArray = {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: [],
			11: [],
		};

		// console.log(year, yearArray[year][0].month);

		yearArray[year].forEach((mess) => {
			monthArray[mess.month].push(mess);
		});

		finalData[year] = monthArray;

		
		// let freq = {};
		// data.replace(/(ha){2,35}/g, char => freq[char.message] = (freq[char.message] || 0) + 1);

	});

	console.log(finalData);
	countFinal(finalData);
}

function countFinal(yearArray) {
	const finalCountData = {};
	const years = Object.keys(yearArray);

	years.forEach((year) => {
		const months = Object.keys(yearArray[year]);

		var monthCount = {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: [],
			11: [],
		};


		months.forEach((month) => {
			var data = yearArray[year][month].map((a) => a.message).join('').toLowerCase();
			let freq = {};
			data.replace(/(ha){2,35}/g, char => freq[char] = (freq[char] || 0) + 1);

			monthCount[month] = freq;
		});

		finalCountData[year] = monthCount;
	});

	toTable(finalCountData);
}

function toTable(yearMonthData) {
	const years = Object.keys(yearMonthData);

	
	years.forEach((year) => {
		const months = Object.keys(yearMonthData[year]);
		
		var table = document.createElement('table');
		
		months.forEach((month) => {
			var tr = document.createElement('tr');
			var hahas = Object.keys(yearMonthData[year][month]);

			var yearCell = document.createElement('td');
			yearCell.innerHTML = year;
			var monthCell = document.createElement('td');
			monthCell.innerHTML = getMonthName(month);

			var hahaCell = document.createElement('td');

			var hahtable = document.createElement('table');
			hahas.forEach((haha) => {
				var tr = document.createElement('tr');
				var hahCell = document.createElement('td');
				hahCell.innerHTML = `
					${haha} : ${yearMonthData[year][month][haha]}
				`;

				tr.appendChild(hahCell)
				hahtable.appendChild(tr);
			});

			hahaCell.appendChild(hahtable);

			tr.appendChild(yearCell);
			tr.appendChild(monthCell);
			tr.appendChild(hahaCell);

			table.appendChild(tr);
			document.querySelector('.container').appendChild(table);
		});
	});
}

//? should be for each month..
// let freq = {};
// data.replace(/(ha){2,35}/g, char => freq[char.message] = (freq[char.message] || 0) + 1);


function getMonthName(monthNumber) {
	return new Date(2018, parseInt(monthNumber)).toLocaleString('nl', { month: 'long' });
}