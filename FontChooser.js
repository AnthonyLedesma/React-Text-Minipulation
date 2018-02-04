class FontChooser extends React.Component {
    constructor(props) {
		super(props);
		var minimum = parseInt(this.props.min) > 1 ? parseInt(this.props.min) : 1 ; //Setting minimum text size.
		var maximum = parseInt(this.props.max); //setting maximum text size. 
		if (maximum < minimum) [minimum, maximum] = [maximum, minimum]; //If max is less than minimum, swap them.
		this.state = {
			hidden:true, //Acts as control for all hidden elements in application.
			size:parseInt(this.props.size), //using parseInt to make sure we are not getting a string like '16'
			textMin:minimum, //Setting calculated min and max to states.
			textMax:maximum,
			isChecked:this.props.bold, //Checkbox should match status of props.bold
			bold:this.props.bold == 'true' //Settings bold state to equal the initial bold property setting.
		};
    }
	
	handleClick() {
		this.setState( { hidden : !this.state.hidden } );
		//Handle click will alternate boolean value for hidden.		
	}
		

	handleOnChange() {
		if (this.state.bold == true) { //Will ensure that bold status is swapped at the same time checkbox is changed.
			this.setState({bold: false});
		} else {
			this.setState({bold: true});
		}
	}

	handlePlusClick() {
		if (this.state.size < this.state.textMax){ //Checking that we are not at max already.
			var state = parseInt(this.state.size) + 1; //If not at max, increment size state.
			this.setState( {size: parseInt(state)});
		}
	}

	handleMinusClick() {
		if (this.state.size > this.state.textMin){ //Checking that we are not at min already.
			var state = parseInt(this.state.size) - 1; //If not at min, increment size state.
			this.setState( {size: parseInt(state)});
		}
	}

	handleDoubleClick() { //Only triggers when double clicking on font size span.
		var revert = this.props.size; //revert is a temp holder of props.size. 
		this.setState({size:parseInt(revert)}); //Using revert and parseInt to ensure actual number instead of '16'
	}

	renderTextColor() { //If either at max or min already then set color to red. 
		if (this.state.size == this.state.textMax || this.state.size == this.state.textMin ) {
			var fontColor = {color : 'red'}
		 } else { // if not at the max, set color of text to black.
			var fontColor = {color : 'black'}
		 }
		return fontColor; //Return style to be used with the font size text.
	}
 
    render() {
		var weight; //bold or not
		var renderCheck; //checkbox to match bold or not.
		var curSize = parseInt(this.state.size); //Take current size state and set to integer.
		var fColor = this.renderTextColor(); //Run check against max or min for red text.
		if (this.state.bold == true) {weight = 'bold'} else {weight = 'normal'} //Are we bold or normal.
		if (weight == 'bold') {renderCheck = true;} else {renderCheck = false;} //Make sure we match bold satus.
		var textStyle = { //Var structure this way to mimic style html tags.
			fontWeight: weight, 
			fontSize: parseInt(curSize) 
		}
		return(
		   <div>
		   <input type="checkbox" id="boldCheckbox" 
		   hidden={this.state.hidden} 
		   defaultChecked={renderCheck}
		   checked={renderCheck}
		   onChange={this.handleOnChange.bind(this)} 
			/>

		   <button id="decreaseButton" 
		   hidden={this.state.hidden} 
		   onClick={this.handleMinusClick.bind(this)} >-</button>

		   <span id="fontSizeSpan" 
		   hidden={this.state.hidden} 
		   style={fColor} 
		   onDoubleClick={this.handleDoubleClick.bind(this)} >
		   {this.state.size}
		   </span>

		   <button id="increaseButton" 
		   hidden={this.state.hidden} 
		   onClick={this.handlePlusClick.bind(this)} >+</button>
		   
		   <span id="textSpan" 
		   onClick={this.handleClick.bind(this)} 
		   style={textStyle}>
		   {this.props.text}
		   </span>
	       </div> 
		);
    }
}
