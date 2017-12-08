import * as sut from 'app/utility/transforms/OneRepMax';

describe('1rm', () => {

    test('return velocity estimate', () => {
        const data = [
            [255, 0.48], 
            [275, 0.31], 
            [285, 0.30], 
            [295, 0.28], 
            [300, 0.26], 
            [310, 0.22], 
            [320, 0.19]
        ];

        const result = sut.velocityPrediction(data, 330);
        
        expect(result).toBe(0.13);
    });
});
