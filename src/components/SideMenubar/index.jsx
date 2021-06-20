import { IoTextOutline } from 'react-icons/io5';
import './styles.css';

const SideMenubar = () => {
	return (
		<div className='d-flex flex-column flex-shrink-0 menu-pabel' style={{ width: '4.5rem', background: 'black' }}>
			<ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
				<li className='nav-item' data-active-box='image-container'>
					<div className='nav-link p-3 text-light cursor-pointer'>
						<i className='fas fa-images fs-20'></i>
						<p className='subtitle1 p-0 m-0'>Image</p>
					</div>
				</li>
				<li className='nav-item' data-active-box='text-container'>
					<div className='nav-link p-3 text-light cursor-pointer'>
						<IoTextOutline size={24} />
						<p className='subtitle1 p-0 m-0'>Text</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default SideMenubar;
