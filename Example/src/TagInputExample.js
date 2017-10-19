import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';
import TagInput from 'react-native-tag-input';

export default class TagInputExample extends Component {
  state = {
    tags: [],
    text: "",
    inputDefaultWidth: 150,
    horizontalTags: [],
    horizontalText: "",
    horizontalInputDefaultWidth: 150,
  };

  onChangeTags = (tags) => {
    this.setState({
      tags,
      inputDefaultWidth: tags.length > 0 ? 50 : 150,
     });
  }

  onChangeText = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: "",
        inputDefaultWidth: 50,
      });
    }
  }

  onChangeHorizontalTags = (horizontalTags) => {
    this.setState({
      horizontalTags,
      horizontalInputDefaultWidth: horizontalTags.length > 0 ? 50 : 150,
    });
  };

  onChangeHorizontalText = (horizontalText) => {
    this.setState({ horizontalText });

    const lastTyped = horizontalText.charAt(horizontalText.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        horizontalTags: [...this.state.horizontalTags, this.state.horizontalText],
        horizontalText: "",
        horizontalInputDefaultWidth: 50,
      });
      this._horizontalTagInput.scrollToRight();
    }
  }

  labelExtractor = (tag) => tag;

  onRemoveTagAtIndex = () => {
    this.setState({
      horizontalText: "",
    })
  }

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: this.state.tags.length > 0 ? '' : 'long placeholder string',
      autoFocus: true,
    };

    const horizontalInputProps = {
      keyboardType: 'default',
      returnKeyType: 'search',
      placeholder: this.state.horizontalTags.length > 0 ? '' : 'long placeholder string',
      style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
      },
    };

    return (
      <View style={{ flex: 1, margin: 10, marginTop: 30 }}>

        <Text style={{marginVertical: 10}}>Vertical Scroll</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text>To: </Text>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            labelExtractor={this.labelExtractor}
            text={this.state.text}
            onChangeText={this.onChangeText}
            tagColor="blue"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={75}
            inputDefaultWidth={this.state.inputDefaultWidth}
          />
        </View>

        <Text style={{marginVertical: 10}}>Horizontal Scroll</Text>
        <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightblue'}}>
          <Text>To: </Text>
          <TagInput
            ref={(horizontalTagInput) => {this._horizontalTagInput = horizontalTagInput}}
            value={this.state.horizontalTags}
            onChange={this.onChangeHorizontalTags}
            labelExtractor={this.labelExtractor}
            text={this.state.horizontalText}
            onChangeText={this.onChangeHorizontalText}
            tagColor="blue"
            tagTextColor="white"
            inputProps={horizontalInputProps}
            maxHeight={75}
            scrollHorizontal
            onRemoveTagAtIndex={this.onRemoveTagAtIndex}
            inputDefaultWidth={this.state.horizontalInputDefaultWidth}
          />
        </View>

      </View>
    );
  }
}
