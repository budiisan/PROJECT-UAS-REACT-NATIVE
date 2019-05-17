import React, { Component } from 'react'
import { View,Button, FlatList, TextInput,ActivityIndicator,StatusBar,KeyboardAvoidingView,Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class OtherScreen extends Component {
  static navigationOptions ={
    title:'Todos App'
  }

  constructor(props) {
    console.disableYellowBox = true;
    super(props)
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    this.state = {
      title:'',
      todos:[],
      loading:true
    };
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  

  _addTodo = ()=>{
    this.ref.add({
      title:this.state.title,
      complete:false
    });

    this.setState({title:''});
  }

  onCollectionUpdate = (querySnapshot)=>{
    const todos=[];
    querySnapshot.forEach((doc) => {
      const {title,complete}=doc.data();

      todos.push({
        key:doc.id,
        doc,
        title,
        complete
      });
    });
      this.setState({
        todos,
        loading:false
      })
  }
  render() {
    if(this.state.loading){
      return(
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }
    return (
      <KeyboardAvoidingView>      
        <View style={{flexDirection:'row',margin:10,paddingTop:30}}>
        <TextInput 
          placeholder="Todo"
          value={this.state.title}
          onChangeText={(text)=>this.setState({title: text})}
          style={{width:'80%',padding:5,borderColor:'#ccc',borderBottomWidth: 1}}
        />
        <Button 
          title="Add"
          disabled={!this.state.title.length}
          onPress={this._addTodo}
        />
      </View>
      <FlatList
        data={this.state.todos}
        renderItem={({item}) =>
        <Text style={{marginLeft:10}}>
        {item.title}
        </Text>}
        />
        </KeyboardAvoidingView>
    )
  }
}