// sentences()
import { loadJSON, pad } from '../../helpers/loadJSON';

let storyCount = 209;
let stories = {};

let paragrahTable = {};
let sentenceTable = {};
let wordTable = {};
let wordLengthsTable = {};

for (let i = 0; i < storyCount; i++) {
  loadJSON(`../../assets/stories/${pad(i + 1, 3)}.txt`, function(response) {
		let normalisedStory = window.nlp(response).normalize().out('text');	
		normalisedStory = normalisedStory.replace(/[,\/#!$%\^&\*;:{}=\-_`~()?!]/g,"");

    let compromise = window.nlp(normalisedStory).normalize().sentences().data();
		var paragraphTest = (response.match(/[\r\n]{2,}/gm) || '').length + 1;
		var paragraphs = (response.split(/[\r\n]{2,}/gm));

		paragrahTable[i] = {
			storyId: i,
			paragraphCount: paragraphTest,
			sentenceCount: compromise.length,
			sentencesPerParagraph: [],
		};

		var test = [];

		wordLengthsTable[i] = {
			storyId: i,
			wordCountsPerSentence: [],
		}

		paragraphs.forEach((paragraph, x) => {
			test.push(window.nlp(paragraph).sentences().data().length);

			wordLengthsTable[i].wordCountsPerSentence.push([]);
			wordsPerSentence(window.nlp(paragraph).sentences().data().length, i , x, window.nlp(paragraph).sentences().data());
		});

		paragrahTable[i].sentencesPerParagraph = test;
	});
	
	// var container = document.querySelector('.test');
	// container.innerHTML = JSON.stringify();
}

function wordsPerSentence(lenght, i, x, sentences) {
	// wordLengthsTable[i][x]
	Object.keys(sentences).forEach((z) => {
		var normalisedSentence = sentences[z].normal;
		var words = normalisedSentence.split(" ");

		wordLengthsTable[i].wordCountsPerSentence[x][z] = words.length;
		// console.log(i, x, lenght, words.length);
	});

	console.log(wordLengthsTable);
	var container = document.querySelector('.test');
	container.innerHTML = JSON.stringify(wordLengthsTable);
}

function words(sentenceArray, storyIndex, raw) {
	var totalCount = 0;

	// per zin 
	Object.keys(sentenceArray).forEach((i) => {
		var target = 'devil';
		var sentence = sentenceArray[i];

		var regex = new RegExp('\\b(' + target + ')\\b', 'ig', 'a');
		var countOccurances = ((sentence || '').match(regex) || []).length;
		
		// console.log(i, countOccurances, sentence);
		console.log(storyIndex);

		var words = sentence.split(" ");

		// stories[storyIndex].sentences.push({
		// 	sentence: sentence,
		// 	index: i,
		// 	target: target,
		// 	count: countOccurances,
		// 	wordCount: WordCount(sentence),
		// 	words: words,
		// 	wordCounts: []
		// });

		totalCount += countOccurances;

		wordLengthsTable[storyIndex][i] = [];
		var testWords = [];
		wordLengthsTable[storyIndex][i].push(words.length);
		// words.forEach((word, wordI) => {
		// 	wordLengthsTable[storyIndex][i].push(word.length);
		// });

	// 
	// 
	// 
		

		// console.log(response);

		var tempWordArray = [];
		
		sentenceTable[storyIndex].wordCountPerSentence.push(words.length);

		wordTable[storyIndex].wordCountPerSentence.push(words.length);
		wordTable[storyIndex].wordsPerSentence.push(words);

		// words.forEach((word) => {
		// 	wordTable[storyIndex].lengthPerWords.push(word.length);
		// 	tempWordArray.push(word.length);
		// });

		// wordTable[storyIndex] = {
		// 	storyId: storyIndex,
		// 	wordCount: WordCount(sentence),
		// 	words: words,
		// 	wordLength: tempWordArray,
		// }
	});

	// stories[storyIndex].totalCount = totalCount;
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