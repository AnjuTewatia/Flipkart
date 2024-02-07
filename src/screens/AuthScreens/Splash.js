import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <ImageBackground source={require('../../assets/authImages/Splash.png')}
    style={{height:'100%', width:'100%'}}
    >
    </ImageBackground>
  )
}

export default Splash

const styles = StyleSheet.create({})