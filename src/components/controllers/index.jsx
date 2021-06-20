import { useState } from 'react';

import InputSlider from '../Form/Slider';
import OutlineBox from '../Form/Outline';
import ShadowBox from '../Form/Shadow';

import Grid from '@material-ui/core/Grid';

import { BiRotateLeft, BiRotateRight } from 'react-icons/bi';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { BiArrowToBottom, BiDownArrowAlt, BiArrowToTop, BiUpArrowAlt } from 'react-icons/bi';
import './styles.css';

const TextControllers = () => {
	const [state, setState] = useState({
		opacity: 50,
		exposure: 50,
		birghtness: 50,
		contrast: 50,
		saturation: 50,
		hue: 50,
		noise: 50,
		blur: 50,
		effect: 'original',
	});

	const handleInputChange = (name, val) => {
		setState((prevState) => ({ ...prevState, ...{ [name]: val } }));
	};

	return (
		<div>
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
							<InputSlider value={state.opacity} name='Opacity' onChange={(e, val) => handleInputChange('opacity', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
						</div>
						<span className='subtitle ml-2'>{state.opacity}</span>
					</li>
					<li className='py-1 px-3'>
						<OutlineBox />
						<ShadowBox />
					</li>
				</ul>
			</div>

			<div className='controller-header-section mt-3 mb-2'>Adjustment</div>
		</div>
	);
};

const ImageControllers = () => {
	const [state, setState] = useState({
		opacity: 50,
		exposure: 50,
		birghtness: 50,
		contrast: 50,
		saturation: 50,
		hue: 50,
		noise: 50,
		blur: 50,
		effect: 'original',
	});

	const handleInputChange = (name, val) => {
		setState((prevState) => ({ ...prevState, ...{ [name]: val } }));
	};

	return (
		<div>
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
			<div className='center py-2 pl-3'>
				<Grid container spacing={2} className='effect-container'>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 'original' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'original')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'grayscale' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'grayscale')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'invert' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'invert')}
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 'sepia' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'sepia')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'blackwhite' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'blackwhite')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'brownie' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'brownie')}
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 'vintage' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'vintage')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'kodachrome' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'kodachrome')}
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 'technicolor' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'technicolor')}
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 'polaroid' ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
									onClick={(e) => handleInputChange('effect', 'polaroid')}
								/>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</div>

			<div className='controller-header-section mt-3 mb-2'>Adjustment</div>
			<ul>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Opactiy</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.opacity} name='Opacity' onChange={(e, val) => handleInputChange('opacity', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.opacity}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Exposure</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.exposure} onChange={(e, val) => handleInputChange('exposure', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.exposure}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Brightness</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.birghtness} onChange={(e, val) => handleInputChange('birghtness', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.birghtness}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Contrast</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.contrast} onChange={(e, val) => handleInputChange('contrast', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.contrast}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Saturation</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.saturation} onChange={(e, val) => handleInputChange('saturation', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.saturation}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Hue</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.hue} onChange={(e, val) => handleInputChange('hue', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.hue}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Noise</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.noise} onChange={(e, val) => handleInputChange('noise', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.noise}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Blur</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.blur} onChange={(e, val) => handleInputChange('blur', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' />
					</div>
					<span className='subtitle ml-2'>{state.blur}</span>
				</li>
			</ul>
		</div>
	);
};

const Controllers = () => {
	return <TextControllers />;
};

export default Controllers;
