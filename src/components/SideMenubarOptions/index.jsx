import { connect } from 'react-redux';

import ImageAreaList from './ImageArea';
import TextAreaList from './TextArea';
import UploadImageAreaList from './UploadImageArea';

import { activeSidebarTypesList } from 'utils/types';

import './styles.css';

const SideMenubarOptions = ({ ActiveSidebar }) => {
	if (ActiveSidebar === activeSidebarTypesList.text) {
		return (
			<div className='bg-dark container-wrapper' style={{ width: '18rem' }}>
				<TextAreaList />
			</div>
		);
	}

	if (ActiveSidebar === activeSidebarTypesList.upload_image) {
		return (
			<div className='bg-dark container-wrapper' style={{ width: '18rem' }}>
				<UploadImageAreaList />
			</div>
		);
	}

	return (
		<div className='bg-dark container-wrapper' style={{ width: '18rem' }}>
			<ImageAreaList />
		</div>
	);
};

const mapStateToProps = ({ ActiveSidebar }) => {
	return { ActiveSidebar };
};

export default connect(mapStateToProps)(SideMenubarOptions);
