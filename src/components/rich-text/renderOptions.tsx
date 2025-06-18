import { BLOCKS } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

export const renderOptions: Options = {
	renderNode: {
	  [BLOCKS.EMBEDDED_ENTRY]: (node) => {
		const fields = node?.data?.target?.fields;
		if (!fields || !fields.image) return null;
  
		const image = fields.image;
		const file = image.fields.file;
		const url = file.url.startsWith( '//' ) ? `https:${file.url}` : file.url;
		const imgWidth = file.details.image.width;
		const imgHeight = file.details.image.height; 
  
		const alt = fields.altText || image.fields.title || '';
		const width = fields.width || '200px'; // default
		const float = fields.float || 'none';
  
		let classes = `embedded-img ${fields.classes}` || '';
		if (float === 'left') classes += ' float-left';
		if (float === 'right') classes += ' float-right';
  
		return (
		  <div
			className = {classes}
			style={{
			  width,
			  margin:
				float === 'left'
				  ? '0 1rem 1rem 0'
				  : float === 'right'
					? '0 0 1rem 1rem'
					: '1rem 0',
			}}
		  >
			<Image
			  src={url}
			  alt={alt}
			  width={imgWidth}
			  height={imgHeight}
			  style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		  </div>
		);
	  },
	  [BLOCKS.EMBEDDED_ASSET]: (node) => {
		const { title, file } = node.data.target.fields;
		const { url, details } = file;
		const { width, height } = details.image;
  
		return (
		  <Image
			src={`https://${url}`}
			alt={title}
			width={width}
			height={height}
		  />
		);
	  },
	},
  };