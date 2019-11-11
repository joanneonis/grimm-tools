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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/emojicount/main.js");
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

/***/ "./tools/emojicount/main.js":
/*!**********************************!*\
  !*** ./tools/emojicount/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_loadJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/loadJSON */ "./helpers/loadJSON.js");


function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // use the 1st file from the list

  var f = files[0];
  var reader = new FileReader(); // Closure to capture the file information.

  reader.onload = function () {
    return function (e) {
      // animalData = JSON.parse(e.target.result);
      // console.log('uploaded', e.target.result);
      countEmojis(e.target.result);
    };
  }(f); // Read in the image file as a data URL.


  reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

function countEmojis(data) {
  console.log('djsf'); // var regex = new RegExp('(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])');
  // // text = text.replace(regex, "<span class=\"highlight\" style=\"background-color: ".concat(randomColor, "\">$1</span>")); // text = text.replace(/target/g, "a");
  // var countOccurances = ((data || '').match(regex) || []).length;
  // console.log(countOccurances);

  var freq = {};
  data.replace(/(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDEFF])/g, function (_char) {
    return freq[_char] = (freq[_char] || 0) + 1;
  }); // console.log(freq);
  // sortByCount(freq);

  var arr = sortObject(freq);
  console.log('sorted', arr);
  arr.forEach(function (row) {
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

  arr.sort(function (a, b) {
    return a.value > b.value ? -1 : 1;
  }); //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings

  return arr; // returns array
} // return a.storyLength < b.storyLength ? -1 : 1;


function addToTable(row) {
  var table = document.querySelector('table');
  var tr = document.createElement('tr');
  tr.innerHTML = "\n\t\t<td>".concat(row.key, "</td>\n\t\t<td>").concat(row.value, "</td>\n\t");
  table.appendChild(tr);
}

/***/ })

/******/ });
//# sourceMappingURL=emoji.bundle.js.map