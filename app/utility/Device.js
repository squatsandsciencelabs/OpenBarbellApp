import { Dimensions } from 'react-native';

export const isSmallDevice = () => {
    const { width } = Dimensions.get('window');

    return (width <= 350);
};
