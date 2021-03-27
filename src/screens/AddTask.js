import React from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native'
import { useEffect, useState } from 'react/cjs/react.development'
import globalStyles from '../globalStyles' 
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default props => {
    const [stateAddTask, setStateAddTask] = useState({...initialState})


    getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={stateAddTask.date} onChange={(_,date) => setStateAddTask({date,showDatePicker: false})} mode='date'/>
        const dateString = moment(stateAddTask.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker=(
                <View>
                    <TouchableOpacity onPress={() => setStateAddTask({...stateAddTask, showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {
                        stateAddTask.showDatePicker &&  datePicker
                    }
                </View>
            )
        }
        return datePicker
    }

    save = () => {
        const newTask = {
            desc: stateAddTask.desc,
            date: stateAddTask.date
        }

        if(props.onSave){
            props.onSave(newTask)
        }

        setStateAddTask(initialState)
        
    }

    return (
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput 
                        style={styles.input} 
                        value={stateAddTask.desc} 
                        placeholder="Informe a descrição"
                        onChangeText={desc => setStateAddTask({...stateAddTask,desc})}
                    />
                    { getDateTimePicker() }
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={props.onCancel} >
                            <Text style={styles.button}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save}>
                            <Text style={styles.button}>
                                salvar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: globalStyles.fontFamily,
        backgroundColor: globalStyles.colors.today,
        color: globalStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: globalStyles.colors.today
    },
    input: {
        fontFamily: global.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date: {
        fontFamily: globalStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})