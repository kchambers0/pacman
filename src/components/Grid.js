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
		setTimeout(() => {
			this.place(1,1);
			this.move()
		},1000)
		
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

	//returns our boy's current locale.
	//I breifly considered holding the x and y values in state, but it would get strange setting them in move then calling place.
	//I'd have to make another function to set their state, then run place to update after that. Felt messy to me.
	getCoordinates(){
		for(let x in this.state.coordinates){
			for(let y in this.state.coordinates[x]){
				if(this.state.coordinates[x][y]){
					return {x:x,y:y}
				}
			}
		}
	}

	//our place function. Simply sets his current square to 1, passes in direction, and sets placed flag to true.
	//Since our origin is actually the southern corner, and not the north, we'll use the reverse calls to pull the ol' switcheroo.
	place(x,y,facing = this.directions.NORTH){
		let currentSquares = this.resetState();
		currentSquares.reverse();
		currentSquares[x][y]=1
		currentSquares.reverse();

		this.setState({
			coordinates: currentSquares,
			direction: facing,
			isPlaced:true
		})
	}

	//moves pacman forward.
	move(){
		let coordinates = {}
		switch(this.state.direction){
			case this.directions.NORTH:
				coordinates = this.getCoordinates()
				this.place(coordinates.x-1,coordinates.y);
				break;
			case this.directions.EAST:
				coordinates = this.getCoordinates()
				this.place(coordinates.x,coordinates.y+1);
				break;
			case this.directions.WEST:
				coordinates = this.getCoordinates()
				this.place(coordinates.x,coordinates.y-1);
				break;
			case this.directions.SOUTH:
				coordinates = this.getCoordinates()
				this.place(coordinates.x+1,coordinates.y);
				break;
			default:
				Error("Oops, not that way!");
				break;

		}

		console.log("I'll go "+this.state.direction);
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