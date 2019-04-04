import React from 'react';
import Coordinate from './Coordinate'

class Grid extends React.Component {
	constructor(){
		super();

		const directions = ['north', 'east', 'west', 'south'];

		this.state = {
			squares : [],
			direction: directions[0]
		}
	}

	render(){
		return(
			<div className="grid">
				<Coordinate />
			</div>
		);
	}
}

export default Grid;