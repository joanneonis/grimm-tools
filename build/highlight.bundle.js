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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/highlight/main.js");
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

/***/ "./tools/highlight/main.js":
/*!*********************************!*\
  !*** ./tools/highlight/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/loadJSON */ "./helpers/loadJSON.js");

var animalData;

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // use the 1st file from the list

  var f = files[0];
  var reader = new FileReader(); // Closure to capture the file information.

  reader.onload = function () {
    return function (e) {
      animalData = JSON.parse(e.target.result);
      console.log('uploaded', animalData);
      listAnimals(animalData);
    };
  }(f); // Read in the image file as a data URL.


  reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);
/*
	THE REST
*/

var storyIndex;
var storyCount = 10; // 209

var storyMin = 0;
var stories = [];
var storiesCombined = '';
var animalCounts = [];
var fullTextContainer = document.querySelector('.stories-combined'); // let storyCount = document.getElementById('upload');

document.getElementById('storyMax').addEventListener('change', function (e) {
  storyCount = e.srcElement.value;
}, false);
document.getElementById('storyMin').addEventListener('change', function (e) {
  storyMin = e.srcElement.value;
}, false);
document.getElementById('load').addEventListener('click', function () {
  loadStories();
});

function loadStories() {
  Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])('../../assets/stories/index.json', function (response) {
    storyIndex = JSON.parse(response);
  }, 'json');

  var _loop = function _loop(i) {
    Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["loadJSON"])("../../assets/stories/".concat(Object(_helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__["pad"])(i + 1, 3), ".txt"), function (response) {
      // store seperate stories
      stories.push(response);

      if (i === 0) {
        storiesCombined = "<span class=\"story\"><span class=\"title\">".concat(storyIndex[i].title, "</span>").concat(response, "</span>");
      } else {
        storiesCombined = "\n          ".concat(storiesCombined, "\n          <span class=\"story\">\n            <span class=\"title\">").concat(storyIndex[i].title, "</span>\n            ").concat(response, "\n          </span>\n        ");
      }

      if (i === storyCount - 1) init();
    });
  };

  for (var i = storyMin; i < storyCount; i++) {
    _loop(i);
  }
}

function init() {
  fullTextContainer.innerHTML = storiesCombined;
  document.querySelector('.upload').style.display = 'block';
} //?-----------


function highLight(target, textContainer, i) {
  var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  var item = textContainer;
  var text = item.innerHTML; // textcontent

  var featuredWords = item.querySelectorAll('.highlight');
  var words = Array.prototype.slice.call(featuredWords, 0).map(function (node) {
    return node.textContent;
  }); // first highlight

  var regex = new RegExp('\\b(' + target + ')\\b', 'ig', 'a');
  text = text.replace(regex, "<span class=\"highlight\" style=\"background-color: ".concat(randomColor, "\">$1</span>")); // text = text.replace(/target/g, "a");

  var countOccurances = ((text || '').match(regex) || []).length;
  animalCounts[i].count = countOccurances; // put the previous words back 
  // words.forEach(function(word) {
  //   console.log(words);
  //   text = text.replace(word, `<span class="highlight">${word}</span>`); 
  // });

  item.innerHTML = text;
} //?------------------


function listAnimals(data) {
  var container = document.querySelector('#animals');
  data.forEach(function (text, i) {
    var storyContainer = document.querySelector('.stories-combined');
    animalCounts.push({
      animal: text
    });
    highLight(text, storyContainer, i);
  });
  animalCounts.sort(function (a, b) {
    return a.count > b.count ? -1 : 1;
  });
  animalCounts.forEach(function (item, i) {
    var listItem = document.createElement("tr");
    listItem.classList.add("animal-".concat(i));
    listItem.innerHTML = "\n      <td>".concat(item.animal, "</td>\n      <td>").concat(item.count, "</td>\n    ");
    container.appendChild(listItem);
  });
}

/***/ })

/******/ });
//# sourceMappingURL=highlight.bundle.js.map