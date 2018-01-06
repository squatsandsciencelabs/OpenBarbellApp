jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as Analytics from 'app/services/Analytics';
import * as sut from 'app/redux/shared_actions/SurveyActionCreators';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logScreenSpy = null;
var store = null;

describe('SettingsActionCreators', () => {

    const expectedURL = 'foobar';

    beforeEach(() => {
        logScreenSpy = jest.spyOn(Analytics, 'setCurrentScreen').mockImplementation(() => {});        
        store = mockStore({
            survey: {
                surveyURL: expectedURL
            }
        });
    });

    afterEach(() => {
        logScreenSpy.mockReset();        
    });

    afterAll(() => {
        logScreenSpy.mockRestore();
    });   

    test('set analytics screen when presenting', () => {
        store.dispatch(sut.presentSurvey());
        
        const screen = logScreenSpy.mock.calls[0][0];
        expect(screen).toEqual('survey');
    });

});
