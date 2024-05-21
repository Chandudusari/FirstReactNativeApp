import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from "@react-native-material/core";
const ListItem = ({ item }) => {
  const [isEnabled,setisEnabled]=useState(false);
  const [borderWidth, setBorderWidth] = useState(0);
  const toggleView=()=>{
    if(borderWidth===0){
      setBorderWidth(0);
    }else{
      setBorderWidth(0)
    }
    setisEnabled(!isEnabled);
  }
  return (
    <TouchableOpacity style={[styles.maincontainer,{marginBottom:10}]} onPress={toggleView} activeOpacity={0.6}>
  <View>
    <View style={[styles.itemContainer]}>
      <View style={styles.childContainer}>
        <Text style={styles.boldText}>{item.device_id}</Text>
        <Text style={styles.boldText1}>{item.truck_no}</Text>
      </View>
      {/* <Icon name="location-on" size={30} color="#000" /> */}
      {/* <Icon name="location-on"  size={30} color="#000" /> */}
    </View>
    <View style={{borderBlockColor:'black'}}>
      <View style={styles.itemCContainer}>
        <Text style={[styles.textLeft,{color: 'black',fontSize:13}]}>LAST ACTIVE ON</Text>
        <Text style={[styles.textRight,{color: 'black',fontSize:13,}]}>LAST DATA RECEIVED ON</Text>
    </View>
    {(item.last_active_on && item.modified_date) && (<View style={[styles.itemCContainer,{borderBottomWidth:borderWidth}]}>
        <Text style={[styles.textLeft1,{color: 'black',fontSize:16,}]}>{item.last_active_on.slice(0,10)+' '+item.last_active_on.slice(11,16)}</Text>
        <Text style={[styles.textRight1,{color: 'black',fontSize:16,}]}>{item.modified_date.slice(0,10)+' '+item.modified_date.slice(11,16)}</Text>
    </View>)}
    </View>
    {isEnabled && (
      <>
      <View style={{flexDirection: 'coloum',justifyContent: 'space-between',paddingHorizontal: 20,marginBottom:0,}}>
          <Text style={[styles.textLeft1,{color: 'black'}]}>Transporter Name</Text>
          <Text style={[styles.textLeft1,{color: 'black'}]}>{item.transporter_name}</Text>
        </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 20,marginBottom:10,}}>
          <Text style={{fontSize:17,textAlign:'left',justifyContent: 'space-between',color:'black'}}>Battery</Text>
          <Text style={{fontSize:17,textAlign:'center',color:'black'}}>Connected voltage</Text>
          <Text style={{fontSize:17,textAlign:'right',color:'black'}}>GPS Fix</Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 20,marginBottom:10,}}>
          <Text style={{fontSize:17,textAlign:'left',justifyContent: 'space-between',color:'black'}}>{item.last_battery}</Text>
          <Text style={{fontSize:17,textAlign:'center',color:'black'}}>{item.last_connected_voltage}</Text>
          <Text style={{fontSize:17,textAlign:'right',color:'black'}}>{item.last_gps_fix}</Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 20,marginBottom:10,}}>
          <Text style={{fontSize:17,textAlign:'left',justifyContent: 'space-between',color:'black'}}>Ignitions</Text>
          <Text style={{fontSize:17,textAlign:'center',color:'black'}}>Satelites</Text>
          <Text style={{fontSize:17,textAlign:'right',color:'black'}}>QC check</Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 20,marginBottom:10,}}>
          <Text style={{fontSize:17,textAlign:'left',justifyContent: 'space-between',color:'black'}}>{item.last_ignition}</Text>
          <Text style={{fontSize:17,textAlign:'center',marginLeft:70,color:'black'}}>{item.last_satellites}</Text>
          <Text style={{fontSize:17,textAlign:'right',color:'black'}}>{item.qc_check}</Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent:'space-between',paddingHorizontal: 20,marginBottom:0}}>
      <Button title='UNMAP' style={{padding:8,width:'49.5%',backgroundColor:'green',borderBottomLeftRadius:20,}}/>
      <Button title='REPLACE' style={{padding:8,width:'49.5%',backgroundColor:'#1481c4',borderBottomRightRadius:20,}}/>
      </View>
      </>
      )}
  </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    maincontainer: {
      shadowColor: 'black',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 1,
    //   shadowRadius: 3.84,
    //   elevation: 15,
    //   marginTop:15,
    //   marginBottom:10,
     }
,
    itemCCContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0,
      elevation: 3,
      borderBottomColor: '#ccc',
      shadowColor: '#000',
      // paddingVertical: 10,
      // paddingHorizontal: 20,
      marginLeft:20,
      marginRight:20,
      
    },
    itemCContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0,
      marginLeft:20,
      marginRight:20,
      // paddingVertical: 10,
      // paddingHorizontal: 20,
    },
    itemContainer: {
      color: 'white',
      backgroundColor: '#1481c4',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    childContainer: {
      flexDirection: 'column',
      
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 5,
      color: 'white',
    },
    boldText1: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 3,
      color: 'white',
    },
    textLeft: {
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom:5,
      flex: 1,
      marginTop:10,
      
    },
    textRight: {
      textAlign: 'right',
      fontWeight: 'bold',
      flex: 1,
      marginBottom:5,
      marginTop:10,
    },
    textLeft1: {
      textAlign: 'left',
      marginBottom:10,
      flex: 1,
      fontSize: 18,
    },
    textRight1: {
      marginBottom:10,
      textAlign: 'right',
      flex: 1,
      fontSize: 20,
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 10,
      shadowRadius: 8.84,
      elevation: 1,
    },
  });
export default ListItem;