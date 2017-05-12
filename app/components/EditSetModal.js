// app/components/EditSetModal.js

import React, {Component} from 'react';
import {
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	Modal,
	StyleSheet,
	TouchableOpacity,
	Slider
}  from 'react-native';
import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles'; // TODO: shouldn't use settings panel styles, make it generic

class EditSetModal extends Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentWillReceiveProps(nextProps) {
		var set = nextProps.set;
		if (set === undefined) {
			// the last set you edited has disappeared, reset everything
			this.setState({exercise:null, weight:null, metric:null, rpe:null});
		} else {
			// update with latest set info
			this.setState({exercise:set.exercise, weight:set.weight, metric:set.metric, rpe:set.rpe});
		}
	}

	_close() {
		var setID = this.props.set.setID;
		this.props.updateSet(setID, this.state.exercise, this.state.weight, this.state.metric, this.state.rpe);
		this.props.closeModal();
	}

	_updateRPE(value) {
		this.setState({rpe: value})
	}

	// TODO: move this stuff out into separate views or something, this is messy
	render() {
		return (
			<Modal
				animationType={"slide"}
				transparent={true}
				visible={this.props.modalShowing} >

				<View style={styles.tint}>
					<KeyboardAvoidingView style={styles.popup} behavior={'padding'} >
						<View style={styles.popupContainer}>
							<Text style={{fontSize: 15, textAlign: 'left', fontWeight: 'bold', paddingBottom: 3}}>Exercise</Text>
							<TouchableOpacity onPress={this.clearText}>
							<TextInput ref='ExerciseInput'
								style={{height: 45, borderColor: 'gray', borderWidth: 1, fontSize: 15}}
								autoFocus={true}
								underlineColorAndroid={'transparent'}
								onSubmitEditing={(event) => { this.refs.WeightInput.focus(); }}
								onChangeText={(exercise) => this.setState({exercise: exercise}) }
								value={this.state.exercise} />
							</TouchableOpacity>
						</View>

						<View style={styles.popupContainer}>
							<Text style={{fontSize: 15, textAlign: 'left', fontWeight: 'bold', paddingBottom: 3}}>Weight</Text>
							<View style={{flexDirection:'row', justifyContent: 'space-between'}}>
								<TextInput ref='WeightInput'
									style={{height: 45, flex: 1, borderColor: 'gray', borderWidth: 1, fontSize: 15}}
									keyboardType='numeric'
									underlineColorAndroid={'transparent'}
									onChangeText={(weight) => this.setState({weight: weight}) }
									value={this.state.weight} />

								{ this._renderMetrics() }
							</View>
						</View>

						<View style={styles.rpeCard}>

							<View style={{flex:1, flexDirection:'row'}}>
								<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>RPE</Text>

								{ this._renderRPE() }
							</View>

							{ this._renderRPESlider() }
						</View>

						<View style={styles.popupContainer}>
							<TouchableHighlight onPress={() => this._close()}>
								<Text style={SETTINGS_PANEL_STYLES.blueButton}>DONE</Text>
							</TouchableHighlight>
						</View>
					</KeyboardAvoidingView>
				</View>

			</Modal>
		)
	}

	// TODO: the logic of lbs vs kgs should be its own place
	// OR at least using constants
	_renderMetrics() {
		var metric = this.state.metric;
		if (metric == 'kgs') {
			return (
				<View style={{ flexDirection:'row', paddingLeft: 10, paddingTop: 10 }}>
					<Text style={{fontWeight: 'bold'}}>KGs</Text>
					<Text style={{color: 'gray'}}> / </Text>
					<TouchableHighlight onPress={() => this.setState({metric: 'lbs'})} >
						<Text style={{color: 'gray'}}>LBs</Text>
					</TouchableHighlight>
				</View>
			);
		} else {
			return (
				<View style={{ flexDirection:'row', paddingLeft: 10, paddingTop: 10 }}>
					<TouchableHighlight onPress={() => this.setState({metric: 'kgs'})} >
						<Text style={{color: 'gray'}}>KGs</Text>
					</TouchableHighlight>
					<Text> / </Text>
					<Text style={{fontWeight: 'bold'}}>LBs</Text>
				</View>
			);
		}
	}

	_renderRPE() {
		var rpe = this.state.rpe;
		if (rpe == null) {
			return (
					<Text style={{fontSize:20, paddingLeft:10, paddingRight: 10, color:'gray', textAlign: 'left'}}>
						5
					</Text>
			);
		} else {
			return (
					<Text style={{fontSize:20, paddingLeft:10, paddingRight: 10, textAlign: 'right'}}>
						{rpe}
					</Text>
			);
		}
	}

	_renderRPESlider() {
		var rpe = this.state.rpe;
		if (rpe == null) {
			rpe = 5;
		}
		
		return (
			<View style={{flex:1}}>
				<Slider
					minimumValue={1}
					maximumValue={10}
					value={rpe}
					step={0.5}
					onValueChange={(value) => this._updateRPE(value)}
					style={{flex:1}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	popup: {
		flexDirection: 'column',
		position: 'absolute',
		borderWidth: 1,
		backgroundColor: 'white',
		borderColor: 'rgba(0,0,0,0.1)',
		margin: 15,
		marginTop: 30,
		padding: 15,
		shadowColor: '#ccc',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 3,
		flex: 1,
		top: 0,
		left: 0,
		right: 0
	},
	tint: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		flex: 1
	},
	textBox: {
		fontSize: 15
	},
	blueButton: {
		backgroundColor: 'rgba(47, 128, 237, 1)',
		justifyContent: 'center',
		height: 48,
		width: 138
	},
	rpeCard: {
		flexDirection: 'column',
		padding: 10,
		flex: 1
	},
	popupContainer: {
		justifyContent: 'center',
		padding: 10,
		flex: 1
	}
});

export default EditSetModal;
