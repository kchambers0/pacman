import React from "react";

function Coordinate(props){
	let classes = "grid--row__coordinate"

	if(props.pacman){
		classes+=" pacman"
	}

	return (
		<div className={classes}>
			{props.x}, {props.y}
		</div>
	)
}

export default Coordinate