/*jslint node:true nomen:true */
/*global it, expect, describe */
// uses jasmine-node-karma
// https://npmjs.org/package/jasmine-node-karma
"use strict";
var EWStat = require('../EWStat').EWStat;
describe('EWStat Suite', function () {

    function makeObject(a, b, c) {
        return {a: a, b: b, c: c};
    }
    it('accepts samples',
        function () {
            var stat = new EWStat();
            stat.addSample(makeObject(1, 2, 3));
            var samples = stat.getSamples();
            expect(samples.length).toBe(1);
            expect(stat.count).toBe(1);
        });
    it('measures mean correctly',
       function () {
           var stat = new EWStat();
           for (var i=0;i<9;i++) {
               stat.addSample(makeObject(1*i, 2*i, 3*i));
           }
           expect(stat.count).toBe(9);
           expect(stat.mean("a")).toBe(4);
           expect(stat.mean("b")).toBe(8);
           expect(stat.mean("c")).toBe(12);
        });
    it('measures median correctly', // happens to be the same as the mean in this example
       function () {
           var stat = new EWStat();
           for (var i=0;i<9;i++) {
               stat.addSample(makeObject(1*i, 2*i, 3));
           }
           expect(stat.count).toBe(9);
           expect(stat.median("a")).toBe(4);
           expect(stat.median("b")).toBe(8);
           expect(stat.median("c")).toBe(3);
        });
     }
 );
