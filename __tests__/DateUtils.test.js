import * as sut from 'app/utility/transforms/DateUtils';

describe('DateUtils', () => {
    describe('checkDateWithinRange', () => {
        const realNow = Date.now;

        beforeEach(() => {
            Date.now = () => 1515197192603;
        })

        afterAll(() => {
            Date.now = realNow;
        });

        test('check if date is within range', () => {  
            const date = '2017-12-30T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(true);
        });

        test('check if date is out of range', () => {    
            const date = '2017-12-05T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(false);
        });
    });
});
