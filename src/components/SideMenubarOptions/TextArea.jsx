import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import { TextListData } from './tempData';

const useStyles = makeStyles({
	gridList: {
		width: 'calc(100% + 4px)',
		height: '100%',
		padding: '0 4px',
	},
	textHeaderWrapper: {
		color: 'white',
		lineHeight: '1rem',
		padding: '0.9rem 0.7rem 0.5rem',
		fontSize: '1rem',
	},
	textWrapper: {
		width: '100%',
		background: 'rgba(0,0,0,0.2)',
		color: 'white',
		padding: '0.7rem 1rem',
		borderRadius: '8px',
	},
});

const ImageArea = () => {
	const classes = useStyles();
	const [state, setstate] = useState([]);

	useEffect(() => {
		if (!setstate) return;
		setstate(TextListData);
	}, [setstate]);

	const handelDragStart = (e, tile) => {
		e.dataTransfer.setData(
			'data',
			JSON.stringify({
				type: 'text',
				value: tile,
			})
		);
	};

	return (
		<div className='w-100'>
			<GridList cellHeight={100} className={classes.gridList} spacing={8}>
				<GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
					<ListSubheader component='div' className={classes.textHeaderWrapper}>
						Text
					</ListSubheader>
				</GridListTile>
				{state.map((tile) => (
					<GridListTile key={tile.id} cols={tile.fullWidth ? 2 : 1} style={{ height: 'auto' }}>
						<div
							className={classes.textWrapper}
							style={{ fontSize: tile.fontSize }}
							onDragStart={(e) => {
								handelDragStart(e, tile);
							}}
							draggable
						>
							{tile.text}
						</div>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
};

export default ImageArea;
