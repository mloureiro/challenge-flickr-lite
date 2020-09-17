export const el = (tag, attributes, children = null) => {
	const element = document.createElement(tag);

	if (attributes) {
		Object.keys(attributes).forEach((key) => {
			element.setAttribute(key, attributes[key]);
		});
	}

	if (!children) {
		return element;
	}

	const childrenList = Array.isArray(children) ? children : [children];

	childrenList.forEach((child) => {
		const isChildPrimitive = children !== Object(children);
		const node = isChildPrimitive ? document.createTextNode(children) : child;
		element.append(node);
	});

	return element;
};
