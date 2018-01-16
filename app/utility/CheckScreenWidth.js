import { Dimensions } from 'react-native';

export const checkScreenWidth = () => {
    const { width } = Dimensions.get('window');

    return (width > 350);
};

