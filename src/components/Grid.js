import React from 'react';
import Coordinate from './Coordinate'

class Grid extends React.Component {
	constructor(){
		super();

		this.directions = {NORTH:'north', EAST:'east', WEST:'west', SOUTH:'south'};

		this.state = {
			coordinates : [],
			direction: this.directions.NORTH,
			isPlaced:false
		}

		this.place = this.place.bind(this);
	}

	//Lets fake an ajax or something... we'll get the data at component mount.
	componentDidMount(){
		this.setState({
			coordinates:this.resetState()
		})

		//For now, let's place him here.

		this.place(0,0);
	}

	//returns an empty board.
	//Useful to wipe board state after a command instead of having to track the last position as well as the new one.
	//Opted for 0's instead of false. I feel like it's more readable this way.
	resetState(){
		return [
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			]
	}

	//our place function. Simply sets his current square to 1, passes in direction, and sets placed flag to true.
	place(x,y,facing = this.directions.NORTH){
		let currentSquares = this.resetState();
		currentSquares[x][y]=1

		this.setState({
			coordinates: currentSquares,
			direction: facing,
			isPlaced:true
		})
	}

	render(){
		let CoordinateMap = this.state.coordinates.map((row,x) => {
			return (
				<div className='grid--row' key={x}>{row.map((coordinate, y) => <Coordinate key={x+', '+y} x={x} y={y} pacman={this.state.coordinates[x][y]} />)}</div>
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