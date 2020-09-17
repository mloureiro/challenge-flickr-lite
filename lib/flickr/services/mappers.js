export const mapPhoto = ({ id, title, ownername, tags, ...imgs }) => ({
	id,
	title,
	author: ownername,
	tags: tags.split(' '),
	img: {
		tiny: {
			src: imgs.url_q,
			height: imgs.height_q,
			width: imgs.width_q,
		},
		small: {
			src: imgs.url_n,
			height: imgs.height_n,
			width: imgs.width_n,
		},
		medium: {
			src: imgs.url_z,
			height: imgs.height_z,
			width: imgs.width_z,
		},
		large: {
			src: imgs.url_b,
			height: imgs.height_b,
			width: imgs.width_b,
		},
		huge: {
			src: imgs.url_k,
			height: imgs.height_k,
			width: imgs.width_k,
		},
	},
});
