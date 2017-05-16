// app/components/ListLoadingFooter.js

import React, {PureComponent} from 'react';

import { ActivityIndicator, View }  from 'react-native';

class ListLoadingFooter extends PureComponent {

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: 10, marginBottom: 15}}>
                <ActivityIndicator
					color="gray"
				/>
            </View>
        );
    }

}

export default ListLoadingFooter;
