import { Dimensions, Platform } from 'react-native';

export const isSmallDevice = () => {
    const { width } = Dimensions.get('window');

    return (width <= 350);
};

export const isiPhoneX = () => {
    const { width, height } = Dimensions.get('window');
  
    return (
        Platform.OS === 'ios' && (height === 812 || width === 812)
    );
}
