import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React , { useState , useEffect } from 'react'
import { Audio } from 'expo-av';
import { Shadow } from 'react-native-shadow-2';

//icon
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Wwidth = Dimensions.get('window').width;

const Home = () => {
  const [sound, setSound] = useState();
  const [soundState, setSoundState] = useState(false);
  const [color, setColor] = useState('white');
  const [activeType, setActiveType] = useState('Classic');
  const noiseTypes = ['Classic', 'Ambient', 'Deep', 'Super Deep', 'Clean']
  const soundsMap = {
    white_Classic : require('../assets/music/white_Classic.m4a'),
    white_Ambient : require('../assets/music/white_Ambient.m4a'),
    white_Deep : require('../assets/music/white_Deep.m4a'),
    white_Clean : require('../assets/music/white_Clean.m4a'),
    'white_Super Deep' : require('../assets/music/white_Super Deep.m4a'),
    pink_Classic : require('../assets/music/pink_Classic.m4a'),
    pink_Ambient : require('../assets/music/pink_Ambient.m4a'),
    pink_Deep : require('../assets/music/pink_Deep.m4a'),
    pink_Clean : require('../assets/music/pink_Clean.m4a'),
    'pink_Super Deep' : require('../assets/music/pink_Super Deep.m4a'),
    brown_Classic : require('../assets/music/brown_Classic.m4a'),
    brown_Ambient : require('../assets/music/brown_Ambient.m4a'),
    brown_Deep : require('../assets/music/brown_Deep.m4a'),
    brown_Clean : require('../assets/music/brown_Clean.m4a'),
    'brown_Super Deep'  : require('../assets/music/brown_Super Deep.m4a'),
    green_Classic : require('../assets/music/green_Classic.m4a'),
    green_Ambient : require('../assets/music/green_Ambient.m4a'),
    green_Deep : require('../assets/music/green_Deep.m4a'),
    green_Clean : require('../assets/music/green_Clean.m4a'),
    'green_Super Deep' : require('../assets/music/green_Super Deep.m4a'),
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playOrPauseSound = async (hue , noiseType) =>{
    if (noiseType == undefined){
      noiseType = 'Classic' //default noise type  if not provided 
    }
    console.log(`${hue}_${noiseType}`)
    var track ;
    if (noiseType){
      track = soundsMap[hue+'_'+noiseType] //if noiseType is provided then use it to get the sound file
    }else{
      track = soundsMap[hue] //if noiseType is not provided then use the default sound file
    }

    if (soundState==true && hue==color && noiseType==activeType) {//if the sound is already playing and the color is same then pause the sound
      await sound.pauseAsync(); //pause the sound
      setSoundState(false)
    }else if (soundState==false || hue!==color || noiseType!=activeType ){//if the sound is not playing or the color is different then play the sound
      const { sound } = await Audio.Sound.createAsync( //load the sound file
        track,
        { shouldPlay: true, isLooping: true } //play the sound in loop
      ); 
      setSound(sound);
      await sound.playAsync();
      setSoundState(true)
      setColor(hue)
      setActiveType(noiseType)
    }
  }

  return (
    <View style={styles.container}>
      <View 
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: '6%',
        }}>
          <View style={{
            backgroundColor: '#06011f',
            width: '60%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            height: 30,
          }}>
          <Text style={{fontSize:15, color:'white'}}>Created by KingBill007 on Github</Text>
          </View> 
      </View>
      <View style={styles.header}>
        <Shadow
          distance={color == "white" && soundState == true ? 13 : 0}
          offset={[0, 0]} // <- Centered shadow
          startColor="rgba(0, 191, 255, 0.4)"
          containerViewStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.activator,{backgroundColor: "#f7f7f7",},]}
            onPress={() => {playOrPauseSound("white");}}></TouchableOpacity>
        </Shadow>
        <Shadow
          distance={color == "pink" && soundState == true ? 13 : 0}
          offset={[0, 0]} // <- Centered shadow
          startColor="rgba(0, 191, 255, 0.4)"
          containerViewStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
          style={[styles.activator,{backgroundColor: "#fc4ea8",},]}
          onPress={() => {playOrPauseSound("pink");}}></TouchableOpacity>
        </Shadow>
        <Shadow
          distance={color == "green" && soundState == true ? 13 : 0}
          offset={[0, 0]} // <- Centered shadow
          startColor="rgba(0, 191, 255, 0.4)"
          containerViewStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
          style={[styles.activator,{backgroundColor: "#41d950",},]}
          onPress={() => {playOrPauseSound("green");}}></TouchableOpacity> 
        </Shadow>
        <Shadow
          distance={color == "brown" && soundState == true ? 13 : 0}
          offset={[0, 0]} // <- Centered shadow
          startColor="rgba(0, 191, 255, 0.4)"
          containerViewStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        > 
        <TouchableOpacity
          style={[styles.activator,{backgroundColor: "#d98041",},]}
          onPress={() => {playOrPauseSound("brown");}}></TouchableOpacity>
        </Shadow>

      </View>

      <View style={styles.footer}>
        <View style={styles.bottomBar}>
          <View style={styles.bottomTop}>
            <Text style={{ color: color, fontSize: 25, fontWeight: "bold" }}>
              {color == "white"
                ? "White "
                : color == "pink"
                ? "Pink "
                : color == "green"
                ? "Green "
                : color == "brown"
                ? "Brown "
                : ""}
              Noise
            </Text>
            <TouchableOpacity
              style={styles.playbttn}
              onPress={() => {
                playOrPauseSound(color, activeType);
              }}
            >
              {soundState == true ? (
                <FontAwesome6 name="pause" size={24} color="black" /> //pause icon
              ) : soundState == false ? (
                <Entypo name="controller-play" size={35} color="black" />
              ) : (
                ""
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottombttm}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                height: "100%",
                alignItems: "center",
              }}
            >
              {noiseTypes.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.typebttn,
                    {
                      borderWidth: activeType == item ? 1 : 0,
                      borderColor: "white",
                    },
                  ]}
                  key={index}
                  onPress={() => {
                    playOrPauseSound(color, item);
                  }}
                >
                  <Text
                    style={{
                      marginHorizontal: 12,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b0233'
      },
      header:{
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: Wwidth/20,
      },
      footer:{
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      },
      activator:{
        height: Wwidth/6,
        width: Wwidth/6,
        borderRadius: Wwidth/6,
      },
      bottomBar:{
        backgroundColor: '#120901',
        width: '95%',
        height: '90%',
        borderRadius: 20,
        overflow: 'hidden',
      },
      bottomTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '50%',
        paddingHorizontal: 15,
        alignItems: 'center'
      },
      playbttn:{
        backgroundColor:'white',
        width: '11%',
        height: '60%',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      bottombttm:{
        height: '50%',
      },
      typebttn:{
        backgroundColor: '#522a02',
        height:'63%',
        justifyContent: 'center',
        borderRadius: 23,
        marginHorizontal: 5,
      }
})

export default Home