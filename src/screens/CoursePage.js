import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getDocuments, getDocument } from '../services/Courses';

const CoursePage = props => {
    
    const [documents, setDocuments] = useState(null);
    
    useEffect(() => {
        getDocuments(props.route.params.id)
        .then(response => setDocuments(response))
    }, []);

    const renderCourse = ({ item }) => {
        const { link, nombre } = item; 
        return(
            <TouchableOpacity onPress={() => onPressItem(link)} style={styles.courseContainer}>
                <Text style={styles.courseTitle}>{nombre}</Text>
                <Text style={styles.courseCode}>{link.includes('backends') ? link : 'Carpeta'}</Text>
            </TouchableOpacity>
        )
    }

    const onPressItem = link => {
        if(link.includes('document')){
            const fileSubstring = link.split('&')[1];
            const fileId = fileSubstring.substring(5, fileSubstring.length);

            props.navigation.navigate('CourseFolder', { courseId: props.route.params.id, fileId: fileId })
        }else{
            const fileSubstring = link.split('?')[1].split('&')[0];
            const fileId = fileSubstring.substring(4, fileSubstring.length);
            props.navigation.navigate('Document', { url: `https://ucn-online-app.herokuapp.com/download.php?url=${fileId}&cidReq=${props.route.params.id}` })
        }
    }

    if(documents){
        return(
            <View style={styles.container}>
                <FlatList
                    data={documents}
                    contentContainerStyle={{marginTop: 12, paddingBottom: 32}}
                    renderItem={renderCourse}
                />
            </View> 
        )
    }else{
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large'/>
            </View> 
        )
    }
}

export default CoursePage

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    courseContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderColor: 'rgb(24,24,26)'
    },
    courseTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    courseCode: {
        borderColor: 'rgb(142,142,145)',
        fontSize: 12,
        marginTop: 8
    }
})
