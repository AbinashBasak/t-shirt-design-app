const UploadImageArea = () => {
	return (
		<div className='w-100'>
			<p className='title text-white container-title px-3 pt-3 mb-2'>Upload Images</p>
			<div className='px-3 py-2 w-100 upload-btn pt-0'>
				<input type='file' id='listenLocalImageUploadInput' hidden onChange={(e) => console.log(e)} />
				<label htmlFor='listenLocalImageUploadInput' className='btn btn-sm w-100'>
					No file chosen
				</label>
			</div>
		</div>
	);
};

export default UploadImageArea;
