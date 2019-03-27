/**
 * BLOCK: card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck
} = wp.editor;

const {
	PanelBody,
	SelectControl,
	IconButton,
	RangeControl
} = wp.components;

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/button'];

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
registerBlockType('lwhh/card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Card'), // Block title.
	icon: 'yes', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('LWHH'),
		__('Card'),
	],
	attributes: {
		label: {
			type: 'string',
			source: 'text',
			selector: '.lwhh-label'
		},
		label_position: {
			type: 'string',
			default: 'top-right'
		},
		image_position: {
			type: 'string',
			default: 'top'
		},
		img_src: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		},
		img_alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt'
		},
		img_id: {
			type: 'integer'
		},
		border_radius: {
			type: 'integer'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({ attributes, setAttributes }) {
		const {
			label,
			label_position,
			image_position,
			img_alt,
			img_src,
			img_id,
			border_radius
		} = attributes;

		return (
			<div style={{ borderRadius: border_radius + 'px' }} className={`lwhh-card lwhh-card--figure-${image_position}`}>
				<InspectorControls>
					<PanelBody
						title={__('Card')}
						initialOpen={true}
					>
						<RangeControl
							label={__('Border Radius')}
							value={border_radius}
							onChange={(border_radius) => setAttributes({ border_radius })}
							min={0}
							max={50}
						/>
					</PanelBody>
					<PanelBody
						title={__('Image')}
						initialOpen={false}
					>
						<SelectControl
							label={__('Image Position')}
							value={image_position}
							onChange={(position) => setAttributes({ image_position: position })}
							options={[
								{ value: 'top', label: __('Image On Top') },
								{ value: 'left', label: __('Image On Left') },
								{ value: 'right', label: __('Image On Right') },
							]}
						/>
					</PanelBody>
					<PanelBody
						title={__('Label')}
					>
						<SelectControl
							label={__('Label Position')}
							value={label_position}
							onChange={(position) => setAttributes({ label_position: position })}
							options={[
								{ value: 'top-left', label: 'Top Left' },
								{ value: 'top-center', label: 'Top Center' },
								{ value: 'top-right', label: 'Top Right' },
								{ value: 'middle-left', label: 'Middle Left' },
								{ value: 'middle-center', label: 'Middle Center' },
								{ value: 'middle-right', label: 'Middle Right' },
								{ value: 'bottom-left', label: 'Bottom Left' },
								{ value: 'bottom-center', label: 'Bottom Center' },
								{ value: 'bottom-right', label: 'Bottom Right' },
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="lwhh-card-figure">
					{img_src && <img src={img_src} alt={img_alt} />}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(image) => {
								setAttributes({
									img_id: image.id,
									img_alt: image.title,
									img_src: (image.sizes.large && image.sizes.large.url) || image.url
								})
							}}
							multiple={false}
							allowedTypes={['image']}
							value={img_id}
							render={({ open }) => (
								<IconButton
									className='lwhh-card-figure-btn'
									onClick={open}
									icon={(img_id || img_src) ? 'update' : 'format-image'}
									label={(img_id || img_src) ? __('Update image') : __('Add image')}
								/>
							)}
						/>
					</MediaUploadCheck>
					<div className={`lwhh-label lwhh-label--${label_position}`}>
						<RichText
							value={label}
							multiline={false}
							placeholder={__('Add text...')}
							onChange={(label) => setAttributes({ label })}
							keepPlaceholderOnFocus
						/>
					</div>
				</div>
				<div className="lwhh-card-body">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={
							[
								['core/heading', { placeholder: 'Type card heading' }],
								['core/paragraph', { placeholder: 'Type card description' }],
								['core/button']
							]
						}
						templateLock='all'
					/>
				</div>
			</ div >
		);
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
		const {
			label,
			label_position,
			image_position,
			img_alt,
			img_src,
			border_radius
		} = attributes;

		return (
			<div style={{ borderRadius: border_radius + 'px' }} className={`lwhh-card lwhh-card--figure-${image_position}`}>
				<div className="lwhh-card-figure">
					<img src={img_src} alt={img_alt} />
					<div className={`lwhh-label lwhh-label--${label_position}`}>{label}</div>
				</div>
				<div className='lwhh-card-body'>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
