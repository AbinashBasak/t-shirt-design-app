import { useState } from 'react';

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
	const classes = useStyles();
	const fontSizes = [...Array(60).keys()];

	const [state, setState] = useState({
		textAlign: 'left',
		fontWeight: 'normal',
		italic: false,
		underline: false,
		fontSize: 14,
		fontFamily: '',
		opacity: 100,
		outline: false,
		shadow: false,
	});

	// handel all imouts listner
	const handleInputChange = async (name, val) => {
		setState((prevState) => ({ ...prevState, ...{ [name]: val } }));
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
							onClick={(e) => handleInputChange('textAlign', 'left')}
						>
							<BsTextLeft />
						</button>
						<button
							className={'btn-custom' + (state.textAlign === 'center' ? ' active' : '')}
							data-toggle='tooltip'
							data-placement='bottom'
							title='Align center'
							onClick={(e) => handleInputChange('textAlign', 'center')}
						>
							<BsTextCenter />
						</button>
						<button
							className={'btn-custom' + (state.textAlign === 'right' ? ' active' : '')}
							data-toggle='tooltip'
							data-placement='bottom'
							title='Align right'
							onClick={(e) => handleInputChange('textAlign', 'right')}
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
							onClick={(e) => handleInputChange('fontWeight', state.fontWeight === 'normal' ? ' bold' : 'normal')}
						>
							<BsTypeBold />
						</button>
						<button
							data-toggle='tooltip'
							data-placement='bottom'
							title='Bring top'
							className={'btn-custom' + (state.italic ? ' active' : '')}
							onClick={(e) => handleInputChange('italic', !state.italic)}
						>
							<BsTypeItalic />
						</button>
						<button
							data-toggle='tooltip'
							data-placement='bottom'
							title='Send Backward'
							className={'btn-custom' + (state.underline ? ' active' : '')}
							onClick={(e) => handleInputChange('underline', !state.underline)}
						>
							<BiUnderline />
						</button>
					</div>
				</div>
				<div className='w-100 px-1 py-2 d-flex justify-content-between'>
					<p>Font size</p>
					<FormControl className={classes.root}>
						<Select labelId='demo-simple-select-label' value={state.fontSize} onChange={(e) => handleInputChange('fontSize', e.target.value)}>
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
						<Select labelId='demo-simple-select-label' value={state.fontFamily} onChange={(e) => handleInputChange('fontFamily', e.target.value)}>
							{fontSizes.map((e) => (
								<MenuItem value={e} key={'font-list-items-' + e}>
									{e}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>

			<div className='controller-header-section'>Property</div>
			<div className='py-2 px-3 controller-header-section2'>
				<p>Rotate & Flip</p>
				<div className='d-flex justify-content-between'>
					<div className='flex-1 mr-2 btn-group'>
						<button className='btn-custom'>
							<BiRotateLeft />
						</button>
						<button className='btn-custom'>
							<BiRotateRight />
						</button>
					</div>
					<div className='flex-1 btn-group'>
						<button className='btn-custom'>
							<CgEditFlipH />
						</button>
						<button className='btn-custom'>
							<CgEditFlipV />
						</button>
					</div>
				</div>
			</div>
			<div className='py-2 px-3 controller-header-section2'>
				<p>Layer</p>
				<div className='d-flex justify-content-between'>
					<div className='flex-1 mr-2 btn-group'>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Bring Forward'>
							<BiUpArrowAlt />
						</button>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Bring top'>
							<BiArrowToTop />
						</button>
					</div>
					<div className='flex-1 btn-group'>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Send Backward'>
							<BiDownArrowAlt />
						</button>
						<button className='btn-custom' data-toggle='tooltip' data-placement='bottom' title='Send Bottom'>
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
							<InputSlider value={state.opacity} name='Opacity' onChange={(e, val) => handleInputChange('opacity', parseInt(val))} aria-labelledby='input-slider' />
						</div>
						<span className='subtitle ml-2'>{state.opacity}</span>
					</li>
					<li className='py-1 px-3'>
						<OutlineBox />
						<ShadowBox />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TextControllers;
