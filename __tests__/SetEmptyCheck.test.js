import * as sut from 'app/utility/transforms/SetEmptyCheck';

describe('hasEmptyData', () => {
    // note: not testing for every undefined / null case as too many possibilities
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

describe('hasNoReps', () => {
    test('0 reps true', () => {
        let set = {
            reps: []
        };

        let result = sut.hasNoReps(set);

        expect(result).toBeTruthy();
    });

    test('undefined true', () => {
        let set = {
        };

        let result = sut.hasNoReps(set);

        expect(result).toBeTruthy();
    });

    test('null true', () => {
        let set = {
            reps: null
        };

        let result = sut.hasNoReps(set);

        expect(result).toBeTruthy();
    });

    test('false', () => {
        let set = {
            reps: [{}]
        };

        let result = sut.hasNoReps(set);

        expect(result).toBeFalsy();
    });
});

describe('hasEmptyReps', () => {
    test('0 reps true', () => {
        let set = {
            reps: []
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeTruthy();
    });

    test('undefined true', () => {
        let set = {
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeTruthy();
    });

    test('null true', () => {
        let set = {
            reps: null
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeTruthy();
    });

    test('true when only undefined removes', () => {
        let set = {
            reps: [{}, {}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeTruthy();
    });

    test('true when everything is removed', () => {
        let set = {
            reps: [{removed: true}, {removed: true}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeTruthy();
    });

    test('false when at least one not removed', () => {
        let set = {
            reps: [{removed: true}, {}, {removed: false}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBeFalsy();
    });
});

describe('numFieldsEntered', () => {

});
