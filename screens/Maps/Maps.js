import { StyleSheet, Text, View } from "react-native";

const Maps = () => {
    return(
        <View style = {styles.container}>
            <Text>Maps</Text>
        </View>
    );
}
export default Maps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});