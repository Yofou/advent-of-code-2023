const assert = require('assert');
const findSameParts = require('../index');

describe('Compare Two Strings',function(){
    it('should return hello at begin',function(){
        let result = findSameParts("hello world!", "hello, New York");
        assert.equal("hello", result[0]);
    });

    it('should return hello at middle',function(){
        let result = findSameParts("something hello world!", "action hello, New York");
        assert.equal("hello", result[0]);
    });

    it('should return empty with different string',function(){
        let result = findSameParts("something world!", "action hello, New York");
        assert.equal(0, result.length);
    });

    it('should return empty with empty string',function(){
        let result = findSameParts("", "action hello, New York");
        assert.equal(0, result.length);
    });

    it('should return empty with empty string',function(){
        let result = findSameParts(" ", "     ");
        assert.equal(0, result.length);
    });

    it('should return empty with object and undefind',function(){
        let result = findSameParts({});
        assert.equal(0, result.length);
    });

    it('should return hello as default ignoreCase',function(){
        let result = findSameParts("hello world!", "Hello, New York");
        assert.equal("hello", result[0]);
    });

    it('should return ello when set ignoreCase as false',function(){
        let result = findSameParts("hello world!", "Hello, New York", {ignoreCase: false});
        assert.equal("ello", result[0]);
    });

    it('should return hello when set ignoreCase as true',function(){
        let result = findSameParts("hello world!", "Hello, New York", {ignoreCase: true});
        assert.equal("hello", result[0]);
    });

    it('should work normal if set minStrLength bigger than the string to compare',function(){
        let result = findSameParts("hello world!", "Hello, New York", {minStrLength: 100});
        assert.equal(undefined, result[0]);
    });

    it('should work normal if change string position',function(){
        let result = findSameParts( "Hello, New York", "hello world!");
        assert.equal("hello", result[0]);
    });

    it('should work normal if set minStrLength less than 0',function(){
        let result = findSameParts( "Hello, New York", "hello world!", {minStrLength: 4});
        assert.equal("hello", result[0]);
    });
});

