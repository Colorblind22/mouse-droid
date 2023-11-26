import React, {useState, Component } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Navigation } from 'react-native-navigation';

// ^ stuff we need

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// typedef SectionProps extends PropsWithChildren?

function Section({children, title}: SectionProps): React.JSX.Element { // {variable name} : {data type}
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <Text style={styles.sectionDescription}>
        {children}
      </Text>
    </View>
  );
}

function Logo()
{
  return(
    <Image 
      style={styles.tinyLogo}
      source={{uri: 'https://raw.githubusercontent.com/Colorblind22/mouse-droid/main/images/MouseDoidIcon.png'}}/>
  )
}

// maybe we make our own library file so we can share tags and stylesheets between screens

/* ^ defining your own tag?
 * tuple {children, title} is type SectionProps
 * Section() returns a JSX.Element
 */

/* --FORMAT--
function name_of_screen(): JSX.Element {
  return(
    <View>
    
    <View/>
  )
}
name_of_screen.options = {
  topBar:{

  }
}
if first
Navigation.registerComponent('com.MouseDroid.name_of_screen', () => name_of_screen)
fi
*/

const ExpandableNetwork = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
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
              source={require('./images/WiFi_4.png')} 
            />
            <Text style={styles.listText}> 
              {item.name} 
            </Text>
            
            {expanded && ( 
                <View style={{ paddingTop: 25 }}>
                  <Button title="Connect"/>
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

        <View style={{ paddingLeft: 100 }}>
          <Section>
            <Button title="Switch to second screen"
            onPress={() => Navigation.push(props.componentId, {
              component:{
                name:"TestScreen",
              }
            })}/>
          </Section>
        </View>
      </View>
    </View>
  ); 


  /*return (
        <View>
          <Logo/>
          <Section title="New Section">
            Default Screen{"\n"}
            <Button title="Switch to second screen"
            onPress={() => Navigation.push(props.componentId, {
              component:{
                name:"TestScreen",
              }
            })}/>
          </Section>
        </View>
  ); */
}
WelcomeScreen.options = {
  topBar:{
    title:{text:"Mouse Droid"},
  }
}

const TestScreen = () => {
  return(
    <View>
      <Logo/>
      <Section title="Test Section">
        Wow so awesome!
      </Section>
    </View>
  )
}
TestScreen.options = {
  topBar:{
    title:{text:"This should also have changed"}
  }
}

Navigation.registerComponent('com.MouseDroid.WelcomeScreen', () => WelcomeScreen);
Navigation.registerComponent('com.MouseDroid.TestScreen', () => TestScreen);
 
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
export {
  TestScreen
}