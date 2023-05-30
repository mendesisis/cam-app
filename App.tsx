import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const[camera, setCamera] = useState<Camera>(null);
  const[image, setImage] = useState (null);
  
useEffect(() =>{
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  })();
}, []);

async function takePicture (){
  if (camera) {

  const photo = await camera.takePictureAsync();
  console.log(photo.uri);
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
     <Button  
     title="" 
     onPress={() => { takePicture()}} />

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
  fixedRatio: {
    aspectRatio: 1,
    flex: 1

  }
});
