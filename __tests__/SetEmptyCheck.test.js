import * as sut from 'app/utility/transforms/SetEmptyCheck';

describe.skip('isEmpty', () => {
    // note: skipping for now as too many possibilities and theoretically testing inner functions is sufficient
});

describe.skip('isUntouched', () => {
    // note: skipping for now as too many possibilities and theoretically testing inner functions is sufficient
});

describe('hasEmptyFields', () => {
    // note: not testing for every undefined / null case as too many possibilities
    // note: not testing for combinations as too many possibilities
    test('true when null', () => {
        let set = {
            exercise: null,
            weight: null,
            rpe: null,
            tags: [],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(true);;
    });

    test('true when empty', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(true);;
    });

    test('false w/ exercise name', () => {
        let set = {
            exercise: 'derp',
            weight: '',
            rpe: '',
            tags: [],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ weight', () => {
        let set = {
            exercise: '',
            weight: '300',
            rpe: '',
            tags: [],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ rpe', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '5.5',
            tags: [],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ tag', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        let result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });
});

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

        expect(result).toBe(true);;
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

        expect(result).toBe(true);;
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

        expect(result).toBe(false);
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

        expect(result).toBe(false);
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

        expect(result).toBe(false);
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

        expect(result).toBe(false);
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

        expect(result).toBe(false);
    });
});

describe('hasNoReps', () => {
    test('0 reps true', () => {
        let set = {
            reps: []
        };

        let result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('undefined true', () => {
        let set = {
        };

        let result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('null true', () => {
        let set = {
            reps: null
        };

        let result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('false', () => {
        let set = {
            reps: [{}]
        };

        let result = sut.hasNoReps(set);

        expect(result).toBe(false);
    });
});

describe('hasEmptyReps', () => {
    test('0 reps true', () => {
        let set = {
            reps: []
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('undefined true', () => {
        let set = {
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('null true', () => {
        let set = {
            reps: null
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('true when only undefined removes', () => {
        let set = {
            reps: [{}, {}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('true when everything is removed', () => {
        let set = {
            reps: [{removed: true}, {removed: true}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('false when at least one not removed', () => {
        let set = {
            reps: [{removed: true}, {}, {removed: false}]
        };

        let result = sut.hasEmptyReps(set);

        expect(result).toBe(false);
    });
});

describe('numFieldsEntered', () => {
    test('0 when none', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(0);
    });

    test('1 when exercise', () => {
        let set = {
            exercise: ' ',
            weight: '',
            rpe: '',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when weight', () => {
        let set = {
            exercise: '',
            weight: ' ',
            rpe: '',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when rpe', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: ' ',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when tags', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('2 when exercise weight', () => {
        let set = {
            exercise: ' ',
            weight: ' ',
            rpe: '',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when exercise rpe', () => {
        let set = {
            exercise: ' ',
            weight: '',
            rpe: ' ',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when exercise tags', () => {
        let set = {
            exercise: ' ',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when weight rpe', () => {
        let set = {
            exercise: '',
            weight: ' ',
            rpe: ' ',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when weight tags', () => {
        let set = {
            exercise: '',
            weight: ' ',
            rpe: '',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when rpe tags', () => {
        let set = {
            exercise: '',
            weight: '',
            rpe: ' ',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('3 when exercise weight rpe', () => {
        let set = {
            exercise: ' ',
            weight: ' ',
            rpe: ' ',
            tags: [],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when exercise weight tags', () => {
        let set = {
            exercise: ' ',
            weight: ' ',
            rpe: '',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when exercise rpe tags', () => {
        let set = {
            exercise: ' ',
            weight: '',
            rpe: ' ',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when weight rpe tags', () => {
        let set = {
            exercise: '',
            weight: ' ',
            rpe: ' ',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('4 when exercise weight rpe tags', () => {
        let set = {
            exercise: ' ',
            weight: ' ',
            rpe: ' ',
            tags: [{}],
        };

        let result = sut.numFieldsEntered(set);

        expect(result).toBe(4);
    });
});
