    import React from 'react';
    import { View, TextInput } from 'react-native';
    import { inputSearchStyle } from '../styles/style';
    import { SearchProp } from '../types/type';



    const Search: React.FC<SearchProp> = ({ term, onTermChange, onTermSubmit }) => {
      return (
        <View style={inputSearchStyle.background}>
          <TextInput
            style={inputSearchStyle.input}
            placeholder="Search"
            value={term}
            onChangeText={onTermChange}
             onSubmitEditing={onTermSubmit}
          />
        </View>
      );
    };

    export default Search;
