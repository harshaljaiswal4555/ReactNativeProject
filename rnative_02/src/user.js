import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet, Button
} from 'react-native';

class UserScreen extends Component {
    render() {
        const userId = this.props.navigation.getParam('userId','N/A');
        const userName = this.props.navigation.getParam('userName');
        const lastName = this.props.navigation.getParam('lastName');

        return (

            <View style={styles.mainView}>
                <Text>User Screen</Text>
        <Text>{userId}</Text>
        <Text>{userName}</Text>
        <Text>{lastName}</Text>
                <Button
                    title='Go to Home'
                    onPress={() => this.props.navigation.navigate('Home')} />
            <Button
                    title='Go Back'
                    onPress={() => this.props.navigation.goBack()} />

            </View>

        );
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#c2c2c2',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserScreen;
