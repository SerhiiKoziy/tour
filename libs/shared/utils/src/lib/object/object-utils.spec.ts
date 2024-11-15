/* eslint-disable @typescript-eslint/no-explicit-any */
/*
    equals.coffee

    Copyright (c) 2013-2017, Reactive Sets

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// NOTE: these tests came from https://github.com/ReactiveSets/toubkal/blob/master/test/src/value_equals.coffee

import { equals } from './object-utils';

describe('Comparing values using equals()', function () {
  describe('undefined', function () {
    it('undefined should equal undefined', function () {
      expect(equals(undefined, undefined)).toBe(true);
    });
    it('undefined should not equal null', function () {
      expect(equals(undefined, null)).toBe(false);
    });
    it('undefined should not equal 0', function () {
      expect(equals(undefined, 0)).toBe(false);
    });
    it('undefined should not equal ""', function () {
      expect(equals(undefined, '')).toBe(false);
    });
    it('undefined should not equal false', function () {
      expect(equals(undefined, false)).toBe(false);
    });
  });
  describe('null', function () {
    it('null should equal null', function () {
      expect(equals(null, null)).toBe(true);
    });
    it('null should not equal undefined', function () {
      expect(equals(null, 0)).toBe(false);
    });
    it('null should not equal 0', function () {
      expect(equals(null, 0)).toBe(false);
    });
    it('null should not equal ""', function () {
      expect(equals(null, '')).toBe(false);
    });
    it('null should not equal false', function () {
      expect(equals(null, false)).toBe(false);
    });
  });
  describe('Numbers', function () {
    describe('NaN', function () {
      it('NaN should equal NaN', function () {
        expect(equals(NaN, NaN)).toBe(true);
      });
      it('new Number( NaN ) should equal new Number( NaN )', function () {
        expect(equals(new Number(NaN), new Number(NaN))).toBe(true);
      });
      it('NaN should equal new Number( NaN )', function () {
        expect(equals(NaN, new Number(NaN))).toBe(true);
      });
      it('NaN should not equal 0', function () {
        expect(equals(NaN, 0)).toBe(false);
      });
      it('NaN should not equal undefined', function () {
        expect(equals(NaN, 0)).toBe(false);
      });
    });
    describe('0 and -0', function () {
      it('0 should equal 0', function () {
        expect(equals(0, 0)).toBe(true);
      });
      it('0 should not equal -0', function () {
        expect(equals(0, -0)).toBe(false);
      });
      it('-0 should equal -0', function () {
        expect(equals(-0, -0)).toBe(true);
      });
      it('new Number( 0 ) should equal new Number( 0 )', function () {
        expect(equals(new Number(0), new Number(0))).toBe(true);
      });
      it('new Number( -0 ) should equal new Number( -0 )', function () {
        expect(equals(new Number(-0), new Number(-0))).toBe(true);
      });
      it('new Number( 0 ) should not equal new Number( -0 )', function () {
        expect(equals(new Number(0), new Number(-0))).toBe(false);
      });
      it('0 should equal new Number( 0 )', function () {
        expect(equals(0, new Number(0))).toBe(true);
      });
      it('0 should not equal new Number( -0 )', function () {
        expect(equals(0, new Number(-0))).toBe(false);
      });
      it('0 should not equal 1', function () {
        expect(equals(0, 1)).toBe(false);
      });
      it('0 should not equal "0"', function () {
        expect(equals(0, '0')).toBe(false);
      });
      it('0 should not equal ""', function () {
        expect(equals(0, '')).toBe(false);
      });
      it('0 should not equal false', function () {
        expect(equals(0, false)).toBe(false);
      });
    });
    describe('Infinity and -Infinity', function () {
      it('Infinity should equal Infinity', function () {
        expect(equals(Infinity, Infinity)).toBe(true);
      });
      it('Infinity should equal new Number( Infinity )', function () {
        expect(equals(Infinity, new Number(Infinity))).toBe(true);
      });
      it('new Number( Infinity = should equal new Number( Infinity )', function () {
        expect(equals(new Number(Infinity), new Number(Infinity))).toBe(true);
      });
      it('-Infinity should equal -Infinity', function () {
        expect(equals(-Infinity, -Infinity)).toBe(true);
      });
      it('-Infinity should not equal Infinity', function () {
        expect(equals(-Infinity, Infinity)).toBe(false);
      });
    });
    describe('Other numbers', function () {
      it('1 should equal 1', function () {
        expect(equals(1, 1)).toBe(true);
      });
      it('new Number( 1 ) should equal new Number( 1 )', function () {
        expect(equals(new Number(1), new Number(1))).toBe(true);
      });
      it('1 should equal new Number( 1 )', function () {
        expect(equals(1, new Number(1))).toBe(true);
      });
      it('1 should not equal "1"', function () {
        expect(equals(1, '1')).toBe(false);
      });
      it('1 should not equal true', function () {
        expect(equals(1, true)).toBe(false);
      });
    });
  });
  describe('Strings', function () {
    it('"" should equal ""', function () {
      expect(equals('', '')).toBe(true);
    });
    it('new String( "" ) should equal new String( "" )', function () {
      expect(equals(new String(''), new String(''))).toBe(true);
    });
    it('"" should equal new String( "" )', function () {
      expect(equals('', new String(''))).toBe(true);
    });
    it('"test" should equal "test"', function () {
      expect(equals('test', 'test')).toBe(true);
    });
    it('new String( "test" ) should equal new String( "test" )', function () {
      expect(equals(new String('test'), new String('test'))).toBe(true);
    });
    it('"test" should equal new String( "test" )', function () {
      expect(equals('test', new String('test'))).toBe(true);
    });
    it('"" should not equal "test"', function () {
      expect(equals('', 'test')).toBe(false);
    });
    it('"test" should not equal "TEST"', function () {
      expect(equals('test', 'TEST')).toBe(false);
    });
  });
  describe('Booleans', function () {
    it('true should equal true', function () {
      expect(equals(true, true)).toBe(true);
    });
    it('true should equal new Boolean( true )', function () {
      expect(equals(true, new Boolean(true))).toBe(true);
    });
    it('new Boolean( true ) should equal new Boolean( true )', function () {
      expect(equals(new Boolean(true), new Boolean(true))).toBe(true);
    });
    it('true should not equal false', function () {
      expect(equals(true, false)).toBe(false);
    });
    it('false should equal false', function () {
      expect(equals(false, false)).toBe(true);
    });
    it('false should equal new Boolean( false )', function () {
      expect(equals(false, new Boolean(false))).toBe(true);
    });
    it('new Boolean( false ) should equal new Boolean( false )', function () {
      expect(equals(new Boolean(false), new Boolean(false))).toBe(true);
    });
    it('false should not equal 0', function () {
      expect(equals(false, 0)).toBe(false);
    });
    it('false should not equal ""', function () {
      expect(equals(false, '')).toBe(false);
    });
    it('false should not equal null', function () {
      expect(equals(false, null)).toBe(false);
    });
  });
  describe('Date Objects', function () {
    const a = new Date(1234567891234);
    const b = new Date(1234567891234);
    const c = new Date(1234567891235);
    it('two equal Dates should be equal', function () {
      expect(equals(a, b)).toBe(true);
    });
    it('two unequal Dates should not be equal', function () {
      expect(equals(a, c)).toBe(false);
    });
    it('a Date should not equal its value', function () {
      expect(equals(a, a.valueOf())).toBe(false);
    });
  });
  describe('Regular Expressions', function () {
    it('/./ should equal /./', function () {
      expect(equals(/./, /./)).toBe(true);
    });
    it('/./ should equal new RegExp( "." )', function () {
      expect(equals(/./, new RegExp('.'))).toBe(true);
    });
    it('/./ should not equal /test/', function () {
      expect(equals(/./, /test/)).toBe(false);
    });
    it('/test/ should not equal /test/i', function () {
      expect(equals(/test/, /test/i)).toBe(false);
    });
    it('/test/i should not equal /test/i', function () {
      expect(equals(/test/i, /test/i)).toBe(true);
    });
    it('/test/ should not equal /test/g', function () {
      expect(equals(/test/, /test/g)).toBe(false);
    });
    it('/test/g should not equal /test/g', function () {
      expect(equals(/test/g, /test/g)).toBe(true);
    });
    it('/test/ should not equal /test/m', function () {
      expect(equals(/test/, /test/m)).toBe(false);
    });
    it('/test/m should not equal /test/m', function () {
      expect(equals(/test/m, /test/m)).toBe(true);
    });
  });
  describe('Acyclic Arrays', function () {
    it('[] should equal []', function () {
      expect(equals([], [])).toBe(true);
    });
    it('[] should not equal [ 1 ]', function () {
      expect(equals([], [1])).toBe(false);
    });
    it('[ 2 ] should equal [ 2 ]', function () {
      expect(equals([2], [2])).toBe(true);
    });
    it('[ 2 ] should not equal [ 1 ]', function () {
      expect(equals([2], [1])).toBe(false);
    });
    it('[ 2, [] ] should equal [ 2, [] ]', function () {
      expect(equals([2, []], [2, []])).toBe(true);
    });
    it('[ 2, [] ] should not equal [ 2 ]', function () {
      expect(equals([2, []], [2])).toBe(false);
    });
    it('[ 0 ] should not equal [ -0 ]', function () {
      expect(equals([0], [-0])).toBe(false);
    });
    it('[ 0 ] should equal [ 0 ]', function () {
      expect(equals([0], [0])).toBe(true);
    });
    it('[ 2, [] ] should not equal [ 2, [ 2 ] ]', function () {
      expect(equals([2, []], [2, [2]])).toBe(false);
    });
  });
  describe('Acyclic Objects', function () {
    it('{} should equal {}', function () {
      expect(equals({}, {})).toBe(true);
    });
    it('{ a: 1 } should equal { a: 1 }', function () {
      expect(
        equals(
          {
            a: 1,
          },
          {
            a: 1,
          }
        )
      ).toBe(true);
    });
    it('{ a: 1 } should not equal { b: 1 }', function () {
      expect(
        equals(
          {
            a: 1,
          },
          {
            b: 1,
          }
        )
      ).toBe(false);
    });
    it('{ a: 0 } should equal { a: 0 }', function () {
      expect(
        equals(
          {
            a: 0,
          },
          {
            a: 0,
          }
        )
      ).toBe(true);
    });
    it('{ a: 0 } should not equal { a: -0 }', function () {
      expect(
        equals(
          {
            a: 0,
          },
          {
            a: -0,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1 } should not equal { a: 1, b: 1 }', function () {
      expect(
        equals(
          {
            a: 1,
          },
          {
            a: 1,
            b: 1,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1, b: 1 } should not equal { a: 1 }', function () {
      expect(
        equals(
          {
            a: 1,
            b: 1,
          },
          {
            a: 1,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1, b: 2 } should equal { a: 1, b: 2 }', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            a: 1,
            b: 2,
          }
        )
      ).toBe(true);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 3 }', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            a: 1,
            b: 3,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1, b: 2 } should not equal { b: 1, a: 2 }', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            b: 1,
            a: 2,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1 } should not equal { a: 1, b: undefined }', function () {
      expect(
        equals(
          {
            a: 1,
          },
          {
            a: 1,
            b: 0,
          }
        )
      ).toBe(false);
    });
    it('{ a: 1, b: undefined } should equal { a: 1, b: undefined }', function () {
      expect(
        equals(
          {
            a: 1,
            b: 0,
          },
          {
            a: 1,
            b: 0,
          }
        )
      ).toBe(true);
    });
    it('{ a: 1, b: 2 } should equal { b: 2, a: 1 } (properties order is irrelevent)', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            b: 2,
            a: 1,
          }
        )
      ).toBe(true);
    });
    it('{ a: 1, b: 2 } should not equal { b: 2, a: 1 } when properties order is checked', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            b: 2,
            a: 1,
          },
          true
        )
      ).toBe(false);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 2, c: 3 } when properties order is checked', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            a: 1,
            b: 2,
            c: 3,
          },
          true
        )
      ).toBe(false);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 2 } when properties order is checked', function () {
      expect(
        equals(
          {
            a: 1,
            b: 2,
          },
          {
            a: 1,
            b: 2,
          },
          true
        )
      ).toBe(true);
    });
    it('{ a: 1, b: {} } should equal { a: 1, b: {} }', function () {
      expect(
        equals(
          {
            a: 1,
            b: {},
          },
          {
            a: 1,
            b: {},
          }
        )
      ).toBe(true);
    });
    it('{ a: 1, b: { c: [ {}, 1, "" ] } } should equal { a: 1, b: { c: [ {}, 1, "" ] } }', function () {
      expect(
        equals(
          {
            a: 1,
            b: {
              c: [{}, 1, ''],
            },
          },
          {
            a: 1,
            b: {
              c: [{}, 1, ''],
            },
          }
        )
      ).toBe(true);
    });
    it('{ a: 1, b: { c: [ {}, 1, "" ] } } should not equal { a: 1, b: { c: [ {}, 1, "", true ] } }', function () {
      expect(
        equals(
          {
            a: 1,
            b: {
              c: [{}, 1, ''],
            },
          },
          {
            a: 1,
            b: {
              c: [{}, 1, '', true],
            },
          }
        )
      ).toBe(false);
    });
  });
  describe('Cyclic Arrays and Objects', function () {
    let a_1: any, a_2: any, a_3: any, b_1: any, b_2: any, b_3: any;
    const a: any = [
      1,
      2,
      3,
      (a_1 = {
        a: 1,
      }),
      (a_2 = [5, 6]),
      (a_3 = {
        test: true,
      }),
    ];
    const b: any = [
      1,
      2,
      3,
      (b_1 = {
        a: 1,
      }),
      (b_2 = [5, 6]),
      (b_3 = {
        test: true,
      }),
    ];
    it('Non-cyclic arrays with nested objects and array should be equal', function () {
      expect(equals(a, b)).toBe(true);
    });
    it('Adding a cycle in a should throw when comparing without option check cycles', function () {
      a[10] = a;
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Comparing with check cycles should  false', function () {
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Adding a different cycle in b should compare to false', function () {
      b[10] = b_1;
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Adding the same cycle in b should compare to true', function () {
      b[10] = b;
      expect(equals(a, b, false, true)).toBe(true);
    });
    it('Adding additional cycle in nested object, different in b compare to false', function () {
      a_1.b = a;
      b_1.b = b_1;
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Adding the same additional cycle in nested object should compare to true', function () {
      b_1.b = b;
      expect(equals(a, b, false, true)).toBe(true);
    });
    it('Adding different cycles in nested Array, with similar values should compare to false', function () {
      a_2[2] = [5, 6, a_2];
      b_2[2] = b_2;
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Fixing cycle in nested Array, should now compare to true', function () {
      b_2[2] = [5, 6, b_2];
      expect(equals(a, b, false, true)).toBe(true);
    });
    it('Adding different cycles in nested Object, with similar values should compare to false', function () {
      a_3.c = {
        test: true,
        c: a_3,
      };
      b_3.c = b_3;
      expect(equals(a, b, false, true)).toBe(false);
    });
    it('Fixing cycle in nested Object, should now compare to true', function () {
      b_3.c = {
        test: true,
        c: b_3,
      };
      expect(equals(a, b, false, true)).toBe(true);
    });
  });
});
