import { StyleSheet, Platform } from 'react-native'
import commonStyles from '../commonsStyles';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 2
    },
    listaTarefas: {
        flex: 8
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    },
    barraTitulo: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    }
});