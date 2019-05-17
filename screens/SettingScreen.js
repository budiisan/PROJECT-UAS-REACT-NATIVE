import React from 'react';
import { StyleSheet,KeyboardAvoidingView,TextInput,View,Button,FlatList,Text } from 'react-native';
import MenuButton from '../Components_2/MenuButton';
import { SQLite } from "expo";
const db = SQLite.openDatabase('db.db');

export default class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo SQLITE'
}
constructor(props) {
    super(props)
    
    this.state = {
        title:'' ,
        todos:[]    
    };
    
};
componentDidMount() {
    db.transaction(tx =>{
        tx.executeSql(
            'create table todos (id integer primary key not null, title text, complete int)'
        )
    })
    this._getData()

}


render() {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View style={{ flexDirection: 'row', margin: 10,paddingTop:30 }}>
                <TextInput
                    placeholder="Todos"
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                    style={{ width: '80%', padding: 5, borderRadius: 5, borderColor: '#ccc', borderBottomWidth: 1, }}
                />
                <Button
                    title="Add"
                    disabled={!this.state.title.length}
                    onPress={this._addData} />
            </View>
            <FlatList
                data={this.state.todos}
                renderItem={({item}) => <Text >{item.title} </Text> }
                keyExtractor={(item, index) => item.id.toString()}
            />

        </KeyboardAvoidingView>
    )
}

_addData = ()=>{
    let title = this.state.title;
    db.transaction(tx=>{
        tx.executeSql('insert into todos (complete,title) values (0,?) ',[title])
    },
    null, //error
    this.setState({title:''}) //success
    )
    this._getData()
}

_getData=()=>{
    db.transaction(tx => {
        tx.executeSql('select * from todos', [],(_,{rows})=>
            this.setState({ todos: rows._array })
        );
    });
}
}