import React from 'react';
import Coordinate from './Coordinate'

class Grid extends React.Component {
	constructor(){
		super();

		this.directions = ['north', 'east', 'south', 'west'];

		this.state = {
			coordinates : [],
			direction: this.directions[0],
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
			this.place(1,2,"east");
			this.move();
			this.move();
			this.turn("left");
			this.move();
			this.report();
			this.move();
			this.report();
			this.move();
			this.report();
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

	//FOUND OUT REVERSE IS DESTRUCTIVE...! Swiped some stack overflow code to correct weirdness.
	getCoordinates(){
		let coordinates = this.state.coordinates.reduce((ary, ele) => {ary.unshift(ele); return ary}, []);
		for(let y in coordinates){
			for(let x in coordinates[y]){
				if(coordinates[y][x]){
					return {x:parseInt(x),y:parseInt(y)}
				}
			}
		}
	}

	//our place function. Simply sets his current square to 1, passes in direction, and sets placed flag to true.
	//Since our origin is actually the southern corner, and not the north, we'll use the reverse calls to pull the ol' switcheroo.
	place(x,y,facing = this.state.direction){
		let currentSquares = this.resetState();
		currentSquares.reverse();
		currentSquares[y][x]=1
		currentSquares.reverse();

		this.setState({
			coordinates: currentSquares,
			direction: facing,
			isPlaced:true
		})
	}

	//moves pacman forward. Checks direction and updates accordingly.
	move(){
		if(this.state.isPlaced){
			let coordinates = this.getCoordinates();
			switch(this.state.direction){
				case this.directions[0]:
					//NORTH
					coordinates.y<4 && this.place(coordinates.x,coordinates.y+1);
					break;
				case this.directions[1]:
					//EAST
					coordinates.x<4 && this.place(coordinates.x+1,coordinates.y);
					break;
				case this.directions[2]:
					//SOUTH
					coordinates.y>0 && this.place(coordinates.x,coordinates.y-1);
					break;
				case this.directions[3]:
					//WEST
					coordinates.x>0 && this.place(coordinates.x-1,coordinates.y);
					break;
				default:
					Error("Oops, not that way!");
					break;

			}

			//console.log("I'll go "+this.state.direction);
		}
	}

	//Adds one or subtracts one to directions array, depending on turn made. Avoids long switch case.
	turn(direction = "left"){
		if(this.state.isPlaced){
			let coordinates = this.getCoordinates();
			let newDirection = ''
			if(direction === "right"){
				newDirection = this.directions[this.directions.indexOf(this.state.direction)+1] || this.directions[0]
			}
			if(direction === "left"){
				newDirection = this.directions[this.directions.indexOf(this.state.direction)-1] || this.directions[3]
			}
			this.place(coordinates.x, coordinates.y, newDirection)

			//console.log('facing ' + newDirection)
		}
	}

	//Reports on your current location.
	report(){
		let coordinates = this.getCoordinates();
		console.log(`Report: ${coordinates.x}, ${coordinates.y}, ${this.state.direction}`)
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