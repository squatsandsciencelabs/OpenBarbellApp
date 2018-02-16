import * as sut from 'app/utility/DateUtils';

describe('DateUtils', () => {
    describe('checkDateWithinRange', () => {
        const realNow = Date.now;

        beforeAll(() => {
            Date.now = () => 1515197192603; // Saturday, January 6, 2018
        })

        afterAll(() => {
            Date.now = realNow;
        });

        test('check if date is within 7 days', () => {  
            const date = '2018-01-12T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(true);
        });

        test('check if date is within range over 10 days', () => {  
            const date = '2018-01-15T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(10, date)
    
            expect(actual).toBe(true);
        });

        test('check if works with date object', () => {  
            const dateString = '2018-01-12T04:06:12.640Z';
            const date = new Date(dateString);

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(true);
        });

        test('check if date is greater than 7 days', () => {    
            const date = '2018-01-14T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(7, date)
    
            expect(actual).toBe(false);
        });

        test('check if date is within range over 10 days', () => {  
            const date = '2018-01-17T04:06:12.640Z';

            const actual = sut.checkDateWithinRange(10, date)
    
            expect(actual).toBe(false);
        });

    });
});
