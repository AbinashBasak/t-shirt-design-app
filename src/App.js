import './App.css';

import SideMenubar from './components/SideMenubar';
import SideMenubarOptions from './components/SideMenubarOptions';
import Controller from './components/controllers';
import Canvas from './components/Canvas';

import { FiDownload } from 'react-icons/fi';

function App() {
	return (
		<div style={{ height: '100vh' }} className='d-flex'>
			<div className='d-flex flex-1'>
				<SideMenubar />
				<div className='d-flex' style={{ width: 'calc(100vw - 4.5rem)' }}>
					<SideMenubarOptions />
					<div className='d-flex flex-column bg-secondary flex-1'>
						<div className='d-flex justify-content-end w-100 bg-primary' style={{ height: '2.8rem' }}>
							<div className='px-5 d-flex justify-content-center align-items-center'>
								<div className='btn-icon' onClick={() => console.log('hi')}>
									<FiDownload size={21} />
								</div>
								<div className='btn-icon'>
									<FiDownload />
								</div>
							</div>
						</div>
						<div className='bg-light d-flex flex-1' style={{ height: 'calc(100vh - 2.8rem)' }}>
							<div className='bg-light overflow-auto center' style={{ height: '100%', width: 'calc(100vw - 40.5rem)' }}>
								<div className='overflow-auto p-0 m-0' style={{ maxWidth: '100%', maxHeight: '100%' }}>
									<Canvas />
								</div>
							</div>
							<Controller />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
