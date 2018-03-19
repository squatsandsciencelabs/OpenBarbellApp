import application from './app/Application'
import { Text, TextInput } from 'react-native';
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

application()
