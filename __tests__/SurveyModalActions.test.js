jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Alert } from 'react-native';

import * as Analytics from 'app/services/Analytics';
import * as sut from 'app/shared_features/survey/SurveyModalActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('SettingsSurveyActions', () => {

    const expectedURL = 'foobar';

    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});        
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            }
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();        
    });

    afterAll(() => {
        logEventSpy.mockRestore();
    });

    test('log url when attempt finish survey', () => {
        store.dispatch(sut.closeSurvey());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('attempt_finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('log url when cancel survey', () => {
        store.dispatch(sut.cancel());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('cancel_finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('log url when finish survey', () => {
        store.dispatch(sut.finish());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('finish_survey');
        expect(params.url).toEqual(expectedURL);
    });

    test('log url when fill out later', () => {
        store.dispatch(sut.fillOutLater());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('fill_survey_later');
        expect(params.url).toEqual(expectedURL);
    });

});
