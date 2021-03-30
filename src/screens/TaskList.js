import React, { Component } from 'react'
import { Text, View, ImageBackground,StyleSheet, FlatList, Platform, TouchableOpacity, Alert } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import globalStyles from '../globalStyles' 
import Task from './components/Task'
import { useState } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react'
import AddTask from './AddTask'
import AsyncStorage from '@react-native-community/async-storage'



export default () => {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
    const [tasks, setTasks] = useState([]) 
    const [showDoneTasks,setShowDoneTasks] = useState(true)
    const [visibleTasks, setVisibleTasks] = useState([])
    const [showAddTask, setShowAddTask] = useState(false)


    toggleFilter = () => {
        setShowDoneTasks(!showDoneTasks)
    }

    filterTasks = () => {
        let  visibleTasksAux = null
        if(showDoneTasks){
            visibleTasksAux = [...tasks]
        }else{
            visibleTasksAux = tasks.filter(task => task.doneAt === null)
        }

        setVisibleTasks(visibleTasksAux)
    }

    useEffect(()=>{ 
        recuperaDados()
        filterTasks()
    },[])

    const recuperaDados = async () => {
        const stateString = await AsyncStorage.getItem('state')
        const state = JSON.parse(stateString)
        setTasks(state.tasks || [])
        setShowDoneTasks(state.showDoneTasks || true)
        setVisibleTasks(state.visibleTasks || [])
        setShowAddTask(state.showAddTask || false)
    }

    useEffect(()=>{
        filterTasks()
        AsyncStorage.setItem('state', JSON.stringify({tasks,showDoneTasks,visibleTasks,showAddTask}))
    },[showDoneTasks,tasks])

    toggleTask = taskId => {
        const tasksAux = [...tasks]

        tasksAux.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ?null : new Date()
            }
        })

        setTasks(tasksAux)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Invalidos', 'Descrição não informada')
            return
        }

        const tasksAux = [...tasks]
        tasksAux.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        setTasks(tasksAux)
        setShowAddTask(false)
    }
    deleteTask = id => {
        const tasksAux = tasks.filter(task => task.id !== id)
        setTasks(tasksAux)
    }
    
    return (
        <View style={styles.container}>
            <AddTask onCancel={() => setShowAddTask(false)} onSave={addTask} isVisible={showAddTask} />
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <Icon onPress={toggleFilter} name={showDoneTasks ? "eye" :  "eye-slash"} size={20} color={globalStyles.colors.secondary}/>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Tarefas de hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
               <FlatList    data={visibleTasks} 
                            keyExtractor={item => `${item.id}` }
                            renderItem={({item}) => <Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowAddTask(true)} activeOpacity={0.7}>
                <Icon name="plus" size={20} color={globalStyles.colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 30 : 10 
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: globalStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})