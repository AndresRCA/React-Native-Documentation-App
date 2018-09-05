import React from "react";
import { Container, Header, Body, Title, Content, Text, List, ListItem } from "native-base";
import DocItem from './DocItem.js';

const docs = [
  {
    name: 'Typescript',
    entries: require('../views/docs/typescript/index.json').entries,
    types: require('../views/docs/typescript/index.json').types,
    indexHTML: require('../views/docs/typescript/db.json').index
  }
];

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { docs };
	}

  //Watch out for the keyword 'this', it could reference something else
  renderDocs(docs) {
    let list = [];
    let that = this;
    docs.forEach((doc) => {
      //Here I push the title of the doc and the index file
      list.push(
        <ListItem itemHeader>
          <Text>{doc.name}</Text>
        </ListItem>
      );
      list.push(
        <ListItem
          button
          onPress={() => that.props.navigation.navigate('DocView', {title: doc.name, subtitle: 'index', doc_html: doc.indexHTML})}
        >
          <Text>index</Text>
        </ListItem>
      );
      //Here I push the subcomponents of the doc, such as types
      doc.types.forEach(({ name }) => {
        list.push(
          <DocItem type={name} doc_items={doc.entries.filter(({ type }) => type == name)} {...that.props} />
        );
      });
    });
    return list;
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Docsets Menu</Title>
          </Body>
        </Header>
        <Content>
          <List>
          	<ListItem itemHeader first
		          button
		          onPress={() => this.props.navigation.navigate('Home')}
		        >
		          <Text>Home</Text>
		        </ListItem>
            {
              this.renderDocs(this.state.docs)
            }
          </List>
        </Content>
      </Container>
    );
  }
}