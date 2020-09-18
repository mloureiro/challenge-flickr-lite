import { el } from 'lib/dom';
import { buttonComponent } from '~/ui/components/button';
import { spinnerComponent } from '~/ui/components/spinner';
import './loaderButton.css';

export const loaderButton = ({ onClick }, attributes = {}, children) => {
	const { element: spinner } = spinnerComponent({
		class: 'loaderButton--spinner',
	});

	const { element, ...actions } = buttonComponent(
		{ onClick },
		{
			...attributes,
			class: `loader-button ${attributes.class || ''}`,
		},
		[el('span', { class: 'loader-button--content' }, children), spinner],
	);

	return {
		element,
		...actions,
		setLoadingState(isLoading) {
			element.disabled = isLoading;
			if (isLoading) {
				element.classList.add('loading');
			} else {
				element.classList.remove('loading');
			}
		},
	};
};
