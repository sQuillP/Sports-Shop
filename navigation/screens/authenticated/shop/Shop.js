import {FlatList, Keyboard, ScrollView, StyleSheet, Text,TouchableWithoutFeedback,View} from 'react-native'

const minCols = 2;

const calcNumColumns = (width) => {
    const cols = width / 125
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - (2 * colsFloor * 5);
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
  };

const formatData = (data, numColumns) => {
    const amountFullRows = Math.floor(data.length / numColumns);
    let amountItemsLastRow = data.length - amountFullRows * numColumns;

    while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
        data.push({key: `empty-${amountItemsLastRow}`, empty: true});
        amountItemsLastRow++;
    }
    return data;
};

export default function Shop() {


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                {/* <FlatList
                    numColumns=
                /> */}
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    greetingWrapper: {

    },
    greeting: {

    }
});