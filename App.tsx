import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const[camera, setCamera] = useState<Camera>(null);
  const[image, setImage] = useState (null);
  
useEffect(() =>{
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    await MediaLibrary.requestPermissionsAsync();
  })();
}, []);

async function takePicture (){
  if (camera) {

  const {uri} = await camera.takePictureAsync();
  console.log(uri);
  setImage(uri);
  await MediaLibrary.saveToLibraryAsync(uri);
 }
}
  

  return (
    <View style={styles.container}>
    <Camera
      ref={(ref) =>setCamera(ref)}
      style={styles.fixedRatio}
      type={CameraType.back}
      ratio={'1:1'}
    
    />
    <Image 
    style={styles.container}
    source={image}
    contentFit='cover'
    transition={1000}

    />
     <TouchableHighlight 
       style={styles.button}
       onPress={() => { takePicture()}}
       >
        <Text
        style={{color:'#fff', fontSize:25}}>
          Tirar Foto
         
        </Text>
     </TouchableHighlight>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image :{
    flex: 1,
    width: '100%',
    height:'100%'

  },
  fixedRatio: {
    aspectRatio: 1,
    flex: 1

  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 15,
    backgroundColor: 'black',
    width: 150,
    height: 150,
    borderRadius: 100,
    position:'absolute',
    bottom: 50

  }
});
