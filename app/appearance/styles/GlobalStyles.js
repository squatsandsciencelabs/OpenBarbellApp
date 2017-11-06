// TODO: expand this into multiple stylesheets that are legit shared across the application
// TODO: organize this, this is poorly used throughout the application

import {
    StyleSheet
} from 'react-native';

export const SETTINGS_PANEL_STYLES = StyleSheet.create({
    panel: {
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 13,
        marginRight: 13,
        padding: 20,
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    lastPanel: {
        marginBottom: 30
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    subtitleText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(77, 77, 77, 1)',        
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'rgba(77, 77, 77, 1)',
    },
    tappableText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgba(47, 128, 237, 1)'
    },
    content: {
        flex: 1,
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentItemList: {
        flex: 1,
        alignSelf: 'stretch',
        paddingLeft: 10,
        paddingRight: 10
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    footerCancelText: {
        textAlign: 'center',
        color: 'crimson'
    },
    blueButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 3,
        borderWidth: 3,
        borderColor: 'rgba(47, 128, 237, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    }
});
