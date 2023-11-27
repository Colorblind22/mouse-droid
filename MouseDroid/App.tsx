import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Navigation } from 'react-native-navigation';

const ExpandableNetwork = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // require doesnt like adding vars?
  const Images = {
    1: require('./images/WiFi_1.png'),
    2: require('./images/WiFi_2.png'),
    3: require('./images/WiFi_3.png'),
    4: require('./images/WiFi_4.png')
  };
  const getImage = (id) => {
      return Images[id]
  };

  return (
    <View style={{  }}>
      <View style={{ paddingBottom: 25 }}>
        <View>
          <TouchableOpacity 
            onPress={toggleExpand}
            style={styles.nextworkButton} 
          > 
            <Image
              style={{     
                width: 52,
                height: 38,
                marginLeft: 20,
                marginTop: 15,
                position: 'absolute'
              }}
              source={getImage(item.strength)} 
            />
            <Text style={styles.listText}> 
              {item.name} 
            </Text>
            
            {expanded && ( 
                <View style={{ paddingTop: 25 }}>
                  <TouchableOpacity 
                  onPress={toggleExpand}
                  style={{   
                    width: 150, 
                    height: 50, 
                    paddingVertical: 5,
                    backgroundColor:'#FBB03B',
                    borderRadius: 40, }} 
                  >
                    <Text style={{
                      paddingHorizontal: 10,
                      fontSize: 28,
                      color:'#fff',
                      textAlign:'center'}}
                    > 
                      Connect 
                    </Text>
                  </TouchableOpacity>
                </View>
            )} 
          </TouchableOpacity>
          
 
        </View>
      </View>
    </View>
  );
};

const NetworkList = ({ data }) => {
  const [expandedId, setExpandedNetwork] = useState();
  
  return (
    <View style={{ alignItems: 'center', paddingTop: 25, height: 450}}>
    
      <FlatList 
        data={data} 
        renderItem={({ item }) => (

            
          
            <ExpandableNetwork item={item}/>
        

          
        )}
        keyExtractor={(item) => item.id.toString()} 
      /> 

    </View>
  );
}

const WelcomeScreen = (props) => {
  // dummy data
  const [networks, setNetwork] = useState([
    {id: '1', name: 'MouseDroid_1', strength: '3'},
    {id: '2', name: 'MouseDroid_2', strength: '4' },
    {id: '3', name: 'MouseDroid_3', strength: '1' },
    {id: '4', name: 'MouseDroid_1', strength: '3'},
    {id: '5', name: 'MouseDroid_2', strength: '4' },
    {id: '6', name: 'MouseDroid_3', strength: '1' },
    {id: '7', name: 'MouseDroid_1', strength: '3'},
    {id: '8', name: 'MouseDroid_2', strength: '4' },
    {id: '9', name: 'MouseDroid_3', strength: '1' },
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./images/Background.png')} style={styles.Background} resizeMode="repeat"
      />

      <View style={styles.header}>
        <View style={styles.pad}>
          <Image
            style={styles.icon}
            resizeMethod='resize'
            source={require('./images/MouseDroidIcon.png')} 
          />
        </View>

        <Text style={styles.boldText}>
          Mouse WiFi {'\n'}Booster
        </Text> 
      </View>


      <View style={styles.listArea}>
        <View style={{ paddingTop: 30, alignItems: 'center' }}>

          <Text style={{
              height: 50,
              fontSize: 30,
              color:'#000'
            }}>
            Select a Booster
          </Text> 

          <View style={{
            width: 300,
            height: 4,
            borderRadius: 50,
            backgroundColor:'#000',
          }}></View>
        </View>

        <NetworkList  data={networks} />

        
      </View>
    </View>
  ); 
}
WelcomeScreen.options = {
  topBar:{
    title:{text:"Mouse Droid"},
  }
}

Navigation.registerComponent('com.MouseDroid.WelcomeScreen', () => WelcomeScreen);
 
Navigation.events().registerAppLaunchedListener(()=>{
  Navigation.setRoot({
      root:{
          stack:{
              children:[{
                  component:{
                      name:'com.MouseDroid.WelcomeScreen'
                  },
              }]
          }
      }
  });
});

const styles = StyleSheet.create({
  sectionContainer: {
    //marginTop: 32,
    //paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000'
  },
  sectionDescription: {
    //marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000'
  },
  highlight: {
    fontWeight: '700',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },


  container:{
    backgroundColor:'#fff',
    alignItems: 'center',
  },
  pad: {
    paddingHorizontal:10
  },
  icon: {
    width: 75,
    height: 75,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  Background: {
    width: 1200,
    height: 900,
    resizeMode: 'stretch',
    position:'absolute',
    transform: [{rotateZ: '65deg'}, {rotateY: '50deg'}]
  },

  boldText: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'#fff',
  },
  listText: {
    //width: 350,
    //height: 80,
    paddingTop: 20,

    fontSize: 23,
    color:'#000',
  },
  nextworkButton: { 
    elevation: 2,
    paddingBottom: 20,
    paddingHorizontal: 90,
    backgroundColor:'#EB8C1E',
    borderRadius: 40,
  },
  listArea: {
    marginTop: 30,
    width: 415,
    height: 800,
    borderRadius: 50,
    backgroundColor:'#fff',
  }
});



export default WelcomeScreen;