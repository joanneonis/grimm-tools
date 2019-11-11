// sentences()
import { loadJSON, pad } from '../../helpers/loadJSON';

let storyCount = 2;
let stories = {};

let paragrahTable = {};
let sentenceTable = {};
let wordTable = {};

for (let i = 0; i < storyCount; i++) {
  loadJSON(`../../assets/stories/${pad(i + 1, 3)}.txt`, function(response) {
		let normalisedStory = window.nlp(response).normalize().out('text');	
		normalisedStory = normalisedStory.replace(/[,\/#!$%\^&\*;:{}=\-_`~()?!]/g,"");

    let compromise = window.nlp(normalisedStory).normalize().sentences().data();
    // let compromise = window.nlp(response).normalize().topics().slice(0, 50).out('frequency');
    // storiesAnalysed.push(compromise);
		// console.log(compromise); 

		// stories[i] = {
		// 	sentenceCount: compromise.length,
		// 	sentences: [],
		// 	paragraphCount: paragraphTest,
		// };

		// drawTable(i + 1, paragraphTest);

		var paragraphTest = (response.match(/[\r\n]{2,}/gm) || '').length + 1;
		var paragraphs = (response.split(/[\r\n]{2,}/gm));

		paragrahTable[i] = {
			storyId: i,
			paragraphCount: paragraphTest,
			sentenceCount: compromise.length,
			sentencesPerParagraph: [],
		};

		var test = [];

		paragraphs.forEach((paragraph, x) => {
			// console.log(x, paragraph);
			test.push(window.nlp(paragraph).sentences().data().length);
		});
		paragrahTable[i].sentencesPerParagraph = test;
		console.log(JSON.stringify(paragrahTable));

		// container.innerHTML = JSON.stringify(wordTable[i].superDuperTest);
		

		// paragrahTable[i] = {
		// 	storyId: i,
		// 	paragraphCount: paragraphTest,
		// 	sentenceCount: compromise.length,
		// };

		sentenceTable[i] = {
			storyId: i,
			sentenceCount: compromise.length,
			sentences: compromise,
			wordCountPerSentence: [],
		}

		wordTable[i] = {
			storyId: i,
			wordCountPerSentence: [],
			lengthPerWords: [],
			wordsPerSentence: [],
			superDuperTest: [],
		}

		
		//! cool stuff
		words(compromise, i, response);

		//! ONDLKJS
		// console.log(stories); // 11

		// console.log('paragrah', paragrahTable, 'sentences', sentenceTable, 'words', wordTable);

		// var container = document.querySelector('.test');
		// container.innerHTML = JSON.stringify(paragrahTable);
	});
	
	var container = document.querySelector('.test');
	// container.innerHTML = JSON.stringify(wordTable[i].superDuperTest);

}

// per verhaal
function words(sentenceArray, storyIndex, raw) {
	var totalCount = 0;

	// per zin 
	Object.keys(sentenceArray).forEach((i) => {
		var target = 'devil';
		var sentence = sentenceArray[i].normal;

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

		var testWords = [];
		wordTable[storyIndex].superDuperTest.push(testWords);
		words.forEach((word, wordI) => {
			wordTable[storyIndex].superDuperTest[i].push(word.length);
		});

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