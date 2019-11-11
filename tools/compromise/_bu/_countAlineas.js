// sentences()
import { loadJSON, pad } from '../../helpers/loadJSON';

let storyCount = 1;
let stories = {};

for (let i = 0; i < storyCount; i++) {
  loadJSON(`../../assets/stories/${pad(i + 1, 3)}.txt`, function(response) {
		let normalisedStory = window.nlp(response).normalize().out('text');	
		normalisedStory = normalisedStory.replace(/[,\/#!$%\^&\*;:{}=\-_`~()?!]/g,"");

    let compromise = window.nlp(normalisedStory).normalize().sentences().data();
    // let compromise = window.nlp(response).normalize().topics().slice(0, 50).out('frequency');
    // storiesAnalysed.push(compromise);
		// console.log(compromise); 

		var paragraphTest = (response.match(/[\r\n]{2,}/gm) || '').length + 1;

		// console.log(response);

		stories[i] = {
			sentenceCount: compromise.length,
			sentences: [],
			paragraphCount: paragraphTest,
		};

		drawTable(i, paragraphTest);
		
		//! cool stuff
		// words(compromise, i);

		//! ONDLKJS
		console.log(stories); // 11
  });
}

function words(sentenceArray, storyIndex) {
	var totalCount = 0;

	Object.keys(sentenceArray).forEach((i) => {
		var target = 'devil';
		var sentence = sentenceArray[i].normal;

		var regex = new RegExp('\\b(' + target + ')\\b', 'ig', 'a');
		var countOccurances = ((sentence || '').match(regex) || []).length;
		
		// console.log(i, countOccurances, sentence);
		console.log(storyIndex);

		var words = sentence.split(" ");

		stories[storyIndex].sentences.push({
			sentence: sentence,
			index: i,
			target: target,
			count: countOccurances,
			wordCount: WordCount(sentence),
			words: words,
			wordCounts: []
		});

		words.forEach((word) => {
			stories[storyIndex].sentences[i].wordCounts.push(word.length);
		});

		totalCount += countOccurances;
	});

	stories[storyIndex].totalCount = totalCount;
}

function WordCount(str) { 
  return str.split(" ").length;
}

function drawTable(storyId, count) {
	var table = document.querySelector('table');

	var listItem = document.createElement("tr");

	var rowContent = `
		<td>
			${storyId}
		</td>
		<td>
			${count}
		</td>
	`;

	listItem.innerHTML = rowContent;

	table.appendChild(listItem);
}