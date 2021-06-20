import { activeEditOptionsSection } from '../actionsTypes';

export function activeImage() {
	return { type: 'set', val: activeEditOptionsSection.image };
}

export function activeText() {
	return { type: 'set', val: activeEditOptionsSection.text };
}

export function deactive() {
	return { type: 'set', val: activeEditOptionsSection.empty };
}
