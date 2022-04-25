import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'
import commonStyles from '../commonsStyles'
import todayImage from '../../../assets/imgs/hoje.jpg'
import Tarefas from '../../components/Tarefas/Tarefas'
import AdicionarTarefa from '../../components/AdicionarTarefa/AdicionarTarefa'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from './styles'

export default ListaTarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [showDoneTasks, setShowDoneTasks] = useState(true);
    const [editValue, setEditValue] = useState(false);

    useEffect(() => {
        const stateString = async () => {
            const tarefasStorage = await AsyncStorage.getItem('tarefas')
            const state = JSON.parse(tarefasStorage) || tarefas
            setTarefas(state);
        }
        stateString()
    }, [])

    useEffect(() => {
        this.filterTasks()
    }, [JSON.stringify(tarefas), showDoneTasks])

    toggleFilter = () => {
        setShowDoneTasks(!showDoneTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (showDoneTasks) {
            visibleTasks = tarefas
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = tarefas.filter(pending)
        }

        setVisibleTasks(visibleTasks)
        AsyncStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    toggleTask = taskId => {
        const tasks = [...tarefas]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        setTarefas(tasks)
    }

    addTask = newTask => {
        const tasks = tarefas ?? []

        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return;
        }

        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })
        setTarefas(tasks)
        setShowAddTask(false)
        setEditValue(false)
    }

    editTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }
        const tasks = []
        tarefas.forEach(item => {
            if (item.id === newTask.id) {
                tasks.push({
                    id: newTask.id,
                    desc: newTask.desc,
                    estimateAt: newTask.date,
                    doneAt: null
                })
                return;
            }
            tasks.push(item)

        })
        setTarefas(tasks)
        setShowAddTask(false)
        setEditValue(false)
    }
    deleteTask = id => {
        const tasks = tarefas.filter(task => task.id !== id)
        setTarefas(tasks)
    }

    editItem = (item) => {
        setEditValue(item)
        setShowAddTask(true)
    }

    return (
        <View style={styles.container}>
            <AdicionarTarefa isVisible={showAddTask || editValue}
                onCancel={() => {
                    setShowAddTask(false); setEditValue(false);
                }}
                onSave={this.addTask} editValue={editValue} onEdit={this.editTask} />
            <ImageBackground source={todayImage}
                style={styles.background}>
                <View style={styles.barraTitulo}>
                    <Text style={styles.title}>Tarefas Agendadas</Text>
                </View>
            </ImageBackground>
            <TouchableOpacity onPress={this.toggleFilter}>

                <View style={styles.iconBar}>
                    <Icon name={showDoneTasks ? 'eye' : 'eye-slash'}
                        size={20} color={commonStyles.colors.secondary} />
                </View>
            </TouchableOpacity>
            <View style={styles.listaTarefas}>
                <FlatList data={visibleTasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Tarefas {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} editItem={this.editItem} />} />
            </View>

            <TouchableOpacity style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => setShowAddTask(true)}>
                <Icon name="plus" size={20}
                    color={commonStyles.colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}