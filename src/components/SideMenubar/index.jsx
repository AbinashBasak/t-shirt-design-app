import { IoTextOutline } from 'react-icons/io5';
import './styles.css';

import { setsidebar } from 'store/action/activeSidebarAction';
import { activeSidebarTypesList } from 'utils/types';
import { connect } from 'react-redux';

const SideMenubar = ({ setActiveSidebarItem }) => {
	return (
		<div className='d-flex flex-column flex-shrink-0 menu-pabel' style={{ width: '4.5rem', background: 'black' }}>
			<ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
				<li className='nav-item' data-active-box='image-container'>
					<div
						className='nav-link p-3 text-light cursor-pointer'
						onClick={(e) => {
							setActiveSidebarItem(activeSidebarTypesList.image);
						}}
					>
						<i className='fas fa-images fs-20'></i>
						<p className='subtitle1 p-0 m-0'>Image</p>
					</div>
				</li>
				<li className='nav-item' data-active-box='text-container'>
					<div
						className='nav-link p-3 text-light cursor-pointer'
						onClick={(e) => {
							setActiveSidebarItem(activeSidebarTypesList.text);
						}}
					>
						<IoTextOutline size={24} />
						<p className='subtitle1 p-0 m-0'>Text</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

const mapStateToProps = ({}) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveSidebarItem: (val) => dispatch(setsidebar(val)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenubar);
