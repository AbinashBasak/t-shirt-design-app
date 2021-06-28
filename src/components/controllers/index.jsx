import { useState, useEffect } from 'react';

import TextControllers from './TextControllers';
import ImageControllers from './ImageControllers';

import { connect } from 'react-redux';

import './styles.css';

const Controllers = ({ canvas }) => {
	const [activeEditingTool, setActiveEditingTool] = useState('');
	const [activeObjectFilter, setActiveObjectFilter] = useState(null);

	const handelSelectionOnCanvas = (e) => {
		setActiveEditingTool(e.target?.get('type'));
		console.log(e.target?.get('type'));

		if (e.selected) {
			setActiveObjectFilter(e.selected);
		} else {
			setActiveObjectFilter(null);
		}
	};

	useEffect(() => {
		if (!canvas) {
			return;
		}

		canvas.on('selection:created', handelSelectionOnCanvas);
		canvas.on('selection:updated', handelSelectionOnCanvas);
		canvas.on('selection:cleared', handelSelectionOnCanvas);

		return () => {
			canvas.off('selection:created', handelSelectionOnCanvas);
			canvas.off('selection:updated', handelSelectionOnCanvas);
			canvas.off('selection:cleared', handelSelectionOnCanvas);
		};
	}, [canvas]);

	if (activeEditingTool === 'image')
		return (
			<div style={{ width: '18rem' }} className='bg-dark overflow-x-hidden overflow-y-auto'>
				<ImageControllers canvas={canvas} filters={activeObjectFilter} />
			</div>
		);
	if (activeEditingTool === 'i-text')
		return (
			<div style={{ width: '18rem' }} className='bg-dark overflow-x-hidden overflow-y-auto'>
				<TextControllers canvas={canvas} filters={activeObjectFilter} />
			</div>
		);

	return <></>;
};

const mapStateToProps = ({ canvas }) => {
	return { canvas };
};

export default connect(mapStateToProps)(Controllers);
