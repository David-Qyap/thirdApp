import React, {useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Notes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('Title');
  const [note, setNote] = useState('');

  const handleSave = async () => {
    const newNotes = {
      title,
      note,
    };
    try {
      const notes = await AsyncStorage.getItem('note');
      const parsedNotes = JSON.parse(notes) || [];
      parsedNotes.push(newNotes);
      await AsyncStorage.setItem('note', JSON.stringify(parsedNotes));
    } catch (error) {
      console.log(error);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.box}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <TextInput
              style={styles.input}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder={'Title'}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={[
                styles.input,
                {height: 350, textAlignVertical: 'top', borderBottomWidth: 0},
              ]}
              onChangeText={text => setNote(text)}
              value={note}
              placeholder={'Note'}
              placeholderTextColor={'black'}
              multiline={true}
            />
            <TouchableOpacity onPress={handleSave} style={[styles.button]}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: '135%',
    height: 250,
  },
  buttonOpen: {
    backgroundColor: 'white',
    width: '50%',
    height: 150,
  },
  textStyle: {
    color: 'black',
    fontSize: 22,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: '80%',
    color: 'black',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#313030',
    width: 150,
  },
});

export default Notes;
