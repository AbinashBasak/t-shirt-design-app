import { useState, useEffect } from 'react';

import InputSlider from '../Form/Slider';
import Grid from '@material-ui/core/Grid';

import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { BiArrowToBottom, BiDownArrowAlt, BiArrowToTop, BiUpArrowAlt, BiRotateLeft, BiRotateRight } from 'react-icons/bi';

import { fabric } from 'fabric';

import './styles.css';

const fabricFilter = fabric.Image.filters;

const ImageControllers = ({ canvas, filters }) => {
	// all data
	const [state, setState] = useState({
		obj: null,
		opacity: 100,
		exposure: 0,
		brightness: 0,
		contrast: 0,
		saturation: 0,
		hue: 0,
		noise: 0,
		blur: 0,
		effect: 0,
	});

	// set value of selected item
	useEffect(() => {
		if (!canvas) return;

		const activeObj = canvas.getActiveObject();
		const data = activeObj.filters;
		if (activeObj.get('type') !== 'image') return;

		let obj = {
			obj: activeObj,
			opacity: activeObj ? activeObj.opacity * 100 : 100,
			exposure: data[1] ? parseFloat(data[1].opacity).toFixed(2) : 1,
			brightness: data[2] ? parseFloat(data[2].brightness).toFixed(2) : 0.0,
			contrast: data[3] ? parseFloat(data[3].contrast).toFixed(2) : 0.0,
			saturation: data[4] ? parseFloat(data[4].saturation).toFixed(2) : 0.0,
			hue: data[5] ? parseFloat(data[5].rotation).toFixed(2) : 0.0,
			noise: data[6] ? parseFloat(data[6].noise).toFixed(2) : 0.0,
			blur: data[7] ? parseFloat(data[7].blur).toFixed(2) : 0.0,
		};
		for (let i = 8; i < 17; i++) {
			if (data[i]) {
				obj.effect = i;
				break;
			}
		}
		if (!obj.effect) {
			obj.effect = 0;
		}

		setState(obj);
	}, [filters, canvas]);

	// apply filters on Image
	const applyFilterOnCanvas = async (name, val, index, filterName) => {
		try {
			if (state.obj.filters[index]) {
				state.obj.filters[index][name] = val;
			} else {
				state.obj.filters[index] = new fabricFilter[filterName]({ [name]: val });
			}
			state.obj.applyFilters();
			canvas.requestRenderAll();
		} catch (error) {}
	};

	// change opacity of image
	const applyOpacityOnImageCanvas = async (name, val) => {
		try {
			state.obj.set(name, val);
			canvas.requestRenderAll();
		} catch (error) {}
	};

	// handel imput change
	const handleInputChange = (name, val) => {
		setState((prevState) => ({ ...prevState, ...{ [name]: val } }));
		switch (name) {
			case 'opacity':
				applyOpacityOnImageCanvas('opacity', val / 100);
				break;
			case 'brightness':
				applyFilterOnCanvas(name, val, 2, 'Brightness');
				break;
			case 'contrast':
				applyFilterOnCanvas(name, val, 3, 'Contrast');
				break;
			case 'saturation':
				applyFilterOnCanvas(name, val, 4, 'Saturation');
				break;
			case 'hue':
				applyFilterOnCanvas('rotation', val, 5, 'HueRotation');
				break;
			case 'noise':
				applyFilterOnCanvas(name, val, 6, 'Noise');
				break;
			case 'blur':
				applyFilterOnCanvas(name, val, 7, 'Blur');
				break;
			default:
				break;
		}
	};

	// apply iamge effect =>
	const applyImageEffect = (index, name) => {
		try {
			setState((prevState) => ({ ...prevState, ...{ effect: index } }));

			for (let i = 8; i < 17; i++) {
				state.obj.filters[i] = false;
			}

			index !== 0 && (state.obj.filters[index] = new fabricFilter[name]());
			state.obj.applyFilters();
			canvas.requestRenderAll();
		} catch (error) {}
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
			<div className='center py-2 pl-3'>
				<Grid container spacing={2} className='effect-container'>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 0 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(0, '')}
									alt='original'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 8 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(8, 'Grayscale')}
									alt='grayscale'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 9 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(9, 'Invert')}
									alt='invert'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 10 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(10, 'Sepia')}
									alt='sepia'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 11 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(11, 'BlackWhite')}
									alt='blackwhite'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 12 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(12, 'Brownie')}
									alt='brownie'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 13 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(13, 'Vintage')}
									alt='vintage'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 14 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(14, 'Kodachrome')}
									alt='kodachrome'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
						<Grid item xs={4} className={state.effect === 15 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(15, 'Technicolor')}
									alt='technicolor'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={4} className={state.effect === 16 ? 'active-img-select-box' : ''}>
							<div className='h-100 w-100 overflow-hidden'>
								<img
									onClick={() => applyImageEffect(16, 'Polaroid')}
									alt='polaroid'
									src='https://www.iucn.org/sites/dev/files/styles/media_thumbnail/public/content/images/2019/western_tien-shan_sayram-ugam_state_national_nature_park_uzbekistan_c_elena_osipova_small.jpg?itok=iV9mOdTi'
									width='100%'
									height='100%'
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
						<InputSlider
							value={state.opacity}
							name='Opacity'
							onChange={(e, val) => handleInputChange('opacity', typeof val === 'number' ? val : 0)}
							aria-labelledby='input-slider'
							min={0}
							max={100}
						/>
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
						<InputSlider
							value={state.brightness}
							onChange={(e, val) => handleInputChange('brightness', typeof val === 'number' ? val : 0)}
							aria-labelledby='input-slider'
							min={-1}
							step={0.01}
							max={1}
						/>
					</div>
					<span className='subtitle ml-2'>{state.brightness}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Contrast</label>
					<div className='flex-1 mr-2'>
						<InputSlider
							value={state.contrast}
							onChange={(e, val) => handleInputChange('contrast', typeof val === 'number' ? val : 0)}
							aria-labelledby='input-slider'
							min={-1}
							max={1}
							step={0.01}
						/>
					</div>
					<span className='subtitle ml-2'>{state.contrast}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Saturation</label>
					<div className='flex-1 mr-2'>
						<InputSlider
							value={state.saturation}
							onChange={(e, val) => handleInputChange('saturation', typeof val === 'number' ? val : 0)}
							aria-labelledby='input-slider'
							min={-1}
							max={1}
							step={0.01}
						/>
					</div>
					<span className='subtitle ml-2'>{state.saturation}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Hue</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.hue} onChange={(e, val) => handleInputChange('hue', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' min={-2} max={2} step={0.02} />
					</div>
					<span className='subtitle ml-2'>{state.hue}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Noise</label>
					<div className='flex-1 mr-2'>
						<InputSlider value={state.noise} onChange={(e, val) => handleInputChange('noise', typeof val === 'number' ? val : 0)} aria-labelledby='input-slider' min={0} max={100} />
					</div>
					<span className='subtitle ml-2'>{state.noise}</span>
				</li>
				<li className='range-controller d-flex py-1 pl-3 pr-2'>
					<label>Blur</label>
					<div className='flex-1 mr-2'>
						<InputSlider
							value={state.blur}
							onChange={(e, val) => handleInputChange('blur', typeof val === 'number' ? val : 0)}
							aria-labelledby='input-slider'
							min={0}
							max={1}
							step={0.01}
						/>
					</div>
					<span className='subtitle ml-2'>{state.blur}</span>
				</li>
			</ul>
		</div>
	);
};

export default ImageControllers;
