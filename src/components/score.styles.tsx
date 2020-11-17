import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        minHeight: 150,
        width: '100%'
    },
    title: {
        flex: 1,
        color: '#00c',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lowerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    halfViewContainer: {
        flexDirection: 'row',
        flex: 1
    },
    flexOne: {
        flex: 1
    },
    innerTitle: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    innerValue: {
        flex: 1,
        color: 'orange',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default styles;
