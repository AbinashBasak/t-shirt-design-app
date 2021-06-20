import { useState } from 'react';
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

const Shadow = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(true);
	const [radius, setRadius] = useState(0);
	const [blur, setBlur] = useState(0);
	const [color, setColor] = useState('#000000');

	return (
		<Card className={classes.root}>
			<CardActions>
				<p className={classes.title}>Shadow</p>
				<Switch checked={expanded} onChange={(e) => setExpanded(e.target.checked)} />
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardActions>
					<p className={classes.title}>Color</p>
					<input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
				</CardActions>
				<CardActions>
					<p className={classes.title}>Radius</p>
					<div className='flex-1 center'>
						<InputSlider value={radius} name='width' onChange={(e, val) => setRadius(val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{radius}</span>
				</CardActions>
				<CardActions>
					<p className={classes.title}>Blur</p>
					<div className='flex-1 center'>
						<InputSlider value={blur} name='width' onChange={(e, val) => setBlur(val)} aria-labelledby='input-slider' />
					</div>
					<span className={classes.subtitle}>{blur}</span>
				</CardActions>
			</Collapse>
		</Card>
	);
};

export default Shadow;
