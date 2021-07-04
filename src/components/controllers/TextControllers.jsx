import { useState, useEffect, useRef } from 'react';

import InputSlider from '../Form/Slider';
import OutlineBox from '../Form/Outline';
import ShadowBox from '../Form/Shadow';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { BiArrowToBottom, BiDownArrowAlt, BiArrowToTop, BiUpArrowAlt, BiUnderline, BiRotateLeft, BiRotateRight } from 'react-icons/bi';
import { BsTextLeft, BsTextRight, BsTextCenter, BsTypeBold, BsTypeItalic } from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0 0 0 15px',
		flex: 1,
		color: 'white',
		marginTop: '5px',
		'& .MuiInput-root ': {
			color: 'white',
			fontSize: '11px',
		},
	},
	select: {
		color: 'white',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const TextControllers = ({ canvas, filters }) => {
	// all states
	const classes = useStyles();
	const textColorRef = useRef(null);
	const textBackgroundColorRef = useRef(null);
	const fontSizes = [...Array(60).keys(), 'Times New Roman'];
	const [textOutline, setTextOutline] = useState({ active: false, color: '#000000', width: 0 });
	const [textShadow, setTextShadow] = useState({ active: false, color: '#000000', x: 5, y: 5, blur: 5 });
	const [state, setState] = useState({
		textAlign: 'left',
		fontWeight: 'normal',
		italic: false,
		underline: false,
		fontSize: 14,
		fontFamily: '',
		opacity: 100,
	});

	// set value of selected
	useEffect(() => {
		if (!canvas || !filters) return;

		const activeObj = canvas.getActiveObject();
		if (activeObj.get('type') !== 'i-text') return;

		setState({
			textAlign: activeObj.textAlign ? activeObj.textAlign : 'left',
			fontWeight: activeObj.fontWeight ? activeObj.fontWeight : 'normal',
			italic: activeObj.italic ? activeObj.italic : false,
			underline: activeObj.underline ? activeObj.underline : false,
			fontSize: activeObj.fontSize,
			fontFamily: activeObj.fontFamily,
			opacity: 100,
		});

		setTextOutline({
			active: activeObj.strokeWidth !== undefined && activeObj.strokeWidth !== 0,
			color: activeObj.stroke || '#000000',
			width: activeObj.strokeWidth || 0,
		});

		const shadow = activeObj.shadow;
		if (shadow) {
			setTextShadow({ active: true, color: '#000000', x: shadow.offsetX, y: shadow.offsetY, blur: shadow.blur });
		} else {
			setTextShadow({ active: false, color: '#000000', x: 5, y: 5, blur: 5 });
		}

		textColorRef.current.value = activeObj.fill;
		textBackgroundColorRef.current.value = activeObj.textBackgroundColor ? activeObj.textBackgroundColor : '#000000';
	}, [filters, canvas]);

	// apply filer on selected text
	const applyFilterOnCanvas = async (name, val) => {
		try {
			canvas.getActiveObject().set(name, val);
			canvas.requestRenderAll();
		} catch (error) {}
	};

	// handel all imouts listner
	const updateStateAndApplyFilter = async (name, val) => {
		setState((prevState) => ({ ...prevState, ...{ [name]: val } }));
		applyFilterOnCanvas(name, val);
	};

	const applyFlip = (direction) => {
		if (!canvas.getActiveObject()) return;
		const obj = canvas.getActiveObject();
		obj.set(`flip${direction}`, !obj[`flip${direction}`]);
		canvas.requestRenderAll();
	};

	const applyRotation = (degree) => {
		if (!canvas.getActiveObject()) return;
		const obj = canvas.getActiveObject();
		obj.set('angle', obj.angle + degree);
		canvas.requestRenderAll();
	};

	const handelBringForward = () => {
		if (!canvas.getActiveObject()) return;
		canvas.bringForward(canvas.getActiveObject());
	};
	const handelBringTop = () => {
		if (!canvas.getActiveObject()) return;
		canvas.bringToFront(canvas.getActiveObject());
	};
	const handelSendBackward = () => {
		if (!canvas.getActiveObject()) return;
		canvas.sendBackwards(canvas.getActiveObject());
	};
	const handelSendBottom = () => {
		if (!canvas.getActiveObject()) return;
		canvas.sendToBack(canvas.getActiveObject());
	};

	return (
		<div>
			<div className='controller-header-section'>Font</div>
			<div className='py-2 px-3 controller-header-section2'>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='flex-1 mr-2 btn-group'>
						<button
							className={'btn-custom' + (state.textAlign === 'left' ? ' active' : '')}
							data-toggle='tooltip'
							data-placement='bottom'
							title='Align left'
							onClick={(e) => updateStateAndApplyFilter('textAlign', 'left')}
						>
							<BsTextLeft />
						</button>
						<button
							className={'btn-custom' + (state.textAlign === 'center' ? ' active' : '')}
							data-toggle='tooltip'
							data-placement='bottom'
							title='Align center'
							onClick={(e) => updateStateAndApplyFilter('textAlign', 'center')}
						>
							<BsTextCenter />
						</button>
						<button
							className={'btn-custom' + (state.textAlign === 'right' ? ' active' : '')}
							data-toggle='tooltip'
							data-placement='bottom'
							title='Align right'
							onClick={(e) => updateStateAndApplyFilter('textAlign', 'right')}
						>
							<BsTextRight />
						</button>
					</div>
					<div className='flex-1 btn-group'>
						<button
							data-toggle='tooltip'
							data-placement='bottom'
							title='Bring Forward'
							className={'btn-custom' + (state.fontWeight !== 'normal' ? ' active' : '')}
							onClick={(e) => updateStateAndApplyFilter('fontWeight', state.fontWeight === 'normal' ? ' bold' : 'normal')}
						>
							<BsTypeBold />
						</button>
						<button
							data-toggle='tooltip'
							data-placement='bottom'
							title='Bring top'
							className={'btn-custom' + (state.italic ? ' active' : '')}
							onClick={(e) => updateStateAndApplyFilter('italic', !state.italic)}
						>
							<BsTypeItalic />
						</button>
						<button
							data-toggle='tooltip'
							data-placement='bottom'
							title='Send Backward'
							className={'btn-custom' + (state.underline ? ' active' : '')}
							onClick={(e) => updateStateAndApplyFilter('underline', !state.underline)}
						>
							<BiUnderline />
						</button>
					</div>
				</div>
				<div className='w-100 px-1 py-2 d-flex justify-content-between'>
					<p>Font size</p>
					<FormControl className={classes.root}>
						<Select labelId='demo-simple-select-label' value={state.fontSize} onChange={(e) => updateStateAndApplyFilter('fontSize', e.target.value)}>
							{fontSizes.map((e) => (
								<MenuItem value={e} key={'font-size-list-items-' + e}>
									{e}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='w-100 px-1 py-2 d-flex justify-content-between'>
					<p>Font Family</p>
					<FormControl className={classes.root}>
						<Select labelId='demo-simple-select-label' value={state.fontFamily} onChange={(e) => updateStateAndApplyFilter('fontFamily', e.target.value)}>
							{fontSizes.map((e) => (
								<MenuItem value={e} key={'font-list-items-' + e}>
									{e}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<ul>
					<li className='range-controller d-flex pl-1'>
						<label>Color</label>
						<div className='flex-1 mr-2'>
							<input type='color' ref={textColorRef} onChange={(e) => applyFilterOnCanvas('fill', e.target.value)} />
						</div>
					</li>
					<li className='range-controller d-flex pl-1'>
						<label>Background </label>
						<div className='flex-1 mr-2'>
							<input type='color' ref={textBackgroundColorRef} onChange={(e) => applyFilterOnCanvas('textBackgroundColor', e.target.value)} />
						</div>
					</li>
				</ul>
			</div>

			<div className='controller-header-section'>Property</div>
			<div className='py-2 px-3 controller-header-section2'>
				<p>Rotate & Flip</p>
				<div className='d-flex justify-content-between'>
					<div className='flex-1 mr-2 btn-group'>
						<button className='btn-custom' onClick={() => applyRotation(-90)}>
							<BiRotateLeft />
						</button>
						<button className='btn-custom' onClick={() => applyRotation(90)}>
							<BiRotateRight />
						</button>
					</div>
					<div className='flex-1 btn-group'>
						<button className='btn-custom' onClick={() => applyFlip('X')}>
							<CgEditFlipH />
						</button>
						<button className='btn-custom' onClick={() => applyFlip('Y')}>
							<CgEditFlipV />
						</button>
					</div>
				</div>
			</div>
			<div className='py-2 px-3 controller-header-section2'>
				<p>Layer</p>
				<div className='d-flex justify-content-between'>
					<div className='flex-1 mr-2 btn-group'>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Bring Forward' onClick={handelBringForward}>
							<BiUpArrowAlt />
						</button>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Bring top' onClick={handelBringTop}>
							<BiArrowToTop />
						</button>
					</div>
					<div className='flex-1 btn-group'>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Send Backward' onClick={handelSendBackward}>
							<BiDownArrowAlt />
						</button>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Send Bottom' onClick={handelSendBottom}>
							<BiArrowToBottom />
						</button>
					</div>
				</div>
			</div>

			<div className='controller-header-section mt-3'>Effect</div>
			<div>
				<ul>
					<li className='range-controller d-flex py-1 pl-3 pr-2'>
						<label>Opactiy</label>
						<div className='flex-1 mr-2'>
							<InputSlider value={state.opacity} name='Opacity' onChange={(e, val) => updateStateAndApplyFilter('opacity', parseInt(val))} aria-labelledby='input-slider' />
						</div>
						<span className='subtitle ml-2'>{state.opacity}</span>
					</li>
					<li className='py-1 px-3'>
						<OutlineBox applyFilterOnCanvas={applyFilterOnCanvas} data={textOutline} />
						<ShadowBox applyFilterOnCanvas={applyFilterOnCanvas} data={textShadow} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TextControllers;
