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

	//Lets fake an ajax or something... we'll get the data at component mount.
	componentDidMount(){
		this.setState({
			squares:[
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			]
		})
	}

	render(){
		let CoordinateMap = this.state.squares.map(row => {
			return (
				<div className='grid--row'>{row.map(coordinate => <Coordinate />)}</div>
			)
		})

		return(
			<div className="grid">
				{CoordinateMap}
			</div>
		);
	}
}

export default Grid;