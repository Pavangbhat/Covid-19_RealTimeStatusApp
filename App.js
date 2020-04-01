import React,{useState,useEffect} from "react"
import {
        View,
        Text,
        StyleSheet,
        FlatList,
        ActivityIndicator,
        ScrollView,
        Linking,
        Image,
        TouchableOpacity,
        Dimensions
        } from "react-native"

import {
        Card,
        Button,
        Icon,
       } from "react-native-elements"
import { Header,Body,Title} from 'native-base';

import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs" ;





function GlobalData({navigation}){
  const [isLoading,SetisLoading]=useState(true);
  const [gobalConform,SetgobalConform]=useState("");
  const [gobalRecovered,SetgobalRecovered]=useState("");
  const [gobalDeath,SetgobalDeath]=useState("");
    const getData = () =>{    
      //Get gobal data
      fetch("https://covid19.mathdro.id/api")
      .then(res=>res.json())
      .then(response =>{
          SetgobalConform(response.confirmed.value)
          SetgobalRecovered(response.recovered.value)
          SetgobalDeath(response.deaths.value)
          SetisLoading(false)
      })
      .catch(err => console.log(err))
    }
  
  useEffect(()=>{
    getData()
  },
  []
  )
  const refresh = () =>{
    getData();
  }
    if(isLoading){
      return(
        <View>
        <Header style={{backgroundColor:"#3356ff"}}>
          <Body>
            <Title>Covid-19 Live Updates</Title>
          </Body>
        </Header>
          <View style={{alignItems:"center",marginTop:"90%"}}>
              <ActivityIndicator 
                size={60}
                color={'gery'}
              />
              <Text style={{fontSize:30,fontWeight:"bold",fontStyle:"italic",paddingTop:20,color:"grey"}}>Loading</Text>
          </View>
        </View>
      )
    }
    return(
      <View style={{flex:1,backgroundColor:"#d2def7"}}>
          <Header style={{backgroundColor:"#3356ff"}}>
            <Body>
              <Title>Covid-19 Live Updates</Title>
            </Body>
          </Header>
          <ScrollView>
          <Card
                  title={"Positive"}
                  titleStyle={{fontSize:30,color:"#d4e9ff",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#72089c"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {gobalConform}
                  </Text>
                  </Card>

                  <Card
                  title={"Recovered"}
                  titleStyle={{fontSize:30,color:"#d4e9ff",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#72089c"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {gobalRecovered}
                  </Text>
                  </Card>
                  <Card
                  title={"Deaths"}
                  titleStyle={{fontSize:30,color:"#d4e9ff",fontStyle:"italic"}}
                  containerStyle={{backgroundColor:"#72089c"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
                  >
                  <Text style={styles.dataText}>
                    {gobalDeath}
                  </Text>
                  </Card>
                 <View style={{alignItems:"center",paddingTop:10,}}>
                    <Button
                        icon={
                          <Icon
                            name="refresh"
                            type="font-awesome"
                            size={23}
                            color="#3a939c"
                          />
                        }
                        title="Refresh"
                        titleStyle={{fontSize:25,color:"#3a939c",paddingLeft:10}}
                        type='outline'
                        raised
                        onPress={()=>{
                          SetisLoading(true)
                          refresh()
                        }}
                  />
                 </View> 
                 
          </ScrollView> 
          <View style={{paddingTop:10}} />          
      </View>
    )
}
function StateData({navigation}){
  const [isLoading,SetisLoading]=useState(true);
  const [dataReceivedOfStates,SetdataReceivedOfStates]=useState([]);
    const getData=()=>{
      fetch('https://api.rootnet.in/covid19-in/stats/latest')
      .then(res=>res.json())
      .then(response => {
        SetdataReceivedOfStates(response.data.regional);
       SetisLoading(false)
      })
      .catch(err=>console.log(err))
  }
  useEffect(()=>{
    getData()
  },[])
 const refresh=()=>{
    getData();
  }
    if(isLoading){
      return(
          <View>
            <Header style={{backgroundColor:"#3356ff"}}>
                <Body>
                  <Title>Covid-19 Live Updates</Title>
                </Body>
            </Header>
            <View style={{alignItems:"center",marginTop:"90%"}}>
              <ActivityIndicator 
                size={60}
                color={'gery'}
              />
              <Text style={{fontSize:30,fontWeight:"bold",fontStyle:"italic",paddingTop:20,color:"grey"}}>Loading</Text>
             </View>
          </View>
      )
    }
    return(
      <View style={{flex:1,backgroundColor:"#d2def7"}}>
          <Header style={{backgroundColor:"#3356ff"}}>
            <Body>
              <Title>Covid-19 Live Updates</Title>
            </Body>
          </Header>
              <FlatList
              data={dataReceivedOfStates}
              ListFooterComponent={<View style={{alignItems:"center",paddingTop:10,paddingBottom:10}}>
                    <Button
                        icon={
                          <Icon
                            name="refresh"
                            type="font-awesome"
                            size={23}
                            color="#3a939c"
                          />
                        }
                        title="Refresh"
                        titleStyle={{fontSize:25,color:"#3a939c",paddingLeft:10}}
                        type='outline'
                        raised
                        onPress={()=>{
                          SetisLoading(true)
                          refresh()
                        }}
                  />
                 </View>
              }
              keyExtractor={(key,index)=>key.loc}
              renderItem={({item})=>(
               <Card
                  title={item.loc}
                  titleStyle={{fontSize:25,color:"#d4e9ff",fontStyle:"italic",fontFamily:"Feather"}}
                  containerStyle={{backgroundColor:"#8027a8"}}
                  dividerStyle={{backgroundColor:"white",height:2}}
               >
                  <Text style={{color:"#f2f2f2",fontSize:40,fontWeight:"500"}}>
                       Positive :{item.confirmedCasesIndian}
                  </Text>
                  <Text style={{color:"#f2f2f2",fontSize:40,fontWeight:"500"}}>
                       Recovered :{item.discharged}
                  </Text>
                  <Text style={{color:"#f2f2f2",fontSize:40,fontWeight:"500"}}>
                       Deaths:{item.deaths}
                  </Text>
               </Card>
              )}
              />
      </View>
      )

}


function Links(){
  
  const [shareAppLink,SetshareAppLink]=useState('');
  const [updateAvaiable,SetupdateAvaiable]=useState(false);
  const [updateMessage,SetupdateMessage]=useState('')
  const [isLoading,SetisLoading]=useState(true);


  useEffect(()=>{
    fetch('https://damp-atoll-13854.herokuapp.com')
    .then(res=>res.json())
    .then(response=>{
      SetshareAppLink(response.data.shareAppLink)
      SetupdateAvaiable(response.data.updateAvaiable)
      SetupdateMessage(response.data.updateMessage)
      SetisLoading(false)
    
    })
    .catch(err => console.log(err))
  })
  if(isLoading){
    return(
      <View>
      <Header style={{backgroundColor:"#3356ff"}}>
        <Body>
          <Title>Covid-19 Live Updates</Title>
        </Body>
      </Header>
        <View style={{alignItems:"center",marginTop:"90%"}}>
            <ActivityIndicator 
              size={60}
              color={'gery'}
            />
            <Text style={{fontSize:30,fontWeight:"bold",fontStyle:"italic",paddingTop:20,color:"grey"}}>Loading</Text>
        </View>
      </View>
    )
  }
  return(
    <View style={{backgroundColor:"#d2def7"}}> 
        <Header style={{backgroundColor:"#3356ff"}}>
          <Body>
            <Title>Covid-19 Live Updates</Title>
          </Body>
        </Header>
      
     <ScrollView>
            <Card 
                title={'Covid-19 Emergency Helplines'}
                titleStyle={{fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
                dividerStyle={{backgroundColor:"black",height:2}}
            >
              <View style={{alignItems:"center"}}>
                  <View style={{flexDirection:"row",paddingTop:20}}>
                      <TouchableOpacity 
                          style={{flexDirection:"row"}}
                          onPress={()=>{
                              Linking.openURL('tel:${+91-11-23978046}')
                          }}
                      >
                      <Icon
                          name="phone"
                          type="font-awesome"
                          size={35}
                          color="blue"
                      />
                          <Text style={{fontSize:25,color:"blue",fontStyle:"italic"}}>
                              +91-11-23978046 
                          </Text>
                      </TouchableOpacity>
                      </View>
                      <Text style={{fontSize:25,color:"black"}}>
                                OR
                      </Text>
                      <View style={{flexDirection:"row",paddingTop:2,paddingRight:25}}>
                          <TouchableOpacity 
                              style={{flexDirection:"row"}}
                              onPress={()=>{
                              Linking.openURL('tel:${1075}')
                            }}
                          >
                            <Icon
                                  name="phone"
                                  type="font-awesome"
                                  size={35}
                                  color="blue"
                            />
                            <Text style={{fontSize:25,color:"blue",fontStyle:"italic"}}>
                                  1075
                            </Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                    </Card>
                    {/* whatsapp Helpline */}
                    <Card
                      title={'WhatsApp Helpline'}
                      titleStyle={{fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
                      dividerStyle={{backgroundColor:"black",height:2}}
                    >
                      <View style={{alignItems:"center"}}>
                            <Text style={{fontSize:18,fontStyle:"italic",paddingBottom:5}}>
                                PM Narendra Modi shared the WhatsApp helpline number to get information and clear myths on coronavirus. The number is 9013151515. To get any information on coronavirus, all you have to do is send a 'Namaste' to this number on WhatsApp.
                            </Text>
                            <TouchableOpacity  onPress={()=>{
                                          Linking.openURL('whatsapp://send?text=Namaste&phone=+919013151515')
                                      }}>
                            <View style={{flexDirection:"row",backgroundColor:"#08c918",alignItems:"center",justifyContent:"center",padding:10,borderRadius:18}}>
                                    <Icon
                                      name="whatsapp"
                                      type="font-awesome"
                                      size={35}
                                      color="white"
                                    />
                                    <Text style={{fontSize:25,color:"white",fontStyle:"italic",paddingLeft:2}}>
                                          Message Namaste
                                    </Text>
                            </View>
                            </TouchableOpacity>
                    </View>
                    </Card>
                    <Card
                      title={'Useful Websites'}
                      titleStyle={{fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
                      dividerStyle={{backgroundColor:"black",height:2}}
                    >
                      <View style={{alignItems:"flex-start"}}>
                          <TouchableOpacity
                                onPress={()=>{
                                  Linking.openURL('https://www.mygov.in/covid-19/')
                                }}
                          >
                                <Text style={{fontSize:20,color:"blue",fontStyle:"italic"}}>
                                    https://www.mygov.in/covid-19/ 
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                                onPress={()=>{
                                  Linking.openURL('https://www.who.int/health-topics/coronavirus#tab=tab_1')
                                }}
                          >
                                <Text style={{fontSize:20,color:"blue",fontStyle:"italic",paddingTop:10}}>
                                    https://www.who.int/health-topics/coronavirus#tab=tab_1
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                                onPress={()=>{
                                  Linking.openURL('https://en.wikipedia.org/wiki/Coronavirus_disease_2019')
                                }}
                          >
                                <Text style={{fontSize:20,color:"blue",fontStyle:"italic",paddingTop:10}}>
                                     https://en.wikipedia.org/wiki/Coronavirus_disease_2019
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                                onPress={()=>{
                                  Linking.openURL('https://www.worldometers.info/coronavirus/')
                                }}
                          >
                                <Text style={{fontSize:20,color:"blue",fontStyle:"italic",paddingTop:10}}>
                                    https://www.worldometers.info/coronavirus/
                                </Text>
                          </TouchableOpacity>
                          <Text style={{fontSize:20,color:"black",fontStyle:"italic",paddingTop:10}}>
                            Donate funds at:
                          </Text>
                          <TouchableOpacity
                                onPress={()=>{
                                  Linking.openURL('https://www.pmindia.gov.in/en/')
                                }}
                          >
                                <Text style={{fontSize:20,color:"blue",fontStyle:"italic",paddingTop:10}}>
                                https://www.pmindia.gov.in/en/
                                </Text>
                          </TouchableOpacity>
                          
                      </View>
                    </Card>
                    {/* shareapp card */}
                    <Card
                      title={'Share App'}
                      titleStyle={{fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
                      dividerStyle={{backgroundColor:"black",height:2}}
                      containerStyle={{backgroundColor:"#ece4f0"}}
                    >
                        <View style={{flexDirection:"column"}}>
                          <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <View>
                                    <TouchableOpacity onPress={()=>{
                                              Linking.openURL(`whatsapp://send?text=${"Hello there, this is an link of a app named Covid-19Stat which shows some data related to number of people affected with covid-19,number of people recovered and number of people deceased and it also contains some useful links regarding Covid-19"} ${shareAppLink}`)
                                          }}
                                  >
                                  <Icon
                                      name="whatsapp"
                                      type="font-awesome"
                                      size={45}
                                      color="green"
                                  />
                                  </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={()=>{
                                              Linking.openURL(`mailto:support@example.com?subject=Information regarding covid-19 app &body=${"Hello there, this is an link of a app named Covid-19Stat which shows some data related to number of people affected with covid-19,number of people recovered and number of people deceased and it also contains some useful links regarding Covid-19"} ${shareAppLink}`)
                                          }}
                                  >
                                  <Icon
                                      name="gmail"
                                      type="material-community"
                                      size={45}
                                      color="red"
                                  />
                                  </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={()=>{
                                              Linking.openURL(`sms:?body=${"Hello there, this is an link of a app named Covid-19Stat which shows some data related to number of people affected with covid-19,number of people recovered and number of people deceased and it also contains some useful links regarding Covid-19"} ${shareAppLink}`)
                                          }}
                                  >
                                  <Icon
                                      name="email"
                                      type="material-community"
                                      size={45}
                                      color="grey"
                                  />
                                  </TouchableOpacity>
                                </View>
                                
                          </View>
                          <View style={{alignItems:"center"}}>
                                  <Text style={{fontSize:20,color:"black",fontStyle:"italic",paddingTop:10,fontWeight:"bold"}}>
                                      Developer info
                                  </Text>
                          </View>
                          <View style={{alignItems:"flex-start",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10}}>
                          <View>
                              <TouchableOpacity onPress={()=>{
                                              Linking.openURL("https://github.com/Pavangbhat")
                                          }}
                                  >
                                  <Icon
                                      name="github"
                                      type="font-awesome"
                                      size={45}
                                      color="black"
                                  />
                              </TouchableOpacity>
                          </View>
                          <View>
                              <TouchableOpacity onPress={()=>{
                                              Linking.openURL("https://www.linkedin.com/in/pavan-bhat-067667196/")
                                          }}
                                  >
                                  <Icon
                                      name="linkedin"
                                      type="font-awesome"
                                      size={45}
                                      color="blue"
                                  />
                              </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:20,color:"black",fontStyle:"italic",paddingTop:10,fontWeight:"bold",paddingBottom:10}}>
                                Update App
                            </Text>
                            <Button
                            icon={
                              <Icon
                                name="refresh"
                                type="font-awesome"
                                size={23}
                                color="#3a939c"
                              />
                            }
                            title="Update"
                            titleStyle={{fontSize:25,color:"#3a939c",paddingLeft:10}}
                            type='outline'
                            raised
                            buttonStyle={{borderWidth:2,borderColor:"white"}}
                            disabled={!updateAvaiable}
                            onPress={()=>{
                              Linking.openURL(`${shareAppLink}`)
                            }}
                           />
                           <Text style={{fontSize:20,color:"black",fontStyle:"italic",paddingTop:10}}>
                             {updateMessage}
                           </Text>
                        </View>
                    </View>
                </Card>

          <View style={{paddingTop:100}} />     
     </ScrollView>
    </View>
  )
}

const Tab=createBottomTabNavigator()

function App(){
  const [iconSize,SeticonSize]=useState(0)
  const [tabBarHeight,SettabBarHeight]=useState(0)
  const [fontSize,SetfontSize]=useState(0)
  const [Padding,SetPadding] =useState(0)

  useEffect(() =>{
    const windowWidth = Dimensions.get('window').width;
    SeticonSize(() => {
      const calculation =Math.floor((windowWidth*30)/432);
      return calculation;
    });
    SettabBarHeight(() => {
      const calculation =Math.floor((windowWidth*60)/432);
      return calculation;
    });
    SetfontSize(() => {
      const calculation =Math.floor((windowWidth*20)/432);
      return calculation;
    });
    SetPadding(() => {
      const calculation =Math.floor((windowWidth*35)/432);
      return calculation;
    });

  },[])
  return(
    <NavigationContainer>
        <Tab.Navigator 
          tabBarOptions={{
            style: {
              backgroundColor: '#3356ff',
              height:tabBarHeight,
            }
          }}
        >
            <Tab.Screen name={"Global"} component={GlobalData} 
            options={{
              tabBarLabel:"",
              tabBarIcon:()=>{
              return(
                 <Icon
                  name='globe'
                  type='font-awesome'
                  color='#FFF'
                  size={iconSize}
                 />)
               },
               tabBarLabel:({route})=>{
                 
                 return(
                     <Text style={{fontSize:fontSize,paddingLeft:Padding,paddingRight:Padding,fontStyle:"italic",color:"#FFF"}}>
                        Global
                     </Text>
                 )
               }
            }}/>
            <Tab.Screen name={"State"} component={StateData}
              options={{
              tabBarLabel:"State",
              tabBarIcon:()=>{
              return(
                 <Icon
                  name='code-string'
                  type='material-community'
                  color='#FFF'
                  size={iconSize}
                 />)
               },
               tabBarLabel:()=>{
                 return(
                   <View>
                     <Text style={{fontSize:fontSize,paddingLeft:Padding,paddingRight:Padding,fontStyle:"italic",color:"#FFF"}}>
                      States
                     </Text>
                   </View>
                 )
               }
            }}
            />
            <Tab.Screen name={"Links"} component={Links} 
              options={{
              tabBarLabel:"Links",
              tabBarIcon:()=>{
              return(
                 <Icon
                  name='link-box-variant'
                  type='material-community'
                  color='#FFF'
                  size={iconSize}
                  
                 />)
               },
               tabBarLabel:()=>{
                 return(
                   <View>
                     <Text style={{fontSize:fontSize,paddingLeft:Padding,paddingRight:Padding,fontStyle:"italic",color:"#FFF"}}>
                       Links
                     </Text>
                   </View>
                 )
               }
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
    
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
  tabIconStyle:{
    
  }

})
export default  App