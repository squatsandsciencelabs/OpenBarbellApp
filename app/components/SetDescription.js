// app/components/SetDescription.js

import React, {PureComponent} from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import LegendBar from './LegendBar';

class SetDescription extends PureComponent {

    render() {
        return (
			<View style={{flex: 1, flexDirection: 'column', marginTop: 15}}>
				<View style={styles.UpperShadow}></View>
				<TouchableHighlight onPress={ () => this.props.onPressRow() } activeOpacity={1}>
					<View style={styles.Description}>
						<View style={{paddingLeft:10, paddingTop: 5, paddingBottom: 7}}>
							<Text style={{color:this.props.item.row1Color}}>{this.props.item.row1}</Text>
							<Text style={{color:this.props.item.row2Color}}>{this.props.item.row2}</Text>
							<Text style={{color:this.props.item.row3Color}}>{this.props.item.row3}</Text>
						</View>
						<View style={{ paddingLeft: 5, paddingRight:17 }}>
							<LegendBar />
						</View>
					</View>
				</TouchableHighlight>
			</View>
		);
    }

}

const styles = StyleSheet.create({
    UpperShadow: {
		shadowColor: "#000000",
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            height: 1,
            weight: 0
        },
        height: 1,
        backgroundColor: 'white'
    },
	Description: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
        flexDirection:'column',
        justifyContent: 'flex-end',
        backgroundColor:'white'
	}
});

export default SetDescription;
