/*jslint node:true nomen:true */
/*global it, expect, describe */
// uses jasmine-node-karma
// https://npmjs.org/package/jasmine-node-karma
"use strict";
var EWStat = require('../EWStat').EWStat;
var stat = new EWStat();
describe('EWStat Suite', function () {

    function makeObject(a, b, c) {
        return {a:a,b:b,c:c};
    }
    it('accepts samples',
        function () {
           stat.addSample(makeObject(1,2,3));
           var samples=stat.getSamples();
           expect(samples.length).toBe(1);
        });
    }
);
