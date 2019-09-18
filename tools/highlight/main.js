import { loadJSON, pad } from '../../helpers/loadJSON';

let animalData;

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// use the 1st file from the list
	let f = files[0];

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = (() => {
			return function(e) {
				animalData = JSON.parse(e.target.result);
				console.log('uploaded', animalData);
				listAnimals(animalData);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

/*
	THE REST
*/

let storyIndex;
let storyCount = 10; // 209
let storyMin = 0;
let stories = [];
let storiesCombined = '';
let animalCounts = [];

const fullTextContainer = document.querySelector('.stories-combined');
// let storyCount = document.getElementById('upload');

document.getElementById('storyMax').addEventListener('change', function(e) {
	storyCount = e.srcElement.value;
}, false);

document.getElementById('storyMin').addEventListener('change', function(e) {
	storyMin = e.srcElement.value;
}, false);

document.getElementById('load').addEventListener('click', function() {
	loadStories();
});

function loadStories() {
	loadJSON('../../assets/stories/index.json', (response) => {
		storyIndex = JSON.parse(response);
	}, 'json');

  for (let i = storyMin; i < storyCount; i++) {
    loadJSON(`../../assets/stories/${pad(i + 1, 3)}.txt`, (response) => {
      // store seperate stories
      stories.push(response);
  
      if (i === 0) {
        storiesCombined = `<span class="story"><span class="title">${storyIndex[i].title}</span>${response}</span>`
      } else {
        storiesCombined = `
          ${storiesCombined}
          <span class="story">
            <span class="title">${storyIndex[i].title}</span>
            ${response}
          </span>
        `;
      }
  
      if (i === storyCount - 1) init();
    });
  }  
}


function init() {
	fullTextContainer.innerHTML = storiesCombined;
	document.querySelector('.upload').style.display = 'block';
}

//?-----------

function highLight(target, textContainer, i) {
	let randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  var item = textContainer;
  var text = item.innerHTML; // textcontent
  var featuredWords = item.querySelectorAll('.highlight');
  
  var words = Array.prototype.slice.call(featuredWords, 0).map(function(node) {
    return node.textContent;  
  })
  
  // first highlight
  var regex = new RegExp('\\b(' + target + ')\\b', 'ig', 'a');
  text = text.replace(regex, `<span class="highlight" style="background-color: ${randomColor}">$1</span>`);
  // text = text.replace(/target/g, "a");

  var countOccurances = ((text || '').match(regex) || []).length;

  animalCounts[i].count = countOccurances;

  // put the previous words back 
  // words.forEach(function(word) {
  //   console.log(words);
  //   text = text.replace(word, `<span class="highlight">${word}</span>`); 
  // });
  
  item.innerHTML = text;
}

//?------------------

function listAnimals(data) {
  let container = document.querySelector('#animals');

  
  data.forEach((text, i) => {
    let storyContainer = document.querySelector('.stories-combined'); 
    
    animalCounts.push({ animal: text });
    highLight(text, storyContainer, i);
  });
  
  animalCounts.sort((a, b) => (a.count > b.count) ? -1 : 1);
  animalCounts.forEach((item, i) => {
    var listItem = document.createElement("tr");
    listItem.classList.add(`animal-${i}`);
    
    listItem.innerHTML = `
      <td>${item.animal}</td>
      <td>${item.count}</td>
    `;

    container.appendChild(listItem);
  });
}