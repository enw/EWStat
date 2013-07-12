/*jslint node:true nomen:true */
/*
EWStat - Statistics library
*/

// support running as a commonJS module or in a browser
if (typeof module === 'undefined') { var module = {exports: {}}; }

function EWStat() {
    "use strict";
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

    this.__defineGetter__("count", function() { return samples.length; });
    
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
            fieldArr = fields[field].sort(function(a,b) {return a-b;});
        if (isOdd(count)) { // there is a midpoint
            return fieldArr[(count-1)/2];
        } else { // even length so average
            var midpoint0 = fieldArr[(count/2-1)],
                midpoint1 = fieldArr[count/2];
            return (midpoint0 + midpoint1)/2;
        }
    };
} // EWStat

// export the interpreter
module.exports.EWStat = EWStat;

 
