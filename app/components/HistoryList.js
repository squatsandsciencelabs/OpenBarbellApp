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
import HistorySetExpandedScreen from '../containers/HistorySetExpandedScreen';

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
			case "subheader":
				return (
					<View style={[{flexDirection: 'column', alignItems: 'stretch', paddingTop: 5}, styles.shadow]}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<View style={styles.headerLabel}><Text style={styles.text}>REP</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>AVG</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>PKV</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>PKH</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>ROM</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>DUR</Text></View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
							<View style={styles.headerLabel}><Text style={styles.text}>#</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>m/s</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>m/s</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>%</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>mm</Text></View>
							<View style={styles.headerLabel}><Text style={styles.text}>sec</Text></View>
						</View>
						<View style={styles.horizontalBorder}/>
					</View>
				);
			case "data":
				return (<SetData item={item}
							onPressRemove={() =>this.props.removeRep(item.setID, item.rep) }
							onPressRestore={() => this.props.restoreRep(item.setID, item.rep) }
							onPressRow={() => this.props.viewExpandedSet(item.setID) }
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

		return (
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
				<EditHistoryExerciseScreen />
				<EditHistoryTagsScreen />
				<HistorySetExpandedScreen />

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

const styles = StyleSheet.create({
    headerLabel: {
		flex: 1,
		alignItems: 'center',
	},
	text: {
		color: 'lightgray'
	},
	shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
	},
    horizontalBorder: {
		backgroundColor: 'lightgray',
		opacity: 0.5,
        height: 1,
    },
});

export default HistoryList
