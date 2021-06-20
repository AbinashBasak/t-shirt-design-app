import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 45,
		height: 21,
		padding: 0,
		display: 'flex',
	},
	switchBase: {
		padding: 2,
		color: 'white',
		'&$checked': {
			transform: 'translateX(24px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				backgroundColor: 'rgba(0,255,0,0.8)',
				borderColor: 'tranparent',
			},
		},
	},
	thumb: {
		width: 16,
		height: 16,
		boxShadow: 'none',
	},
	track: {
		borderWidth: 0,
		borderRadius: 20 / 2,
		opacity: 1,
		backgroundColor: '#343a40',
	},
	checked: {},
}))(Switch);

export default AntSwitch;
