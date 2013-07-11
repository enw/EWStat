/*jslint node:true nomen:true */
/*
EWStat - Statistics library
*/

// support running as a commonJS module or in a browser
if (typeof module === 'undefined') { var module = {exports: {}}; }

function EWStat() {
    "use strict";
    var samples = [];
    
    // sample is a javascript object w/any number of features
    this.addSample = function (sample) {
        samples.push(sample);
    };

    this.getSamples = function () {
        return samples;
    }; // getSamples

    this.dump = function () {
        console.log(samples);
    };
} // EWStat

// export the interpreter
module.exports.EWStat = EWStat;

 
