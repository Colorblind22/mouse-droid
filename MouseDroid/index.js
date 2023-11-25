/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import WelcomeScreen from './App';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => WelcomeScreen);
AppRegistry.registerComponent(appName, () => TestScreen);

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