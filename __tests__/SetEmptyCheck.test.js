import * as sut from 'app/utility/transforms/SetEmptyCheck';

describe('hasEmptyData', () => {
    // note: not testing for combinations as too many possibilities
    test('true when null', () => {
        let set = {
            exercise: null,
            weight: null,
            rpe: null,
            tags: [],
            videoFileURL: null
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeTruthy();
    });

    test('true when empty', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeTruthy();
    });

    test('false w/ exercise name', () => {
        let set = {
            exercise: 'derp',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeFalsy();
    });

    test('false w/ weight', () => {
        let set = {
            exercise: '',
            weight: '300',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeFalsy();
    });

    test('false w/ rpe', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '5.5',
            tags: [],
            videoFileURL: ''
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeFalsy();
    });

    test('false w/ tag', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
            videoFileURL: ''
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeFalsy();
    });

    test('false w/ video', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: 'hello'
        };

        let result = sut.hasEmptyData(set);

        expect(result).toBeFalsy();
    });
});
