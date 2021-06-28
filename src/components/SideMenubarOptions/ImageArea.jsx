import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import { ImageListData } from './tempData';

const useStyles = makeStyles({
	gridList: {
		width: 'calc(100% + 4px)',
		height: '100%',
	},
});

const ImageArea = () => {
	const classes = useStyles();
	const [state, setstate] = useState([]);

	useEffect(() => {
		setstate(ImageListData);
	}, []);

	const handelDragStart = (e, tile) => {
		e.dataTransfer.setData(
			'data',
			JSON.stringify({
				type: 'image',
				value: tile,
			})
		);
	};

	return (
		<div className='w-100'>
			<GridList cellHeight={100} className={classes.gridList} spacing={8}>
				<GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
					<ListSubheader component='div' style={{ color: 'white' }}>
						Images
					</ListSubheader>
				</GridListTile>
				{state &&
					state.map((tile, index) => (
						<GridListTile key={'list' + index}>
							<img
								src={tile.small}
								alt=''
								onDragStart={(e) => {
									handelDragStart(e, tile);
								}}
							/>
						</GridListTile>
					))}
			</GridList>
		</div>
	);
};

export default ImageArea;
