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
		marginBottom: theme.spacing(1),
	},
	container: {
		padding: '5px 0',
	},
	title: {
		marginBottom: 0,
		color: 'white',
		fontSize: '13px',
		width: '40px',
	},
	subtitle: {
		color: 'white',
		fontSize: '13px',
		paddingLeft: '5px',
	},
}));

const Outline = ({ applyFilterOnCanvas, data }) => {
	const classes = useStyles();
	const colorRef = useRef(null);
	const [state, setstate] = useState({ active: false, width: 0 });

	useEffect(() => {
		if (!colorRef.current) return;
		setstate(data);
		colorRef.current.value = data.color;
	}, [data]);

	const updateStateAndApplyFilter = (name, value) => {
		if (name === 'active' && value) {
			applyFilterOnCanvas('strokeWidth', name === 'width' ? value : state.width);
			applyFilterOnCanvas('stroke', colorRef.current.value);
		} else if (name === 'width' && state.active) {
			applyFilterOnCanvas('strokeWidth', name === 'width' ? value : state.width);
		} else {
			applyFilterOnCanvas('strokeWidth', 0);
		}
		setstate((prev) => {
			return { ...prev, [name]: value };
		});
	};

	return (
		<Card className={classes.root}>
			<CardActions>
				<p className={classes.title}>Outline</p>
				<Switch checked={state.active} onChange={(e) => updateStateAndApplyFilter('active', e.target.checked)} />
			</CardActions>
			<Collapse in={state.active} timeout='auto'>
				<CardActions>
					<p className={classes.title}>Color</p>
					<input type='color' ref={colorRef} onChange={(e) => applyFilterOnCanvas('stroke', e.target.value)} />
				</CardActions>
				<CardActions>
					<p className={classes.title}>width</p>
					<div className='flex-1 center'>
						<InputSlider value={state.width} name='width' max={5} onChange={(e, val) => updateStateAndApplyFilter('width', val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{state.width}</span>
				</CardActions>
			</Collapse>
		</Card>
	);
};

export default Outline;
