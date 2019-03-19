import React from 'react';
import ReactDOM from 'react-dom';

class Selectable extends React.Component {
	constructor(props) {
		super(props);
		this.selectionBox = React.createRef();
    	this.selectableArea = React.createRef();

		this.state = {
			isSelectModeOn: false,
			isSelectionRunning: false,
			className: props.className || "Selectable",
			selectableClassName: props.selectableClassName || "Selectable__item",
			selectBoxClassName: props.selectBoxClassName || "Selectable__selection-box",
			selectedClassName: props.selectedClassName || "Selectable__item--selected",
			mousePos: {
				x1: 0,
				x2: 0,
				y1: 0,
				y2: 0
			},
			selectables: [],
			selectedElements: [],
			onSelectionEnd: props.onSelectionEnd
		}

		this.initSelection = this.initSelection.bind(this);
    	this.updateSelection = this.updateSelection.bind(this);
    	this.endSelection = this.endSelection.bind(this);
	}

	/**** 
	LIFECYCLE METHODS 
	****/
	componentDidMount() {};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isSelectModeOn != this.props.isSelectModeOn) {
			this.setState({
				isSelectModeOn: this.props.isSelectModeOn
			}, () => {
				this.initSelectionMode();
				console.log("selectMode is now: ", this.state.isSelectModeOn ? "On" : "Off");
			});
		}
	}

	componentWillUnmount() {};

	/*************
	HELPER METHODS
	*************/

	getRelativeTop(child) {
		return child.offsetTop;
	}

	getRelativeBottom(child) {
		return child.offsetTop + child.offsetHeight;
	}

	calculateSelectedElements(endSelection) {
		let selectionBoxTop = this.state.mousePos.y1;
		let selectionBoxBottom = this.state.mousePos.y2;
		let selectable;
		let selected = [];
		for (selectable of Array.from(this.state.selectables)) {
			if (this.getRelativeTop(selectable) >= selectionBoxTop && this.getRelativeBottom(selectable) <= selectionBoxBottom) {
				selected.push(selectable);
				selectable.classList.add(this.state.selectedClassName);
			}
		}

		if (endSelection) {
			console.log("calling onSelectionEnd with: ", selected);
			this.state.onSelectionEnd(selected);
			this.setState({
				isSelectModeRunning: false,
				mousePos: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 0
				},
				selectedElements: []
			});
		}
	}

	/**** 
	EVENTS 
	****/

	initSelectionMode() {
		// query for selectable elements
		let selectableElements = document.querySelectorAll("." + this.state.selectableClassName);
		this.setState({
			selectables: selectableElements
		}, () => {
			// console.log("initSelectionMode", this.state.isSelectModeOn);
			if (this.state.isSelectModeOn) {
				this.selectableArea.current.style.cursor = "crosshair";
			} else {
				this.selectableArea.current.style.cursor = "auto";
			}
		});
	}

	initSelection(e) {
		if (this.state.isSelectModeOn) {
			let currentXPosition = e.pageX - this.selectableArea.current.offsetLeft;
			let currentYPosition = e.pageY - this.selectableArea.current.offsetTop;
	
			this.selectionBox.current.style.display = "inline-block";
			
			this.state.mousePos.x1 = currentXPosition;
			this.state.mousePos.y1 = currentYPosition;
			this.state.isSelectionRunning = true;
			this.selectionBox.current.style.left = currentXPosition + 'px';
    		this.selectionBox.current.style.top = currentYPosition + 'px';
    		this.selectionBox.current.style.width = 0 + 'px';
    		this.selectionBox.current.style.height = 0 + 'px';	
		}
	}

	updateSelection(e) {
		if (this.state.isSelectModeOn && this.state.isSelectionRunning) {
			let currentXPositionRelativeToParent = e.pageX - this.selectableArea.current.offsetLeft; // Update the current position X
    		let currentYPositionRelativeToParent = e.pageY - this.selectableArea.current.offsetTop; // Update the current position Y
			this.selectionBox.current.style.width = currentXPositionRelativeToParent - this.state.mousePos.x1 + 'px';
    		this.selectionBox.current.style.height = currentYPositionRelativeToParent - this.state.mousePos.y1 + 'px';
    		this.calculateSelectedElements(false);
		}
	}

	endSelection(e) {
		if (this.state.isSelectModeOn && this.state.isSelectionRunning) {
			this.selectionBox.current.style.display = "none";
			this.state.isSelectionRunning = false;
			this.state.mousePos.x2 = this.state.mousePos.x1 + parseInt(this.selectionBox.current.style.width.substring(0, this.selectionBox.current.style.width.length - 2));
			this.state.mousePos.y2 = this.state.mousePos.y1 + parseInt(this.selectionBox.current.style.height.substring(0, this.selectionBox.current.style.height.length - 2));
			this.calculateSelectedElements(true);
		}
	}

	render() {
		return (
			<div className={this.state.className} 
			ref={this.selectableArea}
			onMouseDown={this.initSelection} 
  			onMouseMove={this.updateSelection} 
  			onMouseUp={this.endSelection}>
				<div className={this.state.selectBoxClassName} ref={this.selectionBox}></div>
				{this.props.children}
			</div>
		);
	}
}

export default Selectable;