import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const InputSlider = withStyles({
	thumb: {
		height: 15,
		width: 15,
		backgroundColor: 'white',
		boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
		marginTop: -6.5,
		marginLeft: -6.5,
		'&:hover, &$active': {
			backgroundColor: '#3baece',
			boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: 'white',
				boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
			},
		},
	},
	active: {},
	track: {
		height: 1.6,
		backgroundColor: '#3baece',
	},
	rail: {
		height: 1.6,
		opacity: 0.3,
		backgroundColor: '#3baece',
	},
})(Slider);
export default InputSlider;
