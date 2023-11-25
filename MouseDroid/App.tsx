import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

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

/* ^ defining your own tag?
 * tuple {children, title} is type SectionProps
 * Section() returns a JSX.Element
 */

function App(): JSX.Element {
  return (
    
        <View>
          <Section title="New Section">
            This section should be above 
            <Text style={styles.highlight}> Step One. </Text>
          </Section>
        </View>
  );
}

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
});

export default App;
