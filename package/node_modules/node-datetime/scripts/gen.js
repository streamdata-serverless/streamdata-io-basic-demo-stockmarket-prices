'use strict';

var fs = require('fs');

var RELEASE_PATH = __dirname + '/../release/browser/node_datetime.js';
var SRC_PATH = __dirname + '/../src/';
var INDEX_PATH = __dirname + '/../index.js';
var TEMPLATE_PATH = __dirname + '/../src/browser_templates/main.tpl';
var DATETIME_TAG = 'var DateTime = require(\'./src/datetime\');';
var TIMEDNUMBER_TAG = 'var TimedNumber = require(\'./src/timednumber\');';
var TIMEDSTATE_TAG = 'var TimedState = require(\'./src/timedstate\');';
var TEMPLATE_TAG = '$(INDEX)';
var EXPORTS_TAG = 'module.exports = ';

// load index.js
var indexData = fs.readFileSync(INDEX_PATH, 'utf8');

// load datetime
var dateTimeData = fs.readFileSync(SRC_PATH + 'datetime.js', 'utf8');
// remove module.exports = DateTime;
dateTimeData = dateTimeData.replace(EXPORTS_TAG + 'DateTime;', '');

// load timednumber
var timedNumberData = fs.readFileSync(SRC_PATH + 'timednumber.js', 'utf8');
// remove module.exports = TimedNumber;
timedNumberData = timedNumberData.replace(EXPORTS_TAG + 'TimedNumber;', '');

// load datetime
var timedStateData = fs.readFileSync(SRC_PATH + 'timedstate.js', 'utf8');
// remove module.exports = TimedNumber;
timedStateData = timedStateData.replace(EXPORTS_TAG + 'TimedState;', '');

// add datetime, timednumber, and timedstate to indexDate
indexData = indexData.replace(DATETIME_TAG, dateTimeData);
indexData = indexData.replace(TIMEDNUMBER_TAG, timedNumberData);
indexData = indexData.replace(TIMEDSTATE_TAG, timedStateData);

// load template
var template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// add the code to the template
template = template.replace(TEMPLATE_TAG, indexData);

// remove all "use strict"
template = template.replace(/'use strict';\n/g, '');

// remove all comments with /* */
template = template.replace(/\/\*([\s\S]*?)\*\//g, '');

// remove all comments with //
template = template.replace(/\/\/(.*)$/gm, '');

// remove all line breaks and tabs
template = template.replace(/(\n|\t)/g, '');

// create the browser code
fs.writeFileSync(RELEASE_PATH, template, 'utf8');

