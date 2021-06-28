import { activeDrawAction } from '../actionsTypes';

function drawImage(satte) {
	return { type: activeDrawAction.image, val: satte };
}

function drawText(satte) {
	return { type: activeDrawAction.text, val: satte };
}

function cleanDrawState() {
	return { type: activeDrawAction.empty, val: '' };
}

const exportObj = {
	drawImage,
	drawText,
	cleanDrawState,
};

export default exportObj;
