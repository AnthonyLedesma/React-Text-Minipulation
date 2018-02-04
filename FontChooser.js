class FontChooser extends React.Component {
    constructor(props) {
		super(props);
		var checked = this.props.bold;
		var minimum = parseInt(this.props.min) > 1 ? parseInt(this.props.min) : 1 ;
		var maximum = parseInt(this.props.max);
		if (maximum < minimum) [minimum, maximum] = [maximum, minimum];
		var sizeProp = parseInt(this.props.size);
		var defaultSize = parseInt(this.props.size);
		var shouldBeBold = this.props.bold;
		if (sizeProp < minimum) {sizeProp = minimum;} else if (sizeProp > maximum) {sizeProp = maximum;}
		this.state = {
			hidden:true, 
			size:parseInt(sizeProp),
			textMin:minimum,
			textMax:maximum,
			initialSize:defaultSize,
			isChecked:checked,
			bold:shouldBeBold == 'true'
		};
    }
	
	handleClick() {
		this.setState( { hidden : !this.state.hidden } );		
	}
		

	handleOnChange() {
		if (this.state.bold == true) {
      this.setState({bold: false});}
    else{
      this.setState({bold: true});}

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

	// renderBoldText() {
	// 	if (this.state.bold == 'true') {
	// 		var fontWeight = 'bold';
	// 	} 
	// 	if (this.state.bold == 'false') {
	// 		var fontWeight = 'normal';
	// 	}
	// 	return fontWeight;
		
	// }

	
 
    render() {
		var weight;
		if (this.state.bold == true) {weight = 'bold'} else {weight = 'normal'}

		var renderCheck;
		if (weight == 'bold') {renderCheck = true;} else {renderCheck = false;}
		
		var curSize = parseInt(this.state.size);
		
		var textStyle = {
			fontWeight: weight,
			fontSize: parseInt(curSize)
		}
		
		
		var fColor = this.renderTextColor();
		console.log(renderCheck);
		return(
		   <div>

		   <input 
		   type="checkbox" 
		   id="boldCheckbox" 
		   hidden={this.state.hidden} 
		   defaultChecked={renderCheck}
		   checked={renderCheck}
		   onChange={this.handleOnChange.bind(this)} 
			/>

		   <button 
		   id="decreaseButton" 
		   hidden={this.state.hidden} 
		   onClick={this.handleMinusClick.bind(this)} >-</button>

		   <span 
		   id="fontSizeSpan" 
		   hidden={this.state.hidden} 
		   style={fColor} 
		   onDoubleClick={this.handleDoubleClick.bind(this)} >
		   {this.state.size}
		   </span>

		   <button 
		   id="increaseButton" 
		   hidden={this.state.hidden} 
		   onClick={this.handlePlusClick.bind(this)} >+</button>
		   
		   <span 
		   id="textSpan" 
		   onClick={this.handleClick.bind(this)} 
		   style={textStyle}>
		   {this.props.text}
		   </span>
		   
	       </div> 
		);
    }
}
