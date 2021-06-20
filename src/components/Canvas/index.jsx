import { useEffect } from 'react';
import { fabric } from 'fabric';

import { connect } from 'react-redux';
import { setcanvas } from '../../store/action/canvas';

const Canvas = ({ setCanvas }) => {
	useEffect(() => {
		setCanvas(
			new fabric.Canvas('canvas', {
				height: 700,
				width: 1200,
				backgroundColor: 'white',
			})
		);
	}, []);

	return <canvas id='canvas' height='700px' width='1200px' style={{ border: '1px solid black' }} />;
};

const mapStateToProps = ({}) => {
	return {};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setCanvas: (canvas) => dispatch(setcanvas(canvas)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
