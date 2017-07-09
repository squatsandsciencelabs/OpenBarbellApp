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
import EditHistoryExerciseScreen from '../containers/EditHistoryExerciseScreen';
import EditHistoryTagsScreen from '../containers/EditHistoryTagsScreen';
import UserLoggedOutPanel from '../components/UserLoggedOutPanel';

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

	_renderRow(section, index, item) {
		switch (item.type) {
			case "header":
				// note: on focus will avoid the Redux store for simplicity and just do it through the callback function
				// technically an action to scroll should be application state and therefore should go through the global store
				return (<View style={{marginTop: 15}}>
							<EditHistorySetScreen
								setNumber={item.setNumber}
								setID={item.setID}
								removed={item.removed}
								exercise={item.exercise}
								tags={item.tags}
								weight={item.weight}
								metric={item.metric}
								rpe={item.rpe}
								onFocus={() => {
									this.sectionList.scrollToLocation({sectionIndex: section.position, itemIndex: index});
								}}
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
				ref={(ref) => { this.sectionList = ref; }}
				keyboardDismissMode='on-drag'
				keyboardShouldPersistTaps='always'
				initialNumToRender={13}
				stickySectionHeadersEnabled={false}
				ListFooterComponent={HistoryLoadingFooterScreen}
				renderItem={({item, index, section}) => this._renderRow(section, index, item)}
				renderSectionHeader={({section}) => this._renderSectionHeader(section) }
				sections={this.props.sections}
				onEndReached={() => this.props.finishedLoadingHistory() }
				style = {{padding: 10, backgroundColor: 'white'}}
			/>);
		}
		if (this.props.email !== undefined && this.props.email !== null) {
			return (
				<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
					<EditHistoryExerciseScreen />
					<EditHistoryTagsScreen />

					<View style={{ flex: 1 }}>
						{list}
					</View>

					<View style={{height: 50}}>
						<HistoryFilterBarScreen />
					</View>

				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
					<UserLoggedOutPanel />
					{/* <Text>Only users that are logged in can see history.</Text> */}
				</View>
			)
		}
	}
}

export default HistoryList
