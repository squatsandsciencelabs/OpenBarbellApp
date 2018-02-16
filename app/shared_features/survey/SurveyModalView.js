import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    WebView,
    StyleSheet,
 }  from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 
 class SurveyModalView extends Component {

    _close() {
        this.props.closeModal();
    }

    // RENDER

    // TODO: grab the blue color for cancel from a global stylesheet
    _renderNavigation() {
        if (Platform.OS === 'ios') {
            var statusBar = (<View style={{height: 20, width: 9001, backgroundColor: 'black'}}></View>);
        } else {
            var statusBar = null;
        }

        // TODO: consider using close icon instead of X text
        return (
            <View style={styles.container}>
                { statusBar }

                <View style={{position: 'absolute', left: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this._close() }>
                        <View style={styles.nav}>
                            <Icon name="times-circle" size={20} color='red' />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.navTitle}>
                    <Text style={{color: 'rgba(77, 77, 77, 1)'}}>Survey</Text>
                </View>

            </View>
        )
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.isModalShowing} >

                <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
                    {this._renderNavigation()}

                    <WebView
                        source={{uri: this.props.url}}
                        style={{flex:1}}
                    />

                </View>

            </Modal>
        );
    }

 }

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 70 : 50,
        alignItems: 'center',
        backgroundColor: 'white'
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
});

export default SurveyModalView;
