/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/compromise/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./helpers/loadJSON.js":
/*!*****************************!*\
  !*** ./helpers/loadJSON.js ***!
  \*****************************/
/*! exports provided: loadJSON, pad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJSON", function() { return loadJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return pad; });
function loadJSON(fileName, callback, type) {
  var xobj = new XMLHttpRequest();

  if (type === 'json') {
    xobj.overrideMimeType("application/json");
  }

  xobj.open('GET', fileName, true);

  xobj.onreadystatechange = function (e) {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
      console.log("loaded ".concat(fileName, " - ").concat(timeStampToTime(e.timeStamp)));
    }
  };

  xobj.send(null);
}
function pad(num, size) {
  var s = num + "";

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}

function timeStampToTime(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000); // Hours part from the timestamp

  var hours = date.getHours(); // Minutes part from the timestamp

  var minutes = "0" + date.getMinutes(); // Seconds part from the timestamp

  var seconds = "0" + date.getSeconds();
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

/***/ }),

/***/ "./tools/compromise/main.js":
/*!**********************************!*\
  !*** ./tools/compromise/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/loadJSON */ "./helpers/loadJSON.js");
// sentences()

var storyCount = 209;
var stories = {};
var paragrahTable = {};
var sentenceTable = {};
var wordTable = {};
var wordLengthsTable = {};

var _loop = function _loop(i) {
  Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])("../../assets/stories/".concat(Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["pad"])(i + 1, 3), ".txt"), function (response) {
    var normalisedStory = window.nlp(response).normalize().out('text');
    normalisedStory = normalisedStory.replace(/[,\/#!$%\^&\*;:{}=\-_`~()?!]/g, "");
    var compromise = window.nlp(normalisedStory).normalize().sentences().data();
    var paragraphTest = (response.match(/[\r\n]{2,}/gm) || '').length + 1;
    var paragraphs = response.split(/[\r\n]{2,}/gm);
    paragrahTable[i] = {
      storyId: i,
      paragraphCount: paragraphTest,
      sentenceCount: compromise.length,
      sentencesPerParagraph: []
    };
    var test = [];
    wordLengthsTable[i] = {
      storyId: i,
      wordCountsPerSentence: []
    };
    paragraphs.forEach(function (paragraph, x) {
      test.push(window.nlp(paragraph).sentences().data().length); //? Word stuff
      // wordLengthsTable[i].wordCountsPerSentence.push([]);
      // wordsPerSentence(window.nlp(paragraph).sentences().data().length, i , x, window.nlp(paragraph).sentences().data());
    });
    paragrahTable[i].sentencesPerParagraph = test;
    var container = document.querySelector('.test');
    container.innerHTML = JSON.stringify(paragrahTable);
  });
};

for (var i = 0; i < storyCount; i++) {
  _loop(i);
}

function wordsPerSentence(lenght, i, x, sentences) {
  // wordLengthsTable[i][x]
  Object.keys(sentences).forEach(function (z) {
    var normalisedSentence = sentences[z].normal;
    var words = normalisedSentence.split(" ");
    wordLengthsTable[i].wordCountsPerSentence[x][z] = words.length; // console.log(i, x, lenght, words.length);
  });
  console.log(wordLengthsTable);
  var container = document.querySelector('.test');
  container.innerHTML = JSON.stringify(wordLengthsTable);
}

function words(sentenceArray, storyIndex, raw) {
  var totalCount = 0; // per zin 

  Object.keys(sentenceArray).forEach(function (i) {
    var target = 'devil';
    var sentence = sentenceArray[i];
    var regex = new RegExp('\\b(' + target + ')\\b', 'ig', 'a');
    var countOccurances = ((sentence || '').match(regex) || []).length; // console.log(i, countOccurances, sentence);

    console.log(storyIndex);
    var words = sentence.split(" "); // stories[storyIndex].sentences.push({
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
    wordLengthsTable[storyIndex][i].push(words.length); // words.forEach((word, wordI) => {
    // 	wordLengthsTable[storyIndex][i].push(word.length);
    // });
    // 
    // 
    // 
    // console.log(response);

    var tempWordArray = [];
    sentenceTable[storyIndex].wordCountPerSentence.push(words.length);
    wordTable[storyIndex].wordCountPerSentence.push(words.length);
    wordTable[storyIndex].wordsPerSentence.push(words); // words.forEach((word) => {
    // 	wordTable[storyIndex].lengthPerWords.push(word.length);
    // 	tempWordArray.push(word.length);
    // });
    // wordTable[storyIndex] = {
    // 	storyId: storyIndex,
    // 	wordCount: WordCount(sentence),
    // 	words: words,
    // 	wordLength: tempWordArray,
    // }
  }); // stories[storyIndex].totalCount = totalCount;
}

function WordCount(str) {
  return str.split(" ").length;
}

function drawTable(storyId, count) {
  var table = document.querySelector('table');
  var listItem = document.createElement("tr");
  var rowContent = "\n\t\t<td>\n\t\t\t".concat(storyId, "\n\t\t</td>\n\t\t<td>\n\t\t\t").concat(count, "\n\t\t</td>\n\t");
  listItem.innerHTML = rowContent;
  table.appendChild(listItem);
}

/***/ })

/******/ });
//# sourceMappingURL=sentences.bundle.js.map