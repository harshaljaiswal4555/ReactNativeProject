import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import Input from '../../utils/forms/input';
import ValidationRules from '../../utils/forms/validationRules';

import {connect} from 'react-redux';
import { signUp, signIn} from '../../store/actions/users_actions';
import {bindActionCreators} from 'redux';

class AuthForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to Register',
    hasErrors: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass: 'password'

        }
      },
    }
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    // rules
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;


    this.setState({
      form: formCopy
    })
  }
  formHasErrors = () => (
    this.state.hasErrors ?
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}> Oops, check your info</Text>
      </View>
      : null
  )

  confirmPassword = () => {
    if (this.state.type != 'Login') {
      return (
        <Input
          placeholder="Confirm your password"
          placeholderTextColor="#cecece"
          autoCapitalize={"none"}
          type={this.state.form.confirmPassword.type}
          value={this.state.form.confirmPassword.value}
          onChangeText={value => this.updateInput("confirmPassword", value)}
          // overrideStyle = {{}}
          secureTextEntry
        />
      )
    }

  }
  submitUser = () => {

    let isFormValid = true;
    let formToSubmit = {};

    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === 'Login') {
        //Login
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;

        }
      } else {
        // Register
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if(isFormValid){
      if(this.state.type === 'Login'){
        this.props.signIn(formToSubmit);

      }else{
        this.props.signUp(formToSubmit);
        
      }
    }else{
      this.setState({
        hasErrors:true
      })
    }

  }

  changeFormType = () => {
    const type = this.state.type;

    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode: type === 'Login' ? 'I want to Login' : 'I want to register'
    })
  }

  render() {
    return (
      <View>
        <Input
          placeholder="Enter email"
          placeholderTextColor="#cecece"
          autoCapitalize={"none"}
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          keyboardType={'email-address'}
          onChangeText={value => this.updateInput("email", value)}
        // overrideStyle = {{}}
        />

        <Input
          placeholder="Enter your password"
          placeholderTextColor="#cecece"
          autoCapitalize={"none"}
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          // overrideStyle = {{}}
          secureTextEntry
        />
        {this.confirmPassword()}
        {this.formHasErrors()}

        <View style={{ marginTop: 20 }}>
          <View style={styles.button}>
            <Button
              title={this.state.action}
              onPress={() => this.submitUser()}
            />
          </View>

          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              onPress={this.changeFormType}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="I'll do it later"
              onPress={() => this.props.goNext()} // navigator cant work here as it is not directly lnk
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336'
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0
      },
      android: {
        marginBottom: 10,
        marginTop: 10
      }
    })
  }
})

function mapStateToProps(state){
  console.warn(state)
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signIn,signUp
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthForm);
