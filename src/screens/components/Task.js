import React from 'react'
import { View,Text, StyleSheet, TouchableWithoutFeedback,TouchableOpacity, TouchableOpacityComponent } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../globalStyles'
import moment from 'moment'
import 'moment/locale/pt-br'


export default props => {
    const doneOrNotStyle = props.doneAt != null && props.doneAt != 'undefined' ?{textDecorationLine: 'line-through'} : {}
    const date = props.doneAt != null && props.doneAt != 'undefined' ? props.doneAt : props.estimateAt 
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    const getRightContent = () => {
        return(
            <TouchableOpacity onPress={() => props.onDelete(props.id) } style={styles.right}>
                <Icon name="trash" size={30} color="#fff"/>
            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return(
            <View style={styles.left}>
                <Icon name="trash" size={30} color="#fff" style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    return (
        <Swipeable onSwipeableLeftOpen={() => props.onDelete(props.id)} renderLeftActions={getLeftContent} renderRightActions={getRightContent}>
            <TouchableWithoutFeedback onPress={ () => props.toggleTask(props.id)}>
                <View style={styles.container}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                    <View >
                        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={styles.date} >{formattedDate}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>

    )
}

function getCheckView(doneAt){
    if(doneAt != null && doneAt != 'undefined'){
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    }else{
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    excludeText:{
        fontFamily: globalStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 20
    },
    excludeIcon: {
        marginLeft: 10
    }  
})