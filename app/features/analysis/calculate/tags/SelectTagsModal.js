// TODO: consider splitting this component into two different ones rather than using if statements everywhere

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
    Platform,
}  from 'react-native';

import Pill from 'app/shared_features/pill/Pill';

class EditTextModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            inputs: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        // inputs
        if (nextProps.inputs !== undefined) {
            var inputs = [...nextProps.inputs];
        } else {
            var inputs = [];
        }
        this.setState({inputs: inputs});

        // set text
        let text = nextProps.text;
        if (text === null || text === undefined) {
            text = '';
        }
        this._updateText(text, nextProps.bias);

        // update suggestions
        this._updateSuggestions(text, inputs, nextProps.bias);
    }

    // HELPERS

    _addNewPill(input, resetText=false) {
        // valid check
        if (this.state.inputs.includes(input) || input == '') {
            return;
        }

        this.props.addPill();        

        if (resetText) {
            var text = '';
            this.setState({
                text: text,
            });
        } else {
            var text = this.state.text;
        }

        let inputs = [...this.state.inputs, input];
        this.setState({
            inputs: inputs
        });
        this._updateSuggestions(text, inputs);
    }

    _removePill(index) {
        let inputsCopy = [...this.state.inputs];
        inputsCopy.splice(index, 1);
        this.setState({
            inputs: inputsCopy
        });
        this._updateSuggestions(this.state.text, inputsCopy);
    }

    _updateText(input, bias=this.props.bias) {
        this.setState({
            text: input,
        });
        this._updateSuggestions(input, bias);
    }

    _updateSuggestions(input=this.state.text, inputs=this.state.inputs, bias=null) {
        var suggestions = this.props.generateSuggestions;

        let suggestionsVM = suggestions.map((suggestion) => { return {key: suggestion}} );
        this.setState({
            suggestions: suggestionsVM,
        });
    }

    // ACTIONS

    _onChangeText(input) {
        if (input.slice(-1) === '\n') {
            // enter tapped in multiline mode, update accordingly
            this._addNewPill(this.state.text, true);
        } else {
            // update the text
            this._updateText(input);
        }
    }

    _tappedRow(input) {
        this._addNewPill(input, true);
    }

    _tappedDone() {
        if (this.state.text) {
            var inputs = [...this.state.inputs, this.state.text];
        } else {
            var inputs = this.state.inputs;
        }

        this.props.save(inputs);            

        this.props.closeModal();
    }

    _tappedEnter() {
        // this is android only, iOS instead uses the \n check in onChangeText
        this._addNewPill(this.state.text, true);

    }

    _tappedPill(index) {
        this._removePill(index);
        this.props.tappedPill();
    }

    // RENDER

    // TODO: grab the blue color for cancel from a global stylesheet
    _renderNavigation() {
        if (Platform.OS === 'ios') {
            var statusBar = (<View style={{height: 20, width: 9001, backgroundColor: 'black'}}></View>);
        } else {
            var statusBar = null;
        }

        return (
            <View style={styles.container}>
                { statusBar }

                <View style={{position: 'absolute', left: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this.props.cancelModal()}>
                        <View style={styles.nav}>
                            <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.navTitle}>
                    <Text style={{color: 'rgba(77, 77, 77, 1)'}}>{this.props.title}</Text>
                </View>

                <View style={{position: 'absolute', right: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this._tappedDone() }>
                        <View style={styles.nav}>
                            <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderHeader() {
        var pills = [];
        this.state.inputs.map((input) => {
            let position = pills.length;
            let text = input;
            pills.push(
                <TouchableOpacity key={position} onPress={() => this._tappedPill(position) }>
                    <Pill text={text} style={{paddingRight: 5, paddingBottom: 3}} />
                </TouchableOpacity>
            );
        });

        if (pills.length === 0) {
            return;
        } else {
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 10, paddingRight: 5, marginBottom: 5}}>
                    {pills}
                </View>
            );
        }
    }

    _renderTextField() {
        var returnKeyType = 'go';
        
        if (this.state.inputs.includes(this.state.text) || this.state.text == '') {
            var button = (
                <View style={[{width: 50, height: 50, marginRight: 10}, styles.addButton, styles.disabled]}>
                    <Text style={styles.addText}>Add</Text>
                </View>
            );
        } else {
            var button = (
                <TouchableOpacity onPress={() => this._tappedEnter()}>
                    <View style={[{width: 50, height: 50, marginRight: 10}, styles.addButton]}>
                        <Text style={styles.addText}>Add</Text>
                    </View>
                </TouchableOpacity>
            );
        }


        return (
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={[{flex: 1, height: 50, marginHorizontal: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#e0e0e0'}]}>
                    <TextInput
                        style={styles.textField}
                        placeholderTextColor={'rgba(189, 189, 189, 1)'}
                        underlineColorAndroid={'transparent'}
                        editable = {true}
                        autoFocus={true}
                        placeholder={this.props.placeholder}
                        returnKeyType={returnKeyType}
                        value={this.state.text}
                        multiline={Platform.os === 'ios' ? true : false } //Android multiline screws up spacing
                        onSubmitEditing = {() => this._tappedEnter()}
                        onChangeText={(text) => this._onChangeText(text) }
                        clearButtonMode = {'while-editing'}
                    />
                </View>
                {button}
            </View>
        )
    }

    _renderList() {
        let data = this.state.suggestions;

        if (data && data.length === 0) {
            return null;
        }

        return (
            <FlatList
                style = {{padding: 10}}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='always'
                initialNumToRender={13}
                data={data}
                ListHeaderComponent={this._renderTopBorder}
                ListFooterComponent={this._renderBottomBorder}
                renderItem={({item}) => this._renderRow(item)}
                ItemSeparatorComponent = {this._renderSeparator}
            />
        )
    }

    _renderRow(item) {
        if (item.key === 'bug') {
            // hack to get bug pill working
            // TODO: make this generic rather than specific so you can have multiple pill types
            return (
                <TouchableHighlight onPress={() => this._tappedRow(item.key)}>
                    <View style={[{backgroundColor: 'white', height: 50, justifyContent: 'center'}, styles.rowBorders]}>
                        <Text style={{marginHorizontal: 10, color: 'red'}}>{item.key}</Text>
                    </View>
                </TouchableHighlight>
            );            
        } else {
            return (
                <TouchableHighlight onPress={() => this._tappedRow(item.key)}>
                    <View style={[{backgroundColor: 'white', height: 50, justifyContent: 'center'}, styles.rowBorders]}>
                        <Text style={{marginHorizontal: 10, color: 'rgba(77, 77, 77, 1)'}}>{item.key}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    // TODO: move 242 gray from global stylesheet
    _renderSeparator() {
        return (
            <View style={[{ backgroundColor: 'white'}, styles.rowBorders]}>
                <View style={{marginHorizontal: 10, backgroundColor: 'rgba(242, 242, 242, 1)', height: 1}}></View>
            </View>
        );
    }

    _renderTopBorder() {
        return (
            <View style={{ backgroundColor: '#e0e0e0', flex: 1, height: 1}} />
        );
    }

    _renderBottomBorder() {
        return (
            <View style={{ backgroundColor: '#e0e0e0', flex: 1, height: 1, marginBottom: 20}} />
        );
    }

    // TODO: move 242 gray from global stylesheet
    render() {
        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgba(242, 242, 242, 1)'}}>
                    {this._renderNavigation()}
                    {this._renderHeader()}
                    {this._renderTextField()}
                    {this._renderList()}
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    textField: {
        height: 35,
        margin: 10,
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 14,
        paddingBottom: Platform.os === 'ios' ? 0 : 10,
    },
    container: {
        height: Platform.OS === 'ios' ? 70 : 50,
        alignItems: 'center'
    },
    nav: {
        paddingTop: Platform.OS === 'ios' ? 35 : 15,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    navTitle: {
        paddingTop: 15,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 5
    },
    disabled: {
        opacity: 0.3
    },
    addText: {
        color: 'white'
    },
    rowBorders: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    }
});

export default EditTextModal;
