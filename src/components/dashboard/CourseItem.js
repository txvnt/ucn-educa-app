import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native'

const CourseItem = props => {

    const { codigo, nombre } = props.item;
    const animatedValue = new Animated.Value(1);

    const getCourseType = () => {
        const courseType = codigo.charAt(codigo.length - 2).toLowerCase();
        switch(courseType){
            case 'a':
                return 'A';
            case 'l':
                return 'L';
            default:
                return 'C';
        }
    }

    const handlePressIn = () => {
        Animated.spring(animatedValue, {
          toValue: .99,
        }).start()
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            friction: 2,
            tension: 20
        }).start()
    };

    return (
        <TouchableOpacity 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          onPress={() => props.goToCourse(codigo)}>
            <Animated.View style={[styles.courseContainer, { transform: [{ scale: animatedValue}] }]}>
                <View style={[styles.circle, { backgroundColor: props.color }]}>
                    <Text style={styles.circleLetter}>{getCourseType()}</Text>
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                    <Text style={styles.courseTitle}>{nombre}</Text>
                    <Text style={styles.courseCode}>{codigo}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default CourseItem;

const styles = StyleSheet.create({
    courseContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'rgb(28,28,30)',
        flexDirection: 'row',
        alignItems: "center"
    },
    courseTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    courseCode: {
        color: 'rgb(142,142,145)',
        fontSize: 10,
        marginTop: 8
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleLetter: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
