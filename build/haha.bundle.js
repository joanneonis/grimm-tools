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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/haha/main.js");
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

/***/ "./tools/haha/main.js":
/*!****************************!*\
  !*** ./tools/haha/main.js ***!
  \****************************/
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
      // haha
      // countEmojis(e.target.result);
      // splitToMonths(e.target.result);
      // console.log(e.target.result);
      splitMessages(e.target.result);
    };
  }(f); // Read in the image file as a data URL.


  reader.readAsText(f);
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

function countEmojis(data) {
  var freq = {}; // data.replace(/[\u{1F300}-\u{1F6FF}]/gu, char => freq[char] = (freq[char] || 0) + 1);
  //? haha hahaha

  data.replace(/(ha){2,35}/g, function (_char) {
    return freq[_char] = (freq[_char] || 0) + 1;
  });
  var arr = sortObject(freq);
  arr.forEach(function (row) {
    addToTable(row);
  }); // compromiseStuff(data);
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
  });
  return arr;
}

function addToTable(row) {
  var table = document.querySelector('table');
  var tr = document.createElement('tr');
  tr.innerHTML = "\n\t\t<td>".concat(row.key, "</td>\n\t\t<td>").concat(row.value, "</td>\n\t");
  table.appendChild(tr);
}

function splitToMonths(string) {
  var splitted = string.split(/(\r\n|\n|\r)/gm);
  var cleaned = splitted.filter(function (el) {
    return el.trim();
  });
  var yearArray = {
    10: new Array(12).fill([]),
    11: new Array(12).fill([]),
    12: new Array(12).fill([]),
    13: new Array(12).fill([]),
    14: new Array(12).fill([]),
    15: new Array(12).fill([]),
    16: new Array(12).fill([]),
    17: new Array(12).fill([]),
    18: new Array(12).fill([]),
    19: new Array(12).fill([])
  };
  console.log(yearArray);
  cleaned.forEach(function (message) {
    var year = message.substr(nthIndex(message, '/', 2) + 1, 2);
    var monthRough = parseInt(message.substr(message.indexOf('/') + 1, 2));
    var month = monthRough >= 1 && monthRough <= 12 ? monthRough : 0;

    if (parseInt(year) >= 10 && parseInt(year) <= 19 && month > 0) {
      console.log(month - 1);
      yearArray[year][month - 1].push(message);
    }
  });
  console.log(yearArray);
}

function nthIndex(str, pat, n) {
  var L = str.length,
      i = -1;

  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }

  return i;
} // function splitMessages(string) {
// 	var splitted = string.split(/(\r\n|\n|\r)/gm);
// 	var messages = splitted.filter(el => el.trim());
// 	var yearArray = {
// 		10: new Array(12).fill([]),
// 		11: new Array(12).fill([]),
// 		12: new Array(12).fill([]),
// 		13: new Array(12).fill([]),
// 		14: new Array(12).fill([]),
// 		15: new Array(12).fill([]),
// 		16: new Array(12).fill([]),
// 		17: new Array(12).fill([]),
// 		18: new Array(12).fill([]),
// 		19: new Array(12).fill([]),
// 	};
// 	console.log(messages);
// 	messages.forEach((message) => {
// 		const year = message.substr(nthIndex(message,'/',2) + 1, 2); 
// 		const monthRough = parseInt(message.substr(message.indexOf('/') + 1, 2));
// 		const month = monthRough >= 1 && monthRough <= 12 ? monthRough : 0; 
// 		const isMessage = message.substr(nthIndex(message,'/',2) + 3, 1) === ',' && month > 0 ? true : false;
// 		if (isMessage) {
// 			var date = new Date(Date.parse(message.split(', ')[0]));
// 			yearArray[date.getFullYear() -][monthIndex].push(message);
// 		}
// 	});
// 	console.log(yearArray);
// }


function splitMessages(string) {
  var splitted = string.split(/(\r\n|\n|\r)/gm);
  var messages = splitted.filter(function (el) {
    return el.trim();
  });
  var yearArray = {
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: []
  };
  messages.forEach(function (message) {
    var messageParts = message.split(', ');
    var isMessage = message.substr(nthIndex(message, '/', 2) + 3, 1) === ',';
    var ts = Date.parse(messageParts.length > 0 && isMessage ? messageParts[0] : 0);
    var date = new Date(ts);

    if (ts && date.getFullYear() > 2000) {
      yearArray[date.getFullYear() - 2000].push({
        date: date,
        month: date.getMonth(),
        message: message
      });
    }
  });
  partTwo(yearArray);
}

function partTwo(yearArray) {
  var yearArrayDup = {
    10: new Array(12).fill([]),
    11: new Array(12).fill([]),
    12: new Array(12).fill([]),
    13: new Array(12).fill([]),
    14: new Array(12).fill([]),
    15: new Array(12).fill([]),
    16: new Array(12).fill([]),
    17: new Array(12).fill([]),
    18: new Array(12).fill([]),
    19: new Array(12).fill([])
  };
  var years = Object.keys(yearArray);
  var finalData = {};
  years.forEach(function (year) {
    if (yearArray[year].length === 0) return;
    var monthArray = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: []
    }; // console.log(year, yearArray[year][0].month);

    yearArray[year].forEach(function (mess) {
      monthArray[mess.month].push(mess);
    });
    finalData[year] = monthArray; // let freq = {};
    // data.replace(/(ha){2,35}/g, char => freq[char.message] = (freq[char.message] || 0) + 1);
  });
  console.log(finalData);
  countFinal(finalData);
}

function countFinal(yearArray) {
  var finalCountData = {};
  var years = Object.keys(yearArray);
  years.forEach(function (year) {
    var months = Object.keys(yearArray[year]);
    var monthCount = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: []
    };
    months.forEach(function (month) {
      var data = yearArray[year][month].map(function (a) {
        return a.message;
      }).join('').toLowerCase();
      var freq = {};
      data.replace(/(ha){2,35}/g, function (_char2) {
        return freq[_char2] = (freq[_char2] || 0) + 1;
      });
      monthCount[month] = freq;
    });
    finalCountData[year] = monthCount;
  });
  toTable(finalCountData);
}

function toTable(yearMonthData) {
  var years = Object.keys(yearMonthData);
  years.forEach(function (year) {
    var months = Object.keys(yearMonthData[year]);
    var table = document.createElement('table');
    months.forEach(function (month) {
      var tr = document.createElement('tr');
      var hahas = Object.keys(yearMonthData[year][month]);
      var yearCell = document.createElement('td');
      yearCell.innerHTML = year;
      var monthCell = document.createElement('td');
      monthCell.innerHTML = getMonthName(month);
      var hahaCell = document.createElement('td');
      var hahtable = document.createElement('table');
      hahas.forEach(function (haha) {
        var tr = document.createElement('tr');
        var hahCell = document.createElement('td');
        hahCell.innerHTML = "\n\t\t\t\t\t".concat(haha, " : ").concat(yearMonthData[year][month][haha], "\n\t\t\t\t");
        tr.appendChild(hahCell);
        hahtable.appendChild(tr);
      });
      hahaCell.appendChild(hahtable);
      tr.appendChild(yearCell);
      tr.appendChild(monthCell);
      tr.appendChild(hahaCell);
      table.appendChild(tr);
      document.querySelector('.container').appendChild(table);
    });
  });
} //? should be for each month..
// let freq = {};
// data.replace(/(ha){2,35}/g, char => freq[char.message] = (freq[char.message] || 0) + 1);


function getMonthName(monthNumber) {
  return new Date(2018, parseInt(monthNumber)).toLocaleString('nl', {
    month: 'long'
  });
}

/***/ })

/******/ });
//# sourceMappingURL=haha.bundle.js.map