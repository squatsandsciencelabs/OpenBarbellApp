import * as sut from 'app/utility/SetUtils';

describe.skip('isEmpty', () => {
    // note: skipping for now as too many possibilities and theoretically testing inner functions is sufficient
});

describe.skip('isUntouched', () => {
    // note: skipping for now as too many possibilities and theoretically testing inner functions is sufficient
});

describe('hasAllFields', () => {
    // note: not testing for every undefined / null case as too many possibilities
    // note: not testing for combinations as too many possibilities
    test('false when all null', () => {
        const set = {
            exercise: null,
            weight: null,
            rpe: null,
            tags: [],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);;
    });

    test('true when all filled', () => {
        const set = {
            exercise: '1',
            weight: '1',
            rpe: '1',
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(true);
    });

    test('false w/ exercise name empty string', () => {
        const set = {
            exercise: '',
            weight: '1',
            rpe: '1',
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false w/ exercise name null', () => {
        const set = {
            exercise: null,
            weight: '1',
            rpe: '1',
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false w/ weight empty string', () => {
        const set = {
            exercise: '1',
            weight: '',
            rpe: '1',
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false w/ weight null', () => {
        const set = {
            exercise: '1',
            weight: null,
            rpe: '1',
            tags: [''],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false w/ rpe empty string', () => {
        const set = {
            exercise: '1',
            weight: '1',
            rpe: '',
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false w/ rpe null', () => {
        const set = {
            exercise: '1',
            weight: '1',
            rpe: null,
            tags: ['1'],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false due to tag len 0', () => {
        const set = {
            exercise: '1',
            weight: '1',
            rpe: '1',
            tags: [],
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

    test('false due to tag undef', () => {
        const set = {
            exercise: '1',
            weight: '1',
            rpe: '1',
        };

        const result = sut.hasAllFields(set);

        expect(result).toBe(false);
    });

});

describe('hasEmptyFields', () => {
    // note: not testing for every undefined / null case as too many possibilities
    // note: not testing for combinations as too many possibilities
    test('true when null', () => {
        const set = {
            exercise: null,
            weight: null,
            rpe: null,
            tags: [],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(true);;
    });

    test('true when empty', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(true);;
    });

    test('false w/ exercise name', () => {
        const set = {
            exercise: 'derp',
            weight: '',
            rpe: '',
            tags: [],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ weight', () => {
        const set = {
            exercise: '',
            weight: '300',
            rpe: '',
            tags: [],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ rpe', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '5.5',
            tags: [],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });

    test('false w/ tag', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        const result = sut.hasEmptyFields(set);

        expect(result).toBe(false);
    });
});

describe('hasEmptyData', () => {
    // note: not testing for every undefined / null case as too many possibilities
    // note: not testing for combinations as too many possibilities
    test('true when null', () => {
        const set = {
            exercise: null,
            weight: null,
            rpe: null,
            tags: [],
            videoFileURL: null
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(true);;
    });

    test('true when empty', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(true);;
    });

    test('false w/ exercise name', () => {
        const set = {
            exercise: 'derp',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(false);
    });

    test('false w/ weight', () => {
        const set = {
            exercise: '',
            weight: '300',
            rpe: '',
            tags: [],
            videoFileURL: ''
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(false);
    });

    test('false w/ rpe', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '5.5',
            tags: [],
            videoFileURL: ''
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(false);
    });

    test('false w/ tag', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
            videoFileURL: ''
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(false);
    });

    test('false w/ video', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
            videoFileURL: 'hello'
        };

        const result = sut.hasEmptyData(set);

        expect(result).toBe(false);
    });
});

describe('hasNoReps', () => {
    test('0 reps true', () => {
        const set = {
            reps: []
        };

        const result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('undefined true', () => {
        const set = {
        };

        const result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('null true', () => {
        const set = {
            reps: null
        };

        const result = sut.hasNoReps(set);

        expect(result).toBe(true);;
    });

    test('false', () => {
        const set = {
            reps: [{}]
        };

        const result = sut.hasNoReps(set);

        expect(result).toBe(false);
    });
});

describe('hasEmptyReps', () => {
    test('0 reps true', () => {
        const set = {
            reps: []
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('undefined true', () => {
        const set = {
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('null true', () => {
        const set = {
            reps: null
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('true when only undefined removes', () => {
        const set = {
            reps: [{}, {}]
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('true when everything is removed', () => {
        const set = {
            reps: [{removed: true}, {removed: true}]
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(true);;
    });

    test('false when at least one not removed', () => {
        const set = {
            reps: [{removed: true}, {}, {removed: false}]
        };

        const result = sut.hasEmptyReps(set);

        expect(result).toBe(false);
    });
});

describe('usableReps', () => {
    // test for removed or invalid reps
    // test for INF
    // test for > 0 and < 10 
    // test peak is < 10
    test('returns usable reps only', () => {
        const set = {
            reps: [
                {removed: true, isValid: true, data: ['-1', '2', '2.5', '2', '8']}, 
                {removed: false, isValid: true, data: ['-2', '3', '1.2', '1', '7']}, 
                {removed: true, isValid: false, data: ['-3', '4', '7.8', '1', '3']}, 
                {removed: false, isValid: false, data: ['-4', '6', '4', '1', '2']}, 
                {removed: false, isValid: true, data: ['1', '0', '10', '1', '8']},
                {removed: false, isValid: true, data: ['0', '2', '12', '1', '4']},
                {removed: false, isValid: true, data: ['0', '2', '7', '1', '8']},
                {removed: false, isValid: true, data: ['0', '2', '7', '1', '14']},
                {removed: false, isValid: true, data: ['-1', '3', '5', '1', '8']},
                {removed: false, isValid: true, data: ['-2', '4', 'INF', '1', '2']},
                {removed: true, isValid: false, data: ['-3', '2', 'INF', '1', '3']},
                {removed: null, isValid: null, data: [null, null, null, null, null]},
                {removed: false, isValid: true, data: [null, null, '5', '1', '2']},
                {removed: false, isValid: true, data: [null, null, 'INF', '2', '4']},
                {removed: false, isValid: true, data: ['-1', '3', '5', '1', 'INF']},
            ]
        };

        const result = sut.usableReps(set);

        expect(result).toEqual([
            {removed: false, isValid: true, data: ['-2', '3', '1.2', '1', '7']}, 
            {removed: false, isValid: true, data: ['0', '2', '7', '1', '8']},
            {removed: false, isValid: true, data: ['-1', '3', '5', '1', '8']},
            {removed: false, isValid: true, data: [null, null, '5', '1', '2']},
        ]);
    });
});

describe('validUnremovedReps', () => {
    // test for valid and unremoved reps
    // test for INF
    // test for 0 and invalid
    const set = {
        reps: [
            {removed: true, isValid: true, data: ['-1', '2', '2.5', '2', '8']}, 
            {removed: false, isValid: true, data: ['-2', '3', '0', '1', '7']}, 
            {removed: true, isValid: false, data: ['-3', '4', '7.8', '1', '3']}, 
            {removed: false, isValid: false, data: ['-4', '6', '4', '1', '2']}, 
            {removed: false, isValid: true, data: ['1', '0', '0', '1', '8']},
            {removed: false, isValid: true, data: ['0', '2', '12', '1', '4']},
            {removed: false, isValid: true, data: ['0', '2', '7', '1', '8']},
            {removed: false, isValid: true, data: ['0', '2', '0', '1', '14']},
            {removed: false, isValid: true, data: ['-1', '3', '5', '1', '8']},
            {removed: false, isValid: true, data: ['-2', '4', 'INF', '1', '2']},
            {removed: true, isValid: false, data: ['-3', '2', 'INF', '1', '3']},
            {removed: null, isValid: null, data: [null, null, null, null, null]},
            {removed: false, isValid: true, data: [null, null, '5', '1', '2']},
            {removed: false, isValid: true, data: [null, null, 'INF', '2', '4']},
            {removed: false, isValid: true, data: ['-1', '3', '5', '1', 'INF']},
        ]
    };

    const result = sut.validUnremovedReps(set);

    expect(result).toEqual([
        {removed: false, isValid: true, data: ['0', '2', '12', '1', '4']},
        {removed: false, isValid: true, data: ['0', '2', '7', '1', '8']},
        {removed: false, isValid: true, data: ['-1', '3', '5', '1', '8']},
        {removed: false, isValid: true, data: [null, null, '5', '1', '2']},
        {removed: false, isValid: true, data: ['-1', '3', '5', '1', 'INF']},
    ])
})

describe('numFieldsEntered', () => {
    test('0 when none', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(0);
    });

    test('1 when exercise', () => {
        const set = {
            exercise: ' ',
            weight: '',
            rpe: '',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when weight', () => {
        const set = {
            exercise: '',
            weight: ' ',
            rpe: '',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when rpe', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: ' ',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('1 when tags', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(1);
    });

    test('2 when exercise weight', () => {
        const set = {
            exercise: ' ',
            weight: ' ',
            rpe: '',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when exercise rpe', () => {
        const set = {
            exercise: ' ',
            weight: '',
            rpe: ' ',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when exercise tags', () => {
        const set = {
            exercise: ' ',
            weight: '',
            rpe: '',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when weight rpe', () => {
        const set = {
            exercise: '',
            weight: ' ',
            rpe: ' ',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when weight tags', () => {
        const set = {
            exercise: '',
            weight: ' ',
            rpe: '',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('2 when rpe tags', () => {
        const set = {
            exercise: '',
            weight: '',
            rpe: ' ',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(2);
    });

    test('3 when exercise weight rpe', () => {
        const set = {
            exercise: ' ',
            weight: ' ',
            rpe: ' ',
            tags: [],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when exercise weight tags', () => {
        const set = {
            exercise: ' ',
            weight: ' ',
            rpe: '',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when exercise rpe tags', () => {
        const set = {
            exercise: ' ',
            weight: '',
            rpe: ' ',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('3 when weight rpe tags', () => {
        const set = {
            exercise: '',
            weight: ' ',
            rpe: ' ',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(3);
    });

    test('4 when exercise weight rpe tags', () => {
        const set = {
            exercise: ' ',
            weight: ' ',
            rpe: ' ',
            tags: [{}],
        };

        const result = sut.numFieldsEntered(set);

        expect(result).toBe(4);
    });
});

describe('numValidUnremovedReps', () => {
    test('0 when empty', () => {
        const set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [],
        };

        const result = sut.numValidUnremovedReps(set);

        expect(result).toBe(0);
    });

    test('ignores empty and invalid properly', () => {
        const set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [
                {removed: true, isValid: true, data: ['-1', '2', '2.5', '2', '8']}, 
                {removed: false, isValid: true, data: ['-2', '3', '0', '1', '7']}, 
                {removed: true, isValid: false, data: ['-3', '4', '7.8', '1', '3']}, 
                {removed: false, isValid: false, data: ['-4', '6', '4', '1', '2']}, 
                {removed: false, isValid: true, data: ['1', '0', '0', '1', '8']},
                {removed: false, isValid: true, data: ['0', '2', '12', '1', '4']},
                {removed: false, isValid: true, data: ['0', '2', '7', '1', '8']},
                {removed: false, isValid: true, data: ['0', '2', '0', '1', '14']},
                {removed: false, isValid: true, data: ['-1', '3', '5', '1', '8']},
                {removed: false, isValid: true, data: ['-2', '4', 'INF', '1', '2']},
                {removed: true, isValid: false, data: ['-3', '2', 'INF', '1', '3']},
                {removed: null, isValid: null, data: [null, null, null, null, null]},
                {removed: false, isValid: true, data: [null, null, '5', '1', '2']},
                {removed: false, isValid: true, data: [null, null, 'INF', '2', '4']},
                {removed: false, isValid: true, data: ['-1', '3', '5', '1', 'INF']},
            ],
        };

        const result = sut.numValidUnremovedReps(set);

        expect(result).toBe(5);
    });
});
