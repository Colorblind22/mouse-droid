import React, { Component } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button
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


const WelcomeScreen = (props) => {
  return (
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
  );
}
WelcomeScreen.options = {
  topBar:{
    title:{text:"Mouse Droid"},
  }
}



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
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

Navigation.registerComponent('com.MouseDroid.WelcomeScreen', () => WelcomeScreen);
Navigation.registerComponent('com.MouseDroid.TestScreen', () => TestScreen);


export default TestScreen;
export {
  TestScreen
}