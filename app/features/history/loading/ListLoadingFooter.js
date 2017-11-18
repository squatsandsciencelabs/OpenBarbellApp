import React, {PureComponent} from 'react';
import { ActivityIndicator, View } from 'react-native';

class ListLoadingFooter extends PureComponent {

    render() {
        var indicator = null;
        if (this.props.isLoading) {
            indicator = (<ActivityIndicator color="gray" />);
        }

        var padding = this.props.isLargeFooter ? 100 : 0;

        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: 10, marginBottom: 15, paddingTop: padding, paddingBottom: padding}}>
                {indicator}
            </View>
        );
    }

}

export default ListLoadingFooter;
