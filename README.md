# react-selectable

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## A React Component That Provides Toggleable Rectangular Selection
`react-selectable-simple` gives you a rectangular selection tool so that you can visually select target elements.

### Installation
```npm install react-selectable-simple --save```

### Basic Usage
```
import React from 'react';
import ReactDOM from 'react-dom';

import Selectable from 'react-selectable-simple';

class MyComponent extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  isSelectModeOn: false,
      selected: []
  	}
  	this.toggleSelectMode = this.toggleSelectMode.bind(this);
  	this.onSelectionEnd = this.onSelectionEnd.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }
  
  toggleSelectMode(e) {
  	this.setState({
  	  isSelectModeOn: !this.state.isSelectModeOn
  	});
  }

  clearSelection(e) {
    this.state.selected.forEach(el => {
      el.classList.remove("Selectable__item--selected");
    });
    this.setState({
      selected: []
    });
  }
  
  onSelectionEnd(selected) {
    this.setState({
      selected: selected
    }, () => {
      alert(selected.map(s => s.innerText).join(", "));
    });
	  
	}
  
  render() {
  	return (
  		<React.Fragment>
    		<button className="toggleButton" onClick={this.toggleSelectMode}>Toggle Selection Tool</button>
        <button className="clearSelectionButton" onClick={this.clearSelection}>Clear Selection</button>
    		<Selectable isSelectModeOn={this.state.isSelectModeOn} onSelectionEnd={this.onSelectionEnd}>
    		  <ul>
    		    <li className="Selectable__item">Red</li>
    		    <li className="Selectable__item">Green</li>
    		    <li className="Selectable__item">Orange</li>
    		    <li className="Selectable__item">Yellow</li>    
    		  </ul>
    		</Selectable>
    	</React.Fragment>
    );
  }
}
```

### Available Props
`isSelectModeOn`: toggles the rectangular selection tool on and off

`onSelectionEnd(selected)`: callback that returns the array of selected elements

`className`: the class for the parent container. defaults to "Selectable", or specify a different className by passing it as a prop

`selectableClassName`: the class for the target elements that you want to be selectable. defaults to "Selectable__item", or specify a different className by passing it as a prop

`selectBoxClassName`: the class for the selection box itself. defaults to "Selectable__selection-box", or specify a different className by passing it as a prop

`selectedClassName`: the class added to selected elements. defaults is "Selectable__item--selected", or specify a different className by passing it as a prop

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
