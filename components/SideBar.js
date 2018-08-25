import React from "react";
import { Container, Header, Body, Title, Content, Text, List, ListItem } from "native-base";

//I just want to "simulate" what I'd get from the local database
const docs = [
  {
    name: 'Home',
    isDoc: false,
    doc_data: null
  },
  {
    name: 'Typescript',
    isDoc: true,
    doc_data: require('../views/docs/typescript/db.json')
  }
];

export default class SideBar extends React.Component {
  cleanString(path) {
    let path_array = path.split('');
    let i = 0;
    while(path_array[i]) {
      if(path_array[i] == '/'){
        path_array.splice(0, i+1); //remove the '/' and everything before it
        i = 0; // start from the new beginning
      }else{
        i++;
      }
    }
    return path_array.join('');

  }

  renderList(docs, navigation) {
    let list = [];
    docs.forEach((doc) => {
      list.push(
        <ListItem itemHeader first
          button
          onPress={() => navigation.navigate((doc.isDoc)? 'DocView' : 'Home', {title: doc.name, subtitle: 'index', doc_html: (doc.doc_data)? doc.doc_data['index'] : null})}
        >
          <Text>{doc.name}</Text>
        </ListItem>
      );
      if(doc.doc_data){
        for (let key in doc.doc_data) {
          let clean_key = this.cleanString(key);
          list.push(
            <ListItem 
              button
              onPress={() => navigation.navigate((doc.isDoc)? 'DocView' : 'Home', {title: doc.name, subtitle: clean_key, doc_html: doc.doc_data[key]})}
            >
              <Text>{clean_key}</Text>
            </ListItem>
          );
        }
      }
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
            {
              this.renderList(docs, this.props.navigation)
            }
          </List>
        </Content>
      </Container>
    );
  }
}