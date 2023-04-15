import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import Notes from './commponents/Notes';

function App(props) {
  return (
    <SafeAreaView
      style={[styles.container, {paddingTop: StatusBar.currentHeight}]}>
      <ScrollView>
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
