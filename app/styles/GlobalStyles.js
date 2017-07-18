import {
    StyleSheet
} from 'react-native';

export const SETTINGS_PANEL_STYLES = StyleSheet.create({
    panel: {
        margin: 20,
        padding: 30,
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
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
        textAlign: 'center'
    },
    headerText: {
        fontSize: 16,
        textAlign: 'center'
    },
    tappableText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'blue'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    contentItemList: {
        flex: 1,
        alignSelf: 'stretch',
        paddingLeft: 10,
        paddingRight: 10
    },
    contentItemRow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 5,
        borderColor: 'lightgray',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    contentItemRowText: {
        flex: 3,
        textAlign: 'left',
        color: 'mediumblue',
        fontSize: 22,
        paddingLeft: 10
    },
    contentItemRowConnect: {
        flex: 1
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
        color: 'white',
        padding: 15,
        textAlign: 'center',
    },
});
