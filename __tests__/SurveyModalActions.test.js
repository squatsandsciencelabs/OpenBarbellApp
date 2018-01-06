jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Alert } from 'react-native';

import * as Analytics from 'app/services/Analytics';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as sut from 'app/shared_features/survey/SurveyModalActions';

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
            },
            appState: {
                tabIndex: 2
            }
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();
        logScreenSpy.mockReset(); // TODO: Somehow this is causing issues, fix this
    });

    afterAll(() => {
        logEventSpy.mockRestore();
        logScreenSpy.mockRestore();
    });

    test('attempt_finish_survey', () => {
        store.dispatch(sut.closeSurvey());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('attempt_finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('cancel_finish_survey', () => {
        store.dispatch(sut.cancel());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('cancel_finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('screen is settings when cancel_finish_survey', () => {
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            },
            appState: {
                tabIndex: 2
            }
        });

        store.dispatch(sut.cancel());
        
        const screen = logScreenSpy.mock.calls[0][0];
        expect(screen).toEqual('settings');
    });

    test('finish_survey', () => {
        store.dispatch(sut.finish());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('screen is workout when finish_survey', () => {
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            },
            appState: {
                tabIndex: 0
            }
        });

        store.dispatch(sut.finish());
        
        const screen = logScreenSpy.mock.calls[0][0];
        expect(screen).toEqual('workout');
    });

    test('fill_survey_later', () => {
        store.dispatch(sut.fillOutLater());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('fill_survey_later');
        expect(params.url).toEqual(expectedURL);
    });

    test('screen is history when fill_survey_later', () => {
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            },
            appState: {
                tabIndex: 1
            }
        });

        store.dispatch(sut.fillOutLater());
        
        const screen = logScreenSpy.mock.calls[0][0];
        expect(screen).toEqual('history');
    });

});
