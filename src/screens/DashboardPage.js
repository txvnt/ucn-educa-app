import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import { getCourses } from '../services/Courses';

const DashboardPage = props => {

    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        getCourses()
        .then(response => setCourses(response));
    }, []);


    const renderCourse = ({ item }) => {
        const { codigo, nombre } = item;

        return(
            <TouchableOpacity onPress={() => goToCourse(codigo)} style={styles.courseContainer}>
                <Text style={styles.courseTitle}>{nombre}</Text>
                <Text style={styles.courseCode}>{codigo}</Text>
            </TouchableOpacity>
        )
    }

    const goToCourse = codigo => {
        props.navigation.navigate('Course', { id: codigo })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={courses}
                contentContainerStyle={{ marginHorizontal: 16, marginTop: 12, paddingBottom: 32}}
                renderItem={renderCourse}
            />
        </View>
    )
}

export default DashboardPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    courseContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 8
    },
    courseTitle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16
    },
    courseCode: {
        color: '#999',
        fontSize: 12,
        marginTop: 8
    }
})
