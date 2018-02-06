import * as sut from 'app/utility/transforms/Sections';

describe('findInSection', () => {
    
    test('find in section by setID', () => {
        const sections = [
            {
                key: 1,
                data: [{ setID: 'a' }, {}, {}],
                position: 1,
            },
            {
                key: 2,
                data: [{ setID: 'b' }, {setID: 'c'}, { setID: 'd'}],
                position: 2,
            },
            {
                key: 3,
                data: [{ setID: 'e' }, {}, {}],
                position: 3,
            },
        ]

        const result = sut.findInSection(sections, 'c');

        expect(result).toEqual({"itemIndex": 1, "sectionIndex": 2});
    });
});
