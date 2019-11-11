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
	console.log('djsf');

  // var regex = new RegExp('(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])');
  // // text = text.replace(regex, "<span class=\"highlight\" style=\"background-color: ".concat(randomColor, "\">$1</span>")); // text = text.replace(/target/g, "a");

	// var countOccurances = ((data || '').match(regex) || []).length;
	
	// console.log(countOccurances);


	let freq = {};
	data.replace(/[\u{1F300}-\u{1F6FF}]/gu, char => freq[char] = (freq[char] || 0) + 1);

	// console.log(freq);

	// sortByCount(freq);

	var arr = sortObject(freq);
	console.log('sorted', arr);

	arr.forEach((row) => {
		addToTable(row);
	});
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
	//arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
	return arr; // returns array
}

// return a.storyLength < b.storyLength ? -1 : 1;

function addToTable(row) {
	var table = document.querySelector('table');
	var tr = document.createElement('tr');

	tr.innerHTML = `
		<td>${row.key}</td>
		<td>${row.value}</td>
	`;

	table.appendChild(tr);
}
