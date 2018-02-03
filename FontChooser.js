class FontChooser extends React.Component {
    constructor(props) {
		super(props);
		var checked = this.props.bold;
		var minimum = this.props.min > 1 ? parseInt(this.props.min) : 1 ;
		var maximum = parseInt(this.props.max);
		if (maximum < minimum) [minimum, maximum] = [maximum, minimum];
		var sizeProp = this.props.size;
		var defaultSize = this.props.size;
		var shouldBeBold = this.props.bold;

		// if (document.getElementsByName('checkbox').checked) {shouldBeBold=true;} else {shouldBeBold=false;}
		if (sizeProp < minimum) {sizeProp = minimum;} else if (sizeProp > maximum) {sizeProp = maximum;}
		this.state = {
			hidden:true, 
			size:sizeProp,
			textMin:minimum,
			textMax:maximum,
			initialSize:defaultSize,
			isChecked:checked,
			bold:shouldBeBold
		};

		this.handleInputChange = this.handleInputChange.bind(this);

    }
	
	handleClick() {
		if (this.state.hidden == true) {
		this.setState( { hidden : false } );
		}
		else {
		this.setState( { hidden : true } );
		}
	}
		

	// handleOnChange() {
	// 	console.log("Bold goes into handleonChange like this > - " + this.state.bold);
	// 	if (this.state.bold  == true) {
			
	// 		this.setState( { bold : false });
	// 		console.log("Bold comes out of if handleonChange like this >" + this.state.bold);
	// 	} else {
			
	// 		this.setState( { bold : true });
	// 		console.log("Bold comes out of if else handleonChange like this >" + this.state.bold);
	// 	}
	// }

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		
		this.setState({
			bold: value
		  });
	}

	handlePlusClick() {
		if (this.state.size < this.state.textMax){
			var state = parseInt(this.state.size) + 1;
			this.setState( {size: parseInt(state)});
		}
	}

	handleMinusClick() {
		if (this.state.size > this.state.textMin){
			var state = parseInt(this.state.size) - 1;
			this.setState( {size: parseInt(state)});
		}
	}

	handleDoubleClick() {
		var revert = this.state.initialSize;
		this.setState({size:parseInt(revert)});

	}

	renderTextColor() {
		if (this.state.size == this.state.textMax || this.state.size == this.state.textMin ) {
			var fontColor = {color : 'red'}
		 } else {
			var fontColor = {color : 'black'}
		 }
		return fontColor;
	}
 
    render() {
		var weight = this.state.bold ? 'normal' : 'bold' ;
		var renderCheck = this.state.bold;
		
		var curSize = this.state.size;
		var textStyle = {
			fontWeight: weight,
			fontSize: parseInt(curSize)
		}
		var fColor = this.renderTextColor();
		console.log(weight + "< weight  -  " + renderCheck + "< Render check  - -" + textStyle);
		return(
		   <div>

		   <input 
		   type="checkbox" 
		   id="boldCheckbox" 
		   hidden={this.state.hidden} 
		   onChange={this.handleInputChange} 
		   checked={renderCheck} />

		   <button 
		   id="decreaseButton" 
		   hidden={this.state.hidden} 
		   onClick={this.handleMinusClick.bind(this)}
		   >-</button>

	       <span id="fontSizeSpan" hidden={this.state.hidden} style={fColor} onDoubleClick={this.handleDoubleClick.bind(this)}>{this.state.size}</span>
	       <button id="increaseButton" hidden={this.state.hidden} onClick={this.handlePlusClick.bind(this)}>+</button>
		   
	       <span id="textSpan" onClick={this.handleClick.bind(this)} style={textStyle}>{this.props.text}</span>
		   
	       </div>
		   
		);
    }
}
