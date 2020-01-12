import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
    // development, enable reactotron
    Reactotron
    .configure({
        name: 'OpenBarbell',
        host: '192.168.1.142',
    }) // controls connection & communication settings
    .use(sagaPlugin()) // add all built-in react native plugins
    .use(reactotronRedux()) // add all built-in react native plugins
    .connect() // let's connect!

    console.tron = Reactotron
} else {
    // production, remove tron logs
    console.tron = {};
    console.tron.log = () => {};
    console.tron.display = () => {};
}
