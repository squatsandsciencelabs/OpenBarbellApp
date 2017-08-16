import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron
  .configure({name: 'OpenBarbell'}) // controls connection & communication settings
  .use(sagaPlugin()) // add all built-in react native plugins
  .use(reactotronRedux()) // add all built-in react native plugins
  .connect() // let's connect!

console.tron = Reactotron
