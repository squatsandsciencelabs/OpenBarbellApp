import * as sut from 'app/redux/selectors/SettingsSelectors';

describe('SettingsSelectors', () => {
    const realNow = Date.now;

    afterAll(() => {
        Date.now = realNow;
    });

    test('getEndSetTimeLeft', () => {
        const state = {
            settings: {
                endSetTimerDuration: 1000
            }
        }
        Date.now = () => 3000;

        const result = sut.getEndSetTimeLeft(state);

        expect(result).toBe(2000);
    });
});
