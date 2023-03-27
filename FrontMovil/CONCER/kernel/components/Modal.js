import { StyleSheet, View} from 'react-native'
import React from 'react'
import {Overlay} from '@rneui/base'
import { Button, Icon } from "react-native-elements";

export default function MyModal(props) {
    const {show,setShow,children}= props;

    return (
        <Overlay
            isVisible={show}
            windowBackgroundColor="rgba(0,0,0,0,.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
            onBackdropPress={()=>setShow(false)}
        >

            {children}
            
            <View style={styles.containerButtons}>
                <Button
                    title="Cancelar"
                    containerStyle={styles.btnDangerContainer}
                    buttonStyle={styles.btnDanger}
                    onPress={()=> setShow(false)}
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        height:"auto",
        width:"90%",
        backgroundColor:"#fff"
    },
    containerButtons:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10
    },
    btnDangerContainer:{
        padding:10,
    },
    btnDanger:{
        backgroundColor:'#a60a0d'
    },
})