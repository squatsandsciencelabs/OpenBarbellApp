import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import * as DateUtils from 'app/utility/transforms/DateUtils';

class LiveRestRow extends Component {

    constructor(props) {
        super(props);
        this.state = { rest: '--:--' };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const restInMS = (new Date()).getTime() - this.props.restStartTimeMS;
            const restString = DateUtils.restInShortenedClockFormat(restInMS);
            this.setState({
                rest: restString
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text style={{flex: 1, textAlign: 'center', marginTop: 15, color: 'gray', marginBottom: 15}}>{ this.state.rest }</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
});

export default LiveRestRow;
