import React, { Component } from 'react';
import MapComp from './MapComp';

class MapNew extends Component {

	render() {
		return(
			<div>
				<MapComp
					google={this.props.google}
					mapValueFunc = {this.props.mapValueFunc.bind()}
					center={{lat: 20.9121088, lng: 70.3819001}}
					height='230px'  
					zoom={15}
				/>
			</div>
		);
	}
}

export default MapNew;
