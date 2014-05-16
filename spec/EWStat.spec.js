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
    it('tracks fields in all samples',
        function () {
            var stat = new EWStat();
            stat.addSample(makeObject(1, 2, 3));
            var fieldNames = stat.fieldNames;
            expect(fieldNames).toContain('a');
            expect(fieldNames).toContain('b');
            expect(fieldNames).toContain('c');
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
    it('measures mode correctly',
       function () {
           var stat = new EWStat();

           // no samples
           expect(stat.mode("a")).toEqual([]);

           // one sample
           stat.addSample({a:1});
           expect(stat.mode("a")).toEqual([]);

           // one mode
           stat.addSample({a:1});
           expect(stat.mode("a")).toEqual([1]);

           stat.addSample({a:2});
           expect(stat.mode("a")).toEqual([1]);

           // two modes
           stat.addSample({a:2});
           expect(stat.mode("a")).toEqual([1,2]);

           stat.addSample({a:3});
           expect(stat.mode("a")).toEqual([1,2]);

           // three modes
           stat.addSample({a:3});
           expect(stat.mode("a")).toEqual([1,2,3]);

        });
    it('measures standard deviation correctly',
       function () {
           var stat = new EWStat();
           stat.addSample({score:86})
           stat.addSample({score:73})
           stat.addSample({score:124})
           stat.addSample({score:111})
           stat.addSample({score:90})
           stat.addSample({score:38})
               //           stat.dump();
           var roundToTenth = function (n) {
               return Math.round(n*10)/10;
           }
           expect(roundToTenth(stat.standardDeviation("score"))).toEqual(27.5);
       }
    );

     }
 );
