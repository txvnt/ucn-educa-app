import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TextInput, Animated, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';

import { getCourses } from '../services/Courses';
import CourseItem from '../components/dashboard/CourseItem';
import { AccentColors } from '../constants/Colors';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Redux
import { connect } from 'react-redux';
import { cleanState } from '../../redux/actions/actions';

const mapStateToProps = state => {
    return { 
      rut: state.user.rut
    }
};

const DashboardPage = props => {

    const [search, setSearch] = useState('');;
    const valueRef = React.useRef();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollY = new Animated.Value(0);
    const AnimatedList = Animated.createAnimatedComponent(FlatList);

    let textSize = scrollY.interpolate({
        inputRange: [-60, 60, 100],
        outputRange: [36, 36, 28],
        extrapolate: 'clamp',
    })
    let titlePadding = scrollY.interpolate({
        inputRange: [-60, 60],
        outputRange: [32, 0],
        extrapolate: 'clamp',
    })

    let marginTop = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [40, 80],
        extrapolate: 'clamp',
    })

    let searchBarHeight = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [40, 0],
        extrapolate: 'clamp',
    })

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    useEffect(() => {
        getCourses()
        .then(response => setCourses(response))
        .then(() => setLoading(false))
    }, []);


    const renderCourse = ({ item, index }) => {
        return (
            <CourseItem 
              key={item.codigo}
              color={AccentColors[index]}
              goToCourse={goToCourse} 
              item={item}
            />
        )
    }

    const goToCourse = codigo => {
        props.navigation.navigate('Course', { id: codigo })
    }

    const logout = async () => {
        await AsyncStorage.clear();
        const { dispatch } = props;
        dispatch(cleanState());
    }

    /**
     * Renders the title with the size depending on the scroll of the screen.
     */
    const RenderTitle = () => (
        <View>
            <View style={styles.titleContainer}>
                <Animated.Text style={[styles.title, { fontSize: textSize, marginTop: marginTop, paddingBottom: titlePadding }]}>Mis cursos</Animated.Text>
                <TouchableOpacity activeOpacity={0.75} onPress={() => logout()}>
                    <AnimatedIcon name="ios-power" size={32} color="#ff6768" style={{marginBottom: titlePadding}} />
                </TouchableOpacity>
            </View>
            {/* <Animated.View style={[styles.searchbar, {height: searchBarHeight}]}>
                <TextInput
                    value={searchbar}
                    ref={valueRef}
                    onChange={text => handleSearchInput(text)}
                    placeholder='Buscar'
                    placeholderTextColor='rgba(255,255,255,0.3)'
                    style={styles.searchInput}
                />
            </Animated.View> */}
        </View>
    )

    const handleSearchInput = text => {
        console.log(text)
        setSearch(valueRef.current.value)
    }

    if(loading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator color='white' size='large'/>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
              scrollEventThrottle={16}
            >
                <RenderTitle/>
                <AnimatedList
                    data={courses}
                    contentContainerStyle={{paddingBottom: 32}}
                    scrollEnabled={false}
                    renderItem={renderCourse} 
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default connect(mapStateToProps)(DashboardPage);

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    title: {
        fontSize: 36,
        color: '#FFF',
        fontWeight: 'bold',
        paddingBottom: 8
    },
    searchbar: {
        backgroundColor: 'rgb(28,28,30)', 
        marginHorizontal: 20,
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    searchInput: {
        color: '#FFF'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: 20,
    }
})
