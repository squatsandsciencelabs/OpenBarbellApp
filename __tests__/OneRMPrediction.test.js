import * as sut from 'app/utility/transforms/OneRMCalculator';

var data = [
    [255, 0.48], 
    [275, 0.31], 
    [285, 0.30], 
    [295, 0.28], 
    [300, 0.26], 
    [310, 0.22], 
    [320, 0.19]
];

describe('1rm', () => {

    test('return 1rm prediction', () => {

        const result = sut.calc1rm(data, 0.15);
        
        expect(result).toBe(326);
    });
});

describe('confidenceInterval', () => {
    
    test('return velocity estimate', () => {

        const result = sut.getConfidenceInterval(data);
        
        expect(result).toBe(91);
    });
});
