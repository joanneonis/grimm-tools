import { loadJSON } from '../../helpers/loadJSON';


function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// use the 1st file from the list
	let f = files[0];

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = (() => {
			return function(e) {
				// animalData = JSON.parse(e.target.result);
				// console.log('uploaded', e.target.result);
				countEmojis(e.target.result);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);


function countEmojis(data) {
	let freq = {};
	// data.replace(/[\u{1F300}-\u{1F6FF}]/gu, char => freq[char] = (freq[char] || 0) + 1);
	data.replace(/(ha){2,15}/g, char => freq[char] = (freq[char] || 0) + 1);

	var arr = sortObject(freq);

	arr.forEach((row) => {
		addToTable(row);
	});

	compromiseStuff(data);
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

function compromiseStuff(data) {
	// console.log('storylength', data.length / 10000);
	// let testData = data.substring(0, 10000);
	// let compromise = window.nlp(testData).topics().slice(0, 50).out('frequency');

	// console.log('compr', compromise);

	sliced(data);
}

function sliced(data) {
	var chunkSize = 30000;
	// var times = data.length / chunkSize;
	var times = 2; //? temp smaller subset

	let parts = [];


	for (let i = 0; i < times; i++) {
		let start = i === 0 ? 0 : chunkSize * (i - 1);
		let testData = data.substring(start, chunkSize * i);
		parts.push(testData);
	}

	parts.forEach((part, i) => {
		// let compromise = window.nlp(part).topics().slice(0, 10).out('frequency');

		// console.log(i, parts.length, compromise);
		// console.log(i, part, WordCount(part));
		uniqueCount(part);
	});
}

function WordCount(str) {
	return str.split(' ')
				 .filter(function(n) { return n != '' })
				 .length;
}

function uniqueCount(string) {
	var splitted = string.split(/(\r\n|\n|\r)/gm);

	console.log(splitted);
	// var words = []; 

	// for(var i=0; i<splitted.length; i++) {
	// 		words[splitted[i]] = ( typeof words[splitted[i]] != 'undefined' ) ? words[splitted[i]]+=1 : 1
	// }

	// console.log(words);
}