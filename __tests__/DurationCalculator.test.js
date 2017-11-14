import * as sut from 'app/utility/transforms/DurationCalculator';

describe('DurationCalculator', () => {
    test('end date > start date still positive', () => {
        const start = new Date(1000);
        const end = new Date(3000);
        const expected = 2000;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });

    test('start date > end date still positive', () => {
        const start = new Date(4000);
        const end = new Date(1000);
        const expected = 3000;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });

    test('both 0', () => {
        const start = new Date(0);
        const end = new Date(0);
        const expected = 0;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });

    test('equal', () => {
        const start = new Date(2000);
        const end = new Date(2000);
        const expected = 0;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });

    test('two date strings', () => {
        const start = '03-20-1995';
        const end = '03-21-1995';

        const expected = 86400000;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });
    
    test('two date numbers', () => {
        const start = 5000;
        const end = 10000;

        const expected = 5000;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });

    test('two date objects', () => {
        const start = new Date('03-20-1995');
        const end = new Date('03-21-1995');

        const expected = 86400000;

        const actual = sut.getDurationBetween(start, end);

        expect(actual).toBe(expected);
    });    
});
