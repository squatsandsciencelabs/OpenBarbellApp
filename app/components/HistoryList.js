// app/components/HistoryList.js

import React, { Component } from 'react';
import {
	TouchableHighlight,
	Text,
	StyleSheet,
	View,
	ListView,
	ScrollView,
	Dimensions
} from 'react-native'
import EditHistorySetScreen from '../containers/EditHistorySetScreen';
import LegendBar from './LegendBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import HistoryFilterBarScreen from '../containers/HistoryFilterBarScreen';

class HistoryList extends Component {

	// DATA

	constructor(props) {
		super(props);

		// initialize the datasource
		let	dataSource = new ListView.DataSource({
			sectionHeaderHasChanged: this._sectionHeaderHasChanged,
			rowHasChanged: this._rowHasChanged,
		});
		this.state = {
			dataSource: dataSource.cloneWithRowsAndSections(props.data, props.sectionIDs),
		};
	}

	// state changed, reset the dataSource as needed
	componentWillReceiveProps(nextProps) {
		if (nextProps.shouldShowRemoved !== this.props.shouldShowRemoved) {
			this.refs.listView.scrollTo({x:0, y: 0, animated: false});
		}
		
		if (nextProps.data !== this.props.data || nextProps.sectionIDs !== this.props.sectionIDs || nextProps.shouldShowRemoved !== this.props.shouldShowRemoved) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.data, nextProps.sectionIDs),
			});
		}
	}

	_sectionHeaderHasChanged(s1, s2) {
		return s1 !== s2;
	}

	_rowHasChanged(r1, r2) {
		return r1 !== r2;
	}

	// ACTION

	_onPressRow(rowData) {
		this.props.editHistorySet(rowData.setID);
	}

	_onPressRemove(rowData) {
		this.props.removeRep(rowData.setID, rowData.rep);
	}

	_onPressRestore(rowData) {
		this.props.restoreRep(rowData.setID, rowData.rep);
	}

	// RENDER

	_renderSectionHeader(set, sectionID) {
		return (
			<View>
				<View style={{backgroundColor:'rgba(0, 0, 0, 0)', height:20}}>
				</View>
			</View>
		);
	}

	_renderRow(rowData, sectionID, rowID) {
		if (rowData.type == "header") {
			//render headers
			return (
				<TouchableHighlight onPress={ () => this._onPressRow(rowData) } activeOpacity={1} >
					<View style={{flexDirection:'column', justifyContent: 'flex-end', backgroundColor:'white', overflow:'hidden'}}>
						<View style={{paddingLeft:10, paddingTop: 5, paddingBottom: 7}}>
							<Text style={{color:rowData.row1Color}}>{rowData.row1}</Text>
							<Text style={{color:rowData.row2Color}}>{rowData.row2}</Text>
							<Text style={{color:rowData.row3Color}}>{rowData.row3}</Text>
						</View>
						<View style={{ paddingLeft: 5, paddingRight:17 }}>
							<LegendBar />
						</View>
					</View>
				</TouchableHighlight>
			);
		} else {
			// render data

			var button = null;
			if (rowData.removed === false) {
				button = (
					<TouchableHighlight onPress={ () => this._onPressRemove(rowData) }>
						<Icon name="close" size={20} color="lightgray" style={{marginTop: 10}} />
					</TouchableHighlight>
				);
			} else {
				button = (
					<TouchableHighlight onPress={ () => this._onPressRestore(rowData) }>
						<Icon name="undo" size={20} color="lightgray" style={{marginTop: 10}} />
					</TouchableHighlight>
				);
			}

			var dataStyle = rowData.removed ? styles.removedData : styles.data;
			
			return (
				<View style={{flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}}>
					<TouchableHighlight style={{flex:1}} onPress={ () => this._onPressRow(rowData) } activeOpacity={1} >
						<View style={styles.bar}>
							<Text style={dataStyle}> { rowData.repDisplay } </Text>
							<Text style={dataStyle}> { rowData.averageVelocity } </Text>
							<Text style={dataStyle}> { rowData.peakVelocity } </Text>
							<Text style={dataStyle}> { rowData.peakVelocityLocation } </Text>
							<Text style={dataStyle}> { rowData.rangeOfMotion } </Text>
							<Text style={dataStyle}> { rowData.duration } </Text>
						</View>
					</TouchableHighlight>

					{button}
				</View>
			);
		}
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
				<View style={{ flex: 1 }}>
					<EditHistorySetScreen />
					<ListView
						ref="listView"
						enableEmptySections = { true }
						initialListSize = { 15 }
						pageSize = { 3 }
						scrollRenderAheadDistance = { 3000 }
						dataSource={this.state.dataSource}
						renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
						renderSectionHeader={(set, sectionID) => this._renderSectionHeader(set, sectionID)}
						style = {[styles.Shadow, { backgroundColor: 'rgba(0, 0, 0, 0)'}]} />
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
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
		padding: 10,
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
