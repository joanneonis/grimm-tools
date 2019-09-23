import { loadJSON, pad } from '../../helpers/loadJSON';

let allStories = [];
let storyIndex;
let searchWords;
let maxStoryCount = 10; 

/**
 * Load stories titles
 */
// ! TODO to promise chain
loadJSON('../../assets/handFiltered/animals2.json', (response) => {
	searchWords = JSON.parse(response);

	loadIndexes();
}, 'json');

function loadIndexes() {
	loadJSON('../../assets/stories/index.json', (response) => {
		storyIndex = JSON.parse(response);
	
		loadStories(maxStoryCount);
	}, 'json');
}

/**
 * @param { Number } maxStories
 * Load stories from 0 to maxStories
 */
function loadStories(maxStories) {
  for (let i = 0; i < maxStories; i++) {
    loadJSON(`../../assets/stories/${pad(i + 1, 3)}.txt`, (response) => {
			let normalisedStory = window.nlp(response).normalize().out('text');	
			normalisedStory = normalisedStory.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?!]/g,"");
			let storyArray = normalisedStory.toString().split(' ');
			// normalisedStory.replace(/\s{2,}/g," ");

			allStories.push(
				{
					title: storyIndex[i].title,
					index: i,
					story: response,
					storyArray: storyArray,
					storyLength: storyArray.length,
					words: [],
				}
			);
  
      if (i === maxStories - 1) {
				allStories.sort(function (a, b) {
					return a.index < b.index ? -1 : 1;
				});

				init()
			};
    });
  }  
}

/**
 * Runs when stories are loaded
 */
function init() {
	allStories.forEach((storyObj, index) => {
		startWordCounts(index);
		wordsToHtml(index);
	});
}

function startWordCounts(storyIndex) {
	searchWords.forEach((wordToSearch, index) => {
		sentences(index, wordToSearch, storyIndex);

		if (index === searchWords.length - 1) {
			allStories[storyIndex].words.sort(function (a, b) {
				return a.count > b.count ? -1 : 1;
			});
		}
	});
}

function wordsToHtml(storyIndex) {
	let story = allStories[storyIndex];

	var outer = document.createElement('section');
  outer.classList.add('story-container');
  var title = document.createElement('h3');
  title.innerHTML = story.title;
  var container = document.createElement("table");
  container.classList.add(`word-${storyIndex}`);
  container.innerHTML = `
		<tr>
			<th>ID</th>
      <th>word</th>
			<th>count</th>
			<th>story length</th>
      <th>senteces</th>
    </tr>
  `;

  document.querySelector('.container').appendChild(outer);
  outer.appendChild(title);
  outer.appendChild(container);

	story.words.forEach((word, i) => {
    var listItem = document.createElement("tr");
    
		listItem.innerHTML = `
			<td>${story.index}</td>
      <td>${word.word}</td>
			<td>${word.count}</td>
			<td>${story.storyLength}</td>
			
			<td class="sentences sentences-${i}">
				<table>
					<tr>
						<th>Index</th>
						<th>Sentence</th>
					</tr>
				</table>
			</td>
		`;

		document.querySelector(`.word-${storyIndex}`).appendChild(listItem);
		
		word.senteces.forEach((sentence, x) => {
			let item = document.createElement("tr");
			item.innerHTML = `
				<td>${word.indexes[x]}</td>
				<td>${sentence}</td>
			`;
			document.querySelector(`.word-${storyIndex} .sentences-${i} table`).appendChild(item);
		});
		
  });
}

function sentences(i, searchFor, storyIndex) {
	let story = allStories[storyIndex];
	let indexes = getAllIndexes(story.storyArray, searchFor);
	let count = indexes.length;

	if (count === 0) return;

	story.words.push({
		word: searchFor,
		count: count,
		senteces: [],
		indexes: indexes,
	});

	let current = story.words.length - 1;

	if (count === 0) return;

	indexes.forEach((index) => {
		story.words[current].senteces.push(
			`${story.storyArray[index - 1]} ${story.storyArray[index]} ${story.storyArray[index + 1]}`
		);
	});
}

function getAllIndexes(arr, val) {
	var indexes = [];
	for(let i = 0; i < arr.length; i++)
			if (arr[i] === val)
					indexes.push(i);
	return indexes;
}
