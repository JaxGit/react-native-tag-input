import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';
import TagInput from 'react-native-tag-input';

const horizontalInputProps = {
  keyboardType: 'default',
  returnKeyType: 'search',
  placeholder: 'Search',
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

export default class TagInputExample extends Component {
  state = {
    tags: [],
    horizontalTags: [],
  };

  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

  onChangeHorizontalTags = (horizontalTags) => {
    this.setState({
      horizontalTags,
    });
  };

  labelExtractor = (tag) => tag;

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'email',
      autoFocus: true,
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
            tagColor="blue"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={75}
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
            tagColor="blue"
            tagTextColor="white"
            inputProps={horizontalInputProps}
            maxHeight={75}
            scrollHorizontal
          />
        </View>

      </View>
    );
  }
}
