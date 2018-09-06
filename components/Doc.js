import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "native-base";
import DocItem from './DocItem.js';

/*
List of props: doc_name, navigation
 */

/* //Something like this for 'this.state.doc'
const doc = {
  name: this.props.doc_name,
  entries: require('../views/docs/+this.props.doc_name.lowercase()+/index.json').entries,
  types: require('../views/docs/+this.props.doc_name.lowercase()+/index.json').types,
  indexHTML: require('../views/docs/+this.props.doc_name.lowercase()+/db.json').index 
}
*/

export default class Doc extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      isOpen: false, 
      doc: {
        name: this.props.doc_name,
        entries: require('../views/docs/typescript/index.json').entries,
        types: require('../views/docs/typescript/index.json').types,
        indexHTML: require('../views/docs/typescript/db.json').index 
      },
      doc_items: [] //contains a bunch of DocItems
	  }
  }

  renderDoc() {
    return this.state.doc.types.map(({ name }) => {
      let doc_items = this.state.doc.entries.filter(({ type }) => type == name);
      return <DocItem type={name} doc_items={doc_items} {...this.props} />
    }
    );
  }

  //Not to be confused with the doc_items prop from DocItem
  componentDidMount() {
    this.setState({ doc_items: this.renderDoc() });
  }

  render() {
    return (
      <View>
      	<ListItem itemHeader
          button
          onPress={() => this.setState({isOpen: !this.state.isOpen})}
        >
          <Icon type='FontAwesome' name={(this.state.isOpen)? 'folder-open' : 'folder'} /><Text> {this.props.doc_name}</Text>
        </ListItem>
        { this.state.isOpen && 
          (
            <View>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate('DocView', {title: this.state.doc.name, subtitle: 'index', doc_html: this.state.doc.indexHTML})}
              >
                <Text>index</Text>
              </ListItem>
              { this.state.doc_items }
            </View>
          )
        }
      </View>
    );
  }
}