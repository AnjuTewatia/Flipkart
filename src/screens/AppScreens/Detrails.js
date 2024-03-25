import { StyleSheet, Switch, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';

import Button from '../../Components/Button';
import useFetch from '../../utils/useFetch';
import { useAppContext } from '../../Components/AppContext';
import { BASE_URL } from '../../utils/baseUrl';
import Toast from 'react-native-toast-message';


const Details = ({ navigation, route }) => {
    return (
        <AppBaseComponent
            navigation={navigation}
            title={'Details'}
            backButton
            height={'97%'}
            renderChild={Content({ navigation, route })}
        />
    );
};

const Content = ({ navigation, route }) => {
    const { userData } = useAppContext()
    const [data, setData] = useState('')

    const fetchdata = async () => {
        try {
            const res = await fetch(`${BASE_URL}product/${route.params.id}`, {
                headers: {
                    token: userData
                }
            })
            const resdata = await res.json()
            console.log('resDaa', resdata);
            setData(resdata)

        } catch (error) {

        }

    }
    const Addtocart = async () => {
        try {
            const res = await fetch(`${BASE_URL}cart/${route.params.id}`, {
                method: "POST", headers: {
                    token: userData
                }
            })
            const resdata = await res.json()
        Toast.show({
            type:'success',
            text1:"Added to Cart"
        })

        } catch (error) {

        }

    }
    useEffect
        (() => {
            fetchdata()
        }, [])


    return (
        <>
            <View style={Common.container}>

                <ScrollView>
                    <Image
                        source={{ uri: data.image1 }}
                        style={{
                            width: 300,
                            height: 200,
                            marginBottom: 10,
                        }}
                    />
                    <Image
                        source={{ uri: data.image2 }}
                        style={{
                            width: 300,
                            height: 200,
                            marginBottom: 10,
                        }}
                    />
                    <Image
                        source={{ uri: data.image3 }}
                        style={{
                            width: 300,
                            height: 200,
                            marginBottom: 10,
                        }}
                    />
                    <Image
                        source={{ uri: data.image4 }}
                        style={{
                            width: 300,
                            height: 200,
                            marginBottom: 10,
                        }}
                    />
                    <Text>{data.title}</Text>
                    <Text>{data.soldby}</Text>
                    <Text>{data.price}</Text>
                    <Text>{data.code}</Text>
                    <Text>{data.category}</Text>
                    <Text></Text>
                    <Text></Text>
                </ScrollView>


                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Button
                        title={'Add to Cart'}
                        onPress={Addtocart}
                    // loading={loading}
                    />
                </View>
            </View>
        </>
    );
};
export default Details;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 12,
        minHeight: 60,
        width: '98%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 4,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#371841',
        fontWeight: '700',
        fontSize: 18,
        textAlignVertical: 'center',
    },
});
