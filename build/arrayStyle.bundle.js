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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/findArray/main.js");
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

/***/ "./tools/findArray/main.js":
/*!*********************************!*\
  !*** ./tools/findArray/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/loadJSON */ "./helpers/loadJSON.js");

var allStories = [];
var storyIndex;
var searchWords;
var maxStoryCount = 209;
/**
 * Load stories titles
 */
// ! TODO to promise chain

Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])('../../assets/filterArrays/characters-names.json', function (response) {
  searchWords = JSON.parse(response);
  loadIndexes();
}, 'json');

function loadIndexes() {
  Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])('../../assets/stories/index.json', function (response) {
    storyIndex = JSON.parse(response);
    loadStories(maxStoryCount);
  }, 'json');
}
/**
 * @param { Number } maxStories
 * Load stories from 0 to maxStories
 */


function loadStories(maxStories) {
  var _loop = function _loop(i) {
    Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])("../../assets/stories/".concat(Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["pad"])(i + 1, 3), ".txt"), function (response) {
      var normalisedStory = window.nlp(response).normalize().out('text');
      normalisedStory = normalisedStory.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?!]/g, "");
      var storyArray = normalisedStory.toString().split(' '); // normalisedStory.replace(/\s{2,}/g," ");

      allStories.push({
        title: storyIndex[i].title,
        index: i,
        story: response,
        storyArray: storyArray,
        storyLength: storyArray.length,
        words: []
      });

      if (i === maxStories - 1) {
        allStories.sort(function (a, b) {
          return a.index < b.index ? -1 : 1;
        });
        init();
      }

      ;
    });
  };

  for (var i = 0; i < maxStories; i++) {
    _loop(i);
  }
}
/**
 * Runs when stories are loaded
 */


function init() {
  allStories.forEach(function (storyObj, index) {
    startWordCounts(index);
    wordsToHtml(index);
  });
}

function startWordCounts(storyIndex) {
  searchWords.forEach(function (wordToSearch, index) {
    sentences(index, wordToSearch, storyIndex);

    if (index === searchWords.length - 1) {
      allStories[storyIndex].words.sort(function (a, b) {
        return a.count > b.count ? -1 : 1;
      });
    }
  });
}

function wordsToHtml(storyIndex) {
  var story = allStories[storyIndex];
  var outer = document.createElement('section');
  outer.classList.add('story-container');
  var title = document.createElement('h3');
  title.innerHTML = story.title;
  var container = document.createElement("table");
  container.classList.add("word-".concat(storyIndex));
  container.innerHTML = "\n\t\t<tr>\n\t\t\t<th>ID</th>\n      <th>word</th>\n\t\t\t<th>count</th>\n\t\t\t<th>story length</th>\n      <th>senteces</th>\n    </tr>\n  ";
  document.querySelector('.container').appendChild(outer);
  outer.appendChild(title);
  outer.appendChild(container);
  story.words.forEach(function (word, i) {
    var listItem = document.createElement("tr");
    listItem.innerHTML = "\n\t\t\t<td>".concat(story.index, "</td>\n      <td>").concat(word.word, "</td>\n\t\t\t<td>").concat(word.count, "</td>\n\t\t\t<td>").concat(story.storyLength, "</td>\n\t\t\t\n\t\t\t<td class=\"sentences sentences-").concat(i, "\">\n\t\t\t\t<table>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Index</th>\n\t\t\t\t\t\t<th>Sentence</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t</td>\n\t\t");
    document.querySelector(".word-".concat(storyIndex)).appendChild(listItem);
    word.senteces.forEach(function (sentence, x) {
      var item = document.createElement("tr");
      item.innerHTML = "\n\t\t\t\t<td>".concat(word.indexes[x], "</td>\n\t\t\t\t<td>").concat(sentence, "</td>\n\t\t\t");
      document.querySelector(".word-".concat(storyIndex, " .sentences-").concat(i, " table")).appendChild(item);
    });
  });
}

function sentences(i, searchFor, storyIndex) {
  var story = allStories[storyIndex];
  var indexes = getAllIndexes(story.storyArray, searchFor);
  var count = indexes.length;
  if (count === 0) return;
  story.words.push({
    word: searchFor,
    count: count,
    senteces: [],
    indexes: indexes
  });
  var current = story.words.length - 1;
  if (count === 0) return;
  indexes.forEach(function (index) {
    story.words[current].senteces.push("".concat(story.storyArray[index - 1], " ").concat(story.storyArray[index], " ").concat(story.storyArray[index + 1]));
  });
}

function getAllIndexes(arr, val) {
  var indexes = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) indexes.push(i);
  }

  return indexes;
}

/***/ })

/******/ });
//# sourceMappingURL=arrayStyle.bundle.js.map