import { useEffect } from 'react';
import { fabric } from 'fabric';

import { connect } from 'react-redux';
import { setcanvas } from '../../store/action/canvas';

const Canvas = ({ setCanvas, canvas }) => {
	const addImageOnCanvas = (canvas, img, posX, posY) => {
		const pugImg = new Image();
		pugImg.onload = function (img) {
			const scaleX = 300 / pugImg.width;
			const scaleY = 300 / pugImg.height;
			const pug = new fabric.Image(pugImg, {
				left: posX,
				top: posY,
				scaleX,
				scaleY,
				zIndex: 1,
				originX: 'center',
				originY: 'center',
			});
			canvas.add(pug);
			canvas.requestRenderAll();
		};
		pugImg.src = img.original;
		pugImg.crossOrigin = 'anonymous';
	};

	const addTextOnCanvas = (canvas, textData, posX, posY) => {
		const text = new fabric.IText(textData.text, {
			fontFamily: textData.fontFamily,
			fontSize: textData.fontSize,
			top: posY,
			left: posX,
			stroke: 'black',
			zIndex: 1,
		});
		canvas.add(text);
		canvas.requestRenderAll();
	};

	useEffect(() => {
		const handelDrop = (e) => {
			try {
				let data = JSON.parse(e.e.dataTransfer.getData('data'));
				switch (data.type) {
					case 'image':
						addImageOnCanvas(canvas, data.value, e.e.layerX, e.e.layerY);
						break;
					case 'text':
						addTextOnCanvas(canvas, data.value, e.e.layerX, e.e.layerY);
						break;
					default:
						return;
				}
			} catch (error) {}
		};

		fabric.Object.prototype.transparentCorners = false;
		const canvas = new fabric.Canvas('canvas', {
			height: 700,
			width: 1200,
			backgroundColor: 'white',
		});
		canvas.preserveObjectStacking = true;

		canvas.on('drop', handelDrop);
		setCanvas(canvas);

		return () => {
			canvas.off('drop', handelDrop);
		};
	}, []);

	return <canvas id='canvas' height='700px' width='1200px' style={{ border: '1px solid black' }} />;
};

const mapStateToProps = ({ canvas }) => {
	return { canvas };
};
const mapDispatchToProps = (dispatch) => {
	return {
		setCanvas: (canvas) => dispatch(setcanvas(canvas)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
