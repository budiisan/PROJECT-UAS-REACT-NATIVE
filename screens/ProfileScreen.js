import React from 'react';
import{ImagePicker,Permissions} from 'expo';
import MenuButton from '../Components_2/MenuButton';
import{Platform,
  Image,Dimensions,
  StyleSheet,View,
  Text,TouchableOpacity
  ,KeyboardAvoidingView,Button,Alert,TextInput
  } from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
        image:'http://bit.ly/gbr-pisang',
        imagea: 'http://bit.ly/gbr-pisang',
        imageb: 'http://bit.ly/gbr-pisang',
        hasCameraPermission:null,
        hasCameraRollPermission:null,
        photoUrl: null,
    }
}
//kamera
async componentWillMount(){
const {status} = await Permissions.askAsync(Permissions.CAMERA);
this.setState({hasCameraPermission:status === 'granted'});

const {statusCameraRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
this.setState({hasCameraRollPermission:statusCameraRoll === 'granted'});
}

navLink(nav,text){
    return(
        <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
    )
}

_pickImage = async ()=>{
        let result = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[1, 1],
    });
    if (!result.cancelled){
        this.setState({ image:result.uri});
    }
};
_pickImagea = async ()=>{
        let resulta = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[1, 1],
    });
    if (!resulta.cancelled){
        this.setState({ imagea:resulta.uri});
    }
};
_pickImageb = async ()=>{
        let resultb = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[1, 1],
    });
    if (!resultb.cancelled){
        this.setState({ imageb:resultb.uri});
    }
};

render(){
    return(
      <View style={styles.container}>
          <MenuButton navigation ={this.props.navigation}/>
          <View style={styles.profile}>
          <Text style={styles.text}>Budi Santoso</Text>
            <TouchableOpacity style={styles.imgView} onPress={this._pickImage}>
              <Image style={styles.img}source={{uri:this.state.image}}/>
            </TouchableOpacity>
          </View>
          

          <View style={styles.profilea}>
          <Text style={styles.text}>Ismail Risky R.</Text>
            <TouchableOpacity style={styles.imgView} onPress={this._pickImagea}>
              <Image style={styles.img}source={{uri:this.state.imagea}}/>
            </TouchableOpacity>
          </View>

          <View style={styles.profilea}>
          <Text style={styles.text}>Aditya Ainul M.</Text>
            <TouchableOpacity style={styles.imgView} onPress={this._pickImageb}>
              <Image style={styles.img}source={{uri:this.state.imageb}}/>
            </TouchableOpacity>
          </View>
          
      </View>   
    );
}
}

const styles= StyleSheet.create({
container:{
    flex:1,
    // backgroundColor:'lightgray',
},
scrool:{
    flex:1,
},
text: {
    fontSize:15,
    justifyContent: 'center',
    marginBottom:10,
},
profile:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
},
profilea: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},
imgView: {
  flex: 1,
  paddingLeft: 20,
  paddingRight: 20,
},
img:{
    height:70,
    width:70,
    borderRadius:50,
},
name:{
  fontSize:20,
  paddingBottom: 5,
  color: 'white',
  textAlign : 'left',
},
topLinks:{
    height:160,
    backgroundColor:'black',
},


link:{
    flex:1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign:'left',
},
img:{
    height:100,
    width:100,
    borderRadius:50,

},


})
