import React, { Component } from 'react'
import { Text, View, ImageBackground,StyleSheet, FlatList } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import globalStyles from '../globalStyles' 
import Task from './components/Task'
import { useState } from 'react'

export default () => {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
    const [tasks, setTasks] = useState([
        {
            id: Math.random(),
            desc: 'Comprar livro de react native',
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: Math.random(),
            desc: 'Ler livro de react native',
            estimateAt: new Date(),
            doneAt: null
        }
    ]) 
    
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Tarefas de hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
               <FlatList    data={tasks} 
                            keyExtractor={item => `${item.id}` }
                            renderItem={({item}) => <Task {...item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: globalStyles.fontFamily,
        fontSize: 30,
        color: globalStyles.colors.secondary,
        marginBottom: 15,
        marginLeft: 15
    },
    subtitle: {
        fontFamily: globalStyles.fontFamily,
        fontSize: 14,
        color: globalStyles.colors.secondary,
        marginBottom: 15,
        marginLeft: 15
    }
})