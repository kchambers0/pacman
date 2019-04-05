import React from 'react';

function Controller(props){

	return(
		<div className="controller">
			<button onClick={props.move}>{String.fromCharCode(8593)}</button>
			<br/>
			<button onClick={e => props.turn('left')}>{String.fromCharCode(8592)}</button>
			<div className="joystick"></div>
			<button onClick={e => props.turn('right')}>{String.fromCharCode(8594)}</button>
			<br/>
			<button onClick={props.report}>report</button>
			<br/>
			<h2>{props.message}</h2>
		</div>
	)
}

export default Controller