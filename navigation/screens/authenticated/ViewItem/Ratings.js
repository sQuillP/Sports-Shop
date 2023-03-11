import {View, StyleSheet, Text} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';



const ratings= {
    '5':Math.floor(Math.random()*100),
    '4':Math.floor(Math.random()*100),
    '3': Math.floor(Math.random()*100),
    '2':Math.floor(Math.random()*100),
    '1':Math.floor(Math.random()*100)
}

export default function Ratings() {

    const ratingsArray = Object.keys(ratings);
    const totalRatings = ratingsArray.reduce((acc, current, index)=> {
        return acc + ratings[current];
    },0);


    return (
        <View style={styles.main}>
            <View style={styles.container}>
                {
                    ratingsArray.map(rating=> {
                        console.log((ratings[rating]/totalRatings)*100)
                        const percent = Math.floor((ratings[rating]/totalRatings)*100);

                        return (
                            <View key={rating} style={styles.rating}>
                                <Text style={styles.ratingCount}>{rating}</Text>
                                <Ionicons name='star' color='gold' size={25}/>
                                <View style={styles.outerBar}>
                                    <View style={{
                                        width: `${percent}%`,
                                        backgroundColor:'gold',
                                    }}></View>
                                </View>
                                <Text style={styles.ratingCount}>{percent<10?' '+percent:percent}%</Text>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        alignItems:'center'
    },
    container: {
        padding: 10,
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        width:'90%',
        borderRadius: 10,
        overflow:'hidden',
    },
    rating: {
        flexDirection:'row',
        alignItems:'center',
        flex: 1,
        marginVertical: 5,
        width: '90%',
    },
    outerBar: {
        flex: 1,
        height: 22,
        flexDirection:'row',
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'#f2f2f4'
    },
    ratingCount: {
        fontSize: 20,
        fontWeight:'bold',
    },
});