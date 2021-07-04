import { FiDownload } from 'react-icons/fi';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';

import './style.css';

const Header = ({ canvas }) => {
	const copyItem = () => {
		const selectedobj = canvas.getActiveObject();
		selectedobj.clone((cloned) => {
			canvas.discardActiveObject();
			cloned.set({
				top: cloned.top + 10,
				left: cloned.left + 10,
				evented: true,
			});

			if (cloned.type === 'activeSelection') {
				cloned.canvas = canvas;
				cloned.forEachObject((obj) => canvas.add(obj));
				cloned.setCoords();
			} else {
				canvas.add(cloned);
			}
			canvas.setActiveObject(cloned);
			canvas.requestRenderAll();
		});
	};

	// delete item/items
	const deleteItem = () => {
		const activeObjs = canvas.getActiveObject();
		if (!activeObjs) return;

		if (!window.confirm('Are you sure, you want to delete selected items?')) return;

		if (activeObjs.type === 'activeSelection') {
			activeObjs.forEachObject(function (element) {
				canvas.remove(element);
			});
		} else {
			canvas.remove(activeObjs);
		}
		canvas.discardActiveObject();
		canvas.requestRenderAll();
	};

	const downloadCanvas = () => {
		const dataURL = canvas.toDataURL({
			width: canvas.width,
			height: canvas.height,
			left: 0,
			top: 0,
			format: 'png',
		});
		const link = document.createElement('a');
		link.download = 'image.png';
		link.href = dataURL;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className='d-flex justify-content-end w-100 header' style={{ height: '2.8rem' }}>
			<div className='px-5 d-flex justify-content-center align-items-center'>
				<div className='btn-icon' onClick={downloadCanvas}>
					<FiDownload size={21} />
				</div>
				<div className='btn-icon' onClick={copyItem}>
					<FileCopyIcon fontSize='small' />
				</div>
				<div className='btn-icon' onClick={deleteItem}>
					<DeleteIcon fontSize='small' />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ canvas }) => {
	return { canvas };
};

export default connect(mapStateToProps)(Header);
