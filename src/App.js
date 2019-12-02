import React, { Component } from 'react';
import './App.scss';

// http://my-json-server.typicode.com/catsheue/lunalinks/links/1



class App extends Component {
	constructor(props){
    super(props);
    this.state = {
        links: []
    };
	}
	componentDidMount() {
    this.handleSearch();
	}

  handleSearch = () =>{
    // let url = 'http://my-json-server.typicode.com/catsheue/lunalinks/links?a=1';
    let url = 'http://localhost:3000/links/'
    fetch(url).then(response => response.json()).then((links) => {


      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
      // google check object value in array
      // Check if object value exists within a Javascript array of objects and if not add a new object to array
      // https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add/22844712

      const add = (arr, name, source) => {
        const found = arr.some(el => el.type === name);
        if (!found) {
          arr.push({ type: name, item: []})
          const index = arr.findIndex(fruit => fruit.type === name);
          arr[index].item.push({...source});

        } else{
          const index = arr.findIndex(fruit => fruit.type === name);
          arr[index].item.push({...source});
        }

        return arr;
      }
      const sortlinks = links.reduce((a, c) => {
        add(a, c.type, c);
        return a;
      }, [])

      // let x;
      // for (x of sortlinks) {
      //   x.item.sort();
      // }
      this.setState({
          links: sortlinks
      });
    });
  };
  render () {
    const { links } = this.state;
    return (
      <div className="App app">
        <header className="app__header">
          <h1>LunaLinks</h1>
          <p>一堆無聊的站站 OwO</p>
        </header>
        <div className="app__content">
          <ul>
            {links.map((link, i) => {
              const { item: items, type } = link;
              return(
                <li key={i}>
                  <p className="app__linktit">{type}</p>
                  <ul className="app__links">
                  {items.map((item, i) => {
                    const { title, links } = item;
                    return <li key={i}><a href={links} target="_blank" rel="noopener noreferrer">{title}</a></li>;
                  })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
