import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// http://my-json-server.typicode.com/catsheue/lunalinks/links/1



class App extends Component {
	constructor(props){
    super(props);
    this.state = {
        links: {}
    };
	}
	componentDidMount() {
    this.handleSearch();
	}

    handleSearch = () =>{
        let url = 'http://my-json-server.typicode.com/catsheue/lunalinks/links';
        fetch(url).
        then(response => response.json()).then((links) => {
            console.log(links);
            this.setState({
                links: links
            });
        });
    };
    render () {
        const { links } = this.state;
        debugger
        return (
            <div className="App app">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Front End Developer</p>
                    <ul>
                        <li>abd</li>
                    </ul>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
