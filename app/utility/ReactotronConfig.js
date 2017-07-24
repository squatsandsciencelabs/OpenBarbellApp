import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron
  .configure({name: 'OpenBarbell'}) // controls connection & communication settings
  .use(reactotronRedux()) // add all built-in react native plugins
  .connect() // let's connect!
