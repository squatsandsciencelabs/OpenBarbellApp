jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as Analytics from 'app/services/Analytics';
import * as sut from 'app/features/settings/survey/SettingsSurveyActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var logScreenSpy = null;
var store = null;

describe('SettingsSurveyActions Analytics', () => {

    const expectedURL = 'foobar';

    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});
        logScreenSpy = jest.spyOn(Analytics, 'setCurrentScreen').mockImplementation(() => {});        
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            }
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();
        logScreenSpy.mockReset();
    });

    afterAll(() => {
        logEventSpy.mockRestore();
        logScreenSpy.mockRestore();
    });   

    test('present_survey', () => {
        store.dispatch(sut.presentSurvey());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('present_survey');
        expect(params.url).toEqual(expectedURL);
    });

});
