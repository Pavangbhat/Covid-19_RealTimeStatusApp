import React from "react"
import {View,Text,StyleSheet,FlatList,ActivityIndicator,ScrollView} from "react-native"
import {Card,Button,Icon} from "react-native-elements"

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      responseIsSucessful:true,
      isLoading:true,
      dataReceivedOfStates:[],
      gobalConform:"",
      gobalRecovered:"",
      gobalDeath:""      
    }
  }
  getData=()=>{
    fetch('https://api.rootnet.in/covid19-in/stats/latest')
    .then(res=>res.json())
    .then(response => {
        this.setState({
        dataReceivedOfStates:response.data.regional
      })
    
    })
    .catch(err => console.log(err))
    
    //Get gobal data
    fetch("https://covid19.mathdro.id/api")
    .then(res=>res.json())
    .then(response =>{
        this.setState({
          gobalConform:response.confirmed.value,
          gobalRecovered:response.recovered.value,
          gobalDeath:response.deaths.value,
          isLoading:false
        })
    })
    .catch(err => console.log(err))
  }
  refresh=()=>{
    this.setState({
      isLoading:true
    })
    this.forceUpdate();
    this.getData();
    this.forceUpdate();
  }
  componentDidMount(){
    this.getData()
  }
  render(){
    if(this.state.isLoading){
      return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"grey"}}>
                <ActivityIndicator 
                  size={80}
                  color={'red'}
                />
                <Text style={{fontSize:30,fontWeight:"bold",fontStyle:"italic"}}>Loading</Text>
            </View>
      )
    }
    return(
      <View style={{flex:1,backgroundColor:"grey"}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContainerText}>
              Covid-19 Live Updates
            </Text>
          </View>
         <ScrollView>
            <Card
            title={"Global Status"}
            titleStyle={{fontSize:50,color:"grey",fontStyle:"italic"}}
            containerStyle={{backgroundColor:"#bff5f1"}}
            dividerStyle={{backgroundColor:"white",height:2}}
            >
                  <Card
                  title={"Positive"}
                  titleStyle={{fontSize:30,color:"white",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#e8646a"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {this.state.gobalConform}
                  </Text>
                  </Card>

                  <Card
                  title={"Recovered"}
                  titleStyle={{fontSize:30,color:"white",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#62de81"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {this.state.gobalRecovered}
                  </Text>
                  </Card>
                  <Card
                  title={"Deaths"}
                  titleStyle={{fontSize:30,color:"white",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#f5252e"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {this.state.gobalDeath}
                  </Text>
                  </Card>
            </Card>
            <Card
              title={"State Status"}
              titleStyle={{fontSize:50,color:"grey",fontStyle:"italic"}}
              containerStyle={{backgroundColor:"#bff5f1"}}
              dividerStyle={{backgroundColor:"white",height:2}}
            >
              <FlatList
              data={this.state.dataReceivedOfStates}
              keyExtractor={(key,index)=>key.loc}
              renderItem={({item})=>(
               <Card
                  title={item.loc}
                  titleStyle={{fontSize:40,color:"white",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#57c6f2"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
               >
                  <Text style={{color:"#e8646a",fontSize:40,fontWeight:"bold"}}>
                       Positive :{item.confirmedCasesIndian}
                  </Text>
                  <Text style={{color:"green",fontSize:40,fontWeight:"bold"}}>
                       Recovered :{item.discharged}
                  </Text>
                  <Text style={{color:"#e8646a",fontSize:40,fontWeight:"bold"}}>
                       deaths:{item.deaths}
                  </Text>
               </Card>
              )}
              >
              </FlatList>
            </Card>
            <Button
              icon={
                <Icon
                  name="refresh"
                  type="font-awesome"
                  size={23}
                  color="white"
                />
              }
              title="Refresh"
              titleStyle={{fontSize:25,color:"white",fontWeight:"bold",paddingLeft:10}}
              type='clear'
              onPress={()=>{this.refresh()}}
            />
         </ScrollView>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  headerContainer:{
  backgroundColor:"#a352fa",
  alignItems:"center"
  },
  headerContainerText:{
    fontSize:30,
    paddingBottom:15,
    color:"white",
    fontStyle:"italic",
    fontWeight:"bold",
    marginTop:10
  },
  dataText:{
    fontSize:30,
    color:'white',
    fontWeight:"bold",
    alignItems:"center",
    justifyContent:"center"
  },

})