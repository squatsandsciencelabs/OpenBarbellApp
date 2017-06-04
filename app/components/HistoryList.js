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
} from 'react-native';
import EditHistorySetScreen from '../containers/EditHistorySetScreen';
import SetDescription from './SetDescription';
import SetData from './SetData';
import SetRest from './SetRest';
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

	_renderRow(item) {
		switch (item.type) {
			case "header":
				return (<View style={{marginTop: 15}}>
							<EditHistorySetScreen
								setNumber={item.setNumber}
								setID={item.setID}
								removed={item.removed}
								exercise={item.exercise}
								weight={item.weight}
								metric={item.metric}
								rpe={item.rpe}
							/>
						</View>);
			case "data":
				// TODO: full screen view!
				return (<SetData item={item}
							onPressRemove={() =>this.props.removeRep(item.setID, item.rep) }
							onPressRestore={() => this.props.restoreRep(item.setID, item.rep) }
							onPressRow={() => console.log("this is where should display full screen view") }
						/>);
			case "footer":
				return (<SetRest item={item} />);
			default:
				break;
		}
	}

	render() {
		var list = null;
		if (this.props.sections.length > 0) {
			list = (<SectionList
				keyboardDismissMode='on-drag'
				keyboardShouldPersistTaps='always'
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
					{list}
				</View>

				<View style={{height: 50}}>
					<HistoryFilterBarScreen />
				</View>

			</View>
		);
	}
}

export default HistoryList
