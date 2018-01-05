import * as sut from 'app/utility/transforms/DateUtils';

describe('DateUtils', () => {
    describe('checkDateWithinRange', () => {

        test('check if date is within range', () => {
            const date = '2017-12-30T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(true);
        });
    })
});
