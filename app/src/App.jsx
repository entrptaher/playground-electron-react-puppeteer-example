import React, { Component } from "react";
import autoBind from 'react-autobind';

const scraper = require('electron').remote.getGlobal('scraper');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://example.com',
      title: ''
    };
    autoBind(this);
  }
  async scrapeWebsite() {
    const title = await scraper(this.state.url)
    console.log(title);
    this.setState({ title })
  }
  changeUrl(event) {
    console.log(event.target.value)
    this.setState({ url: event.target.value })
  }
  render() {
    return (
      <div>
        <p>
          <input value={this.state.url} onChange={this.changeUrl} placeholder={'enter url'}/>
          <h1>{this.state.title}</h1>
        </p>
        <button onClick={this.scrapeWebsite}>Do Some Scraping</button>
      </div>
    );
  }
}
