import * as sut from 'app/utility/transforms/OneRepMax';

describe('1rm', () => {

    test('return yIntercept', () => {
        const result = sut.calculate1RM();
        
        expect(result).toBe(0);
    })
})