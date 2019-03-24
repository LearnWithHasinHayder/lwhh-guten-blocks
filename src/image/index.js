/**
 * BLOCK: image
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;

const {
	MediaUpload,
	MediaUploadCheck
} = wp.editor;

const {
	IconButton,
} = wp.components;

const ALLOWED_MEDIA_TYPES = ['image'];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('lwhh/image', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Image'), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('LWHH'),
		__('Image'),
		__('Photo'),
	],

	attributes: {
		id: {
			type: 'integer',
			default: 0
		},
		src: {
			type: 'string',
			source: 'attribute', //source type
			selector: '.lwhh-figure__image', //dom selector
			attribute: 'src', //html attribute name
		},
		alt: {
			type: 'string',
			source: 'attribute', //source type
			selector: '.lwhh-figure__image', //dom selector
			attribute: 'alt', //html attribute name
		}
	},

	supports: {
		align: true,
		alignWide: false
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({ className, attributes, setAttributes }) {
		const { id, src, alt } = attributes;
		return (
			<figure className={`lwhh-figure ${className}`} >
				{src && <img className='lwhh-card-figure' src={src} alt={alt} />}
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(image) => {
							setAttributes({
								id: image.id,
								alt: image.title,
								src: (image.sizes.thumbnail && image.sizes.thumbnail.url) || image.url
							})
						}}
						multiple={false}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						value={id}
						render={({ open }) => (
							<IconButton
								className='lwhh-figure__controller'
								onClick={open}
								icon={(id || src) ? 'update' : 'format-image'}
								label={(id || src) ? __('Update image') : __('Add image')}
							/>
						)}
					/>
				</MediaUploadCheck>
			</figure >
		)
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save({ attributes }) {
		const { src, alt } = attributes;
		return (
			<figure className='lwhh-figure'>
				<img className='lwhh-figure__image' src={src} alt={alt} />
			</figure>
		)
	}
});
