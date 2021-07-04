import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import Switch from './Switch';
import InputSlider from './Slider';

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#6d7c8a54',
		borderRadius: '6px',
		boxShadow: 'none',
		padding: '2px 4px',
	},
	container: {
		padding: '5px 0',
	},
	title: {
		marginBottom: 0,
		color: 'white',
		fontSize: '13px',
		width: '45px',
	},
	subtitle: {
		color: 'white',
		fontSize: '13px',
		paddingLeft: '5px',
	},
}));

const Shadow = ({ applyFilterOnCanvas, data }) => {
	const classes = useStyles();
	const colorRef = useRef(null);
	const [state, setstate] = useState({ active: true, x: 5, y: 5, blur: 0 });

	useEffect(() => {
		if (!colorRef.current) return;
		setstate(data);
		colorRef.current.value = data.color;
	}, [data]);

	const applyFilter = (name = '', val = '') => {
		const currentState = { ...state, [name]: val };
		applyFilterOnCanvas('shadow', `${colorRef.current.value} ${currentState.x}px ${currentState.y}px ${currentState.blur}px`);
	};

	const updateStateAndApplyFilter = (name, value) => {
		if (name === 'active' && value === false) {
			applyFilterOnCanvas('shadow', undefined);
		} else {
			applyFilter(name, value);
		}

		setstate((prev) => {
			return { ...prev, [name]: value };
		});
	};

	return (
		<Card className={classes.root}>
			<CardActions>
				<p className={classes.title}>Shadow</p>
				<Switch checked={state.active} onChange={(e) => updateStateAndApplyFilter('active', e.target.checked)} />
			</CardActions>
			<Collapse in={state.active} timeout='auto'>
				<CardActions>
					<p className={classes.title}>Color</p>
					<input type='color' ref={colorRef} onChange={applyFilter} />
				</CardActions>
				<CardActions>
					<p className={classes.title}>offsetX</p>
					<div className='flex-1 center'>
						<InputSlider value={state.x} name='x' min={-20} max={20} onChange={(e, val) => updateStateAndApplyFilter('x', val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{state.x}</span>
				</CardActions>
				<CardActions>
					<p className={classes.title}>offsetY</p>
					<div className='flex-1 center'>
						<InputSlider value={state.y} name='y' min={-20} max={20} onChange={(e, val) => updateStateAndApplyFilter('y', val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{state.y}</span>
				</CardActions>
				<CardActions>
					<p className={classes.title}>Blur</p>
					<div className='flex-1 center'>
						<InputSlider value={state.blur} name='blur' max={30} onChange={(e, val) => updateStateAndApplyFilter('blur', val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{state.blur}</span>
				</CardActions>
			</Collapse>
		</Card>
	);
};

export default Shadow;
