/*jslint node:true nomen:true */
/*
EWStat - Statistics library
*/

// support running as a commonJS module or in a browser
if (typeof module === 'undefined') { var module = {exports: {}}; }

function EWStat() {
    "use strict";
    // helper function
    function numericalComparator (a,b) {return a-b;}
    function filter(list, fxn) {
        var newlist=[];
        for (var i=0;i<list.length;i++) {
            if (fxn(list[i])) {
                newlist.push(list[i]);
            }
        }
        return newlist;
    };
    function map(list, fxn) {
        var newlist=[];
        for (var i=0;i<list.length;i++) {
            newlist.push(fxn(list[i]));
        }
        return newlist;
    }
    // applies fxn to list, no return value
    // useful for side-effects
    function forEach(list, fxn) {
        for (var i=0;i<list.length;i++) {
            fxn(list[i]);
        }
    }

    var samples = [], // array of samples (objects)
        fields = {}; // array of arrays of field values

    // helper functions
    function isEven (num) { return num%2 === 0; }
    function isOdd (num) { return !isEven(num); }

    // sample is a javascript object w/any number of fields
    this.addSample = function (sample) {
        samples.push(sample);
        for (var i in sample) {
            if (!fields[i]) fields[i]=[];
            fields[i].push(sample[i]);
        };
    };

    this.getSample = function (num) {
        return samples[num];
    }; // getSample

    this.getSamples = function () {
        return samples;
    }; // getSamples

    // count of samples
    this.__defineGetter__("count", function() { return samples.length; });

    // list of fields
    this.__defineGetter__("fieldNames", function() {
        var fieldNames = [];
        for (var i in fields) fieldNames.push(i);
        return fieldNames;
    });

    // standard deviation
    this.standardDeviation = function (field) {
        var mean = this.mean(field),
        diffSquared = function(n) {
            return Math.pow((n-mean),2);
        },
        sum = 0,
        doSum = function(sample) {
            sum += diffSquared(sample[field]);
        };
        forEach(samples, doSum);
        return Math.sqrt(sum / this.count);
    };


    this.dump = function () {
        console.log(samples);
    };

    this.mean = function (field) {
        var sampleArr=fields[field], sum=0;
        for (var i=0;i<sampleArr.length;i++) {
            sum+=sampleArr[i];
        }
        return sum/samples.length;
    };

    this.median = function (field) {
        var count = samples.length,
            fieldArr = fields[field].sort(numericalComparator);
        if (isOdd(count)) { // there is a midpoint
            return fieldArr[(count-1)/2];
        } else { // even length so average
            var midpoint0 = fieldArr[(count/2-1)],
                midpoint1 = fieldArr[count/2];
            return (midpoint0 + midpoint1)/2;
        }
    };

    // for quantitative values returns a list
    this.mode = function (field) {
        // there is no mode
        if (!fields[field] || fields[field].length<2) return [];

        var fieldsOfInterest = fields[field],
        hist = {}, // number of instances, keyed by value
        histArr = [];

        // build historgram
        for (var i=0;i<fieldsOfInterest.length;i++) {
            var  addToHistorgram = function (value) {
                if (!hist[value]) hist[value]=0;
                hist[value]++;
            }
            addToHistorgram(fieldsOfInterest[i]);
        }
        // turn map into array
        for (var i in hist) {
            var obj={};
            obj.value = i;
            obj.count = hist[i]
            histArr.push(obj);
        }

        // sort array
        histArr.sort(function(a,b) {return a.count - b.count });

        var maxCount = histArr[histArr.length-1].count;

        var modes = map(filter(histArr, function(item) {
                return item.count == maxCount;
                }), function(item) {
                return Number(item.value);
            });


        // vack into array
        //        for (var i=0;i
        return modes;
    };
} // EWStat

// export the interpreter
module.exports.EWStat = EWStat;


