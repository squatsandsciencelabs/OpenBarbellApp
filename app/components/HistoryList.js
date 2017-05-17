// app/components/HistoryList.js

import React, { Component } from 'react';
import {
	TouchableHighlight,
	Text,
	StyleSheet,
	View,
	SectionList,
	ScrollView,
	Dimensions,
	ListItem
} from 'react-native'
import EditHistorySetScreen from '../containers/EditHistorySetScreen';
import LegendBar from './LegendBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import HistoryFilterBarScreen from '../containers/HistoryFilterBarScreen';
import HistoryLoadingFooterScreen from '../containers/HistoryLoadingFooterScreen';

class HistoryList extends Component {

	// UPDATE

	shouldComponentUpdate(nextProps) {
		const differentShowRemoved = nextProps.shouldShowRemoved !== this.props.shouldShowRemoved;
		const differentSections = nextProps.sections !== this.props.sections;
		return differentShowRemoved || differentSections;
    }

	// ACTION

	_onPressRow(item) {
		this.props.editHistorySet(item.setID);
	}

	_onPressRemove(item) {
		this.props.removeRep(item.setID, item.rep);
	}

	_onPressRestore(item) {
		this.props.restoreRep(item.setID, item.rep);
	}

	// RENDER

	_renderSectionHeader(section) {
		return (
			<View>
				<View style={{height:40, justifyContent: 'flex-end', alignItems: 'center'}}>
					<Text>{section.key}</Text>
				</View>
			</View>
		);
	}

	_renderHeader(item) {
		return (
			<View style={{flex: 1, flexDirection: 'column', marginTop: 15}}>
				<View style={[styles.Shadow, {height: 1, backgroundColor: 'white', shadowRadius: 2, shadowOpacity: 1, shadowOffset: { height: 1, weight: 0 }}]}></View>
				<TouchableHighlight onPress={ () => this._onPressRow(item) } activeOpacity={1}>
					<View style={[styles.Shadow, {flexDirection:'column', justifyContent: 'flex-end', backgroundColor:'white'}]}>
						<View style={{paddingLeft:10, paddingTop: 5, paddingBottom: 7}}>
							<Text style={{color:item.row1Color}}>{item.row1}</Text>
							<Text style={{color:item.row2Color}}>{item.row2}</Text>
							<Text style={{color:item.row3Color}}>{item.row3}</Text>
						</View>
						<View style={{ paddingLeft: 5, paddingRight:17 }}>
							<LegendBar />
						</View>
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	_renderData(item) {
		var button = null;
		if (item.removed === false) {
			button = (
				<TouchableHighlight onPress={ () => this._onPressRemove(item) }>
					<Icon name="close" size={20} color="lightgray" style={{marginTop: 10}} />
				</TouchableHighlight>
			);
		} else {
			button = (
				<TouchableHighlight onPress={ () => this._onPressRestore(item) }>
					<Icon name="undo" size={20} color="lightgray" style={{marginTop: 10}} />
				</TouchableHighlight>
			);
		}

		var dataStyle = item.removed ? styles.removedData : styles.data;
		
		return (
			<View style={[styles.Shadow, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
				<TouchableHighlight style={{flex:1}} onPress={ () => this._onPressRow(item) } activeOpacity={1} >
					<View style={styles.bar}>
						<Text style={dataStyle}> { item.repDisplay } </Text>
						<Text style={dataStyle}> { item.averageVelocity } </Text>
						<Text style={dataStyle}> { item.peakVelocity } </Text>
						<Text style={dataStyle}> { item.peakVelocityLocation } </Text>
						<Text style={dataStyle}> { item.rangeOfMotion } </Text>
						<Text style={dataStyle}> { item.duration } </Text>
					</View>
				</TouchableHighlight>

				{button}
			</View>
		);
	}

	_renderFooter(item) {
		return (
			<View style={[styles.Shadow, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
				<Text style={{flex: 1, textAlign: 'center', marginTop: 15, color: 'gray', marginBottom: 15}}>{ item.rest }</Text>
			</View>
		);
	}

	_renderRow(item) {
		switch (item.type) {
			case "header":
				return this._renderHeader(item);
			case "data":
				return this._renderData(item);
			case "footer":
				return this._renderFooter(item);
			default:
				break;
		}
	}

	render() {
		var list = null;
		if (this.props.sections.length > 0) {
			list = (<SectionList
				initialNumToRender={13}
				stickySectionHeadersEnabled={false}
				ListFooterComponent={HistoryLoadingFooterScreen}
				renderItem={({item}) => this._renderRow(item)}
				renderSectionHeader={({section}) => this._renderSectionHeader(section) }
				sections={this.props.sections}
				onEndReached={() => this.props.finishedLoadingHistory() }
				style = {{padding: 10, backgroundColor: 'white'}}
			/>);
		}

		return (
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
				<View style={{ flex: 1 }}>
					<EditHistorySetScreen />
					{list}
				</View>

				<View style={{height: 50}}>
					<HistoryFilterBarScreen />
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	Shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
	},
	bar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		left: 0,
		right: 0,
		bottom: 0,
		height: 40,
		padding: 0,
		paddingLeft: 5,
		overflow: 'hidden'
	},
	data: {
		width: 45,
		textAlign: 'center'
	},
	removedData: {
		width: 45,
		textAlign: 'center',
		color: 'lightgray'
	}
});

export default HistoryList
