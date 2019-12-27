import React, { Component } from 'react';
import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import linksObj from "./assets/db.js";
// http://my-json-server.typicode.com/catsheue/lunalinks/links/1


class App extends Component {
	constructor(props){
    super(props);
    this.state = {
        links: []
    };
	}
	componentDidMount() {
    this.renderLinks();
	}

	renderLinks = () => {
    const links = linksObj;
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

		let x;

		const sortOrder = (a, b) => {
			const aOrder = a.order ? a.order : -1;
			const bOrder = b.order ? b.order : -1;
			return bOrder - aOrder;
		}
		for (x of sortlinks) {
			x.item.sort(sortOrder);
		}
		this.setState({
			links: sortlinks
		});
	}

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
