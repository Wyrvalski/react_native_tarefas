import React, { useEffect, useState } from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'

const initialState = { desc: '', date: new Date(), showDatePicker: false, id: undefined }

export default AdicionarTarefa = (props) => {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        if(props.editValue) {
            setState({
                desc: props.editValue.desc,
                date: props.editValue.estimateAt,
                id: props.editValue.id
            })
        }
    }, [props.editValue])
    save = () => {
        const newTask = {
            desc: state.desc,
            date: state.date
        }
        props.onSave && props.onSave(newTask)
        setState({ ...initialState })
    }

    edit = () => {
        const newTask = {
            id: state.id,
            desc: state.desc,
            date: state.date
        }
        props.onEdit && props.onEdit(newTask)
        setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={new Date()}
            onChange={(_, date) => setState({ date, showDatePicker: false, desc: state.desc, id: state.id })}
            mode='date' />

        const dateString = moment(state.date).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => setState({ showDatePicker: true, desc: state.desc, date: state.date, id: state.id })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    return (
        <Modal transparent={true} visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide'>
            <TouchableWithoutFeedback
                onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input}
                    placeholder="Informe a Descrição..."
                    onChangeText={desc => setState({ desc: desc, date: state.date, showDatePicker: state.showDatePicker, id: state.id })}
                    defaultValue={state.desc}
                    value={state.desc} />
                {getDatePicker()}
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.editValue ? edit : save}>
                        <Text style={styles.button}>{props.editValue ? 'Editar' : 'Salvar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}