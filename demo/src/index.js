import React from 'react';
import ReactDOM from 'react-dom';

import Selectable from '../../src'
import '../../src/index.css';
import './demo.css';

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

ReactDOM.render(<MyComponent/>, document.querySelector('#demo'))
