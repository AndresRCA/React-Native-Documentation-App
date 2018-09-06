import React from "react";
import { Container, Header, Body, Title, Content, Text, List, ListItem } from "native-base";
import Doc from './Doc.js';

//Taken from ../views/docs/docs.json
const docs = [
  {
    "name": "TypeScript",
    "slug": "typescript",
    "type": "typescript",
    "links": {
      "home": "https://www.typescriptlang.org",
      "code": "https://github.com/Microsoft/TypeScript"
    },
    "release": "2.9.0",
    "mtime": 1528680433,
    "db_size": 1299587
  }
];

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { docs };
	}

  renderDocs(docs) {
    if(docs){
      return docs.map((doc) => <Doc {...this.props} doc_name={doc.name} />);
    }
    return <ListItem><Text>No docsets were found</Text></ListItem>;
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