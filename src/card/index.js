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
	URLInput,
	InspectorControls,
} = wp.editor;
const {
	Dashicon,
	IconButton,
	PanelBody,
	SelectControl
} = wp.components;

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
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		label: {
			type: 'string'
		},
		btn_text: {
			type: 'string'
		},
		btn_url: {
			type: 'string'
		},
		label_position: {
			type: 'string',
			default: 'top-right'
		},
		image_position: {
			type: 'string',
			default: 'top'
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
	edit({ attributes, setAttributes, isSelected }) {
		const {
			title,
			content,
			label,
			btn_text,
			btn_url,
			label_position,
			image_position
		} = attributes;

		return (
			<div className={`lwhh-card lwhh-card--figure-${image_position}`}>
				<InspectorControls>
					<PanelBody
						title={__('Card')}
						initialOpen={true}
					>
						<SelectControl
							style={{ width: '100%' }}
							label={__('Image Position')}
							value={image_position}
							onChange={(position) => setAttributes({ image_position: position })}
							options={[
								{ value: 'left', label: 'Left' },
								{ value: 'top', label: 'Top' },
								{ value: 'right', label: 'Right' },
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
								{ value: 'bottom-left', label: 'Bottom Left' },
								{ value: 'bottom-center', label: 'Bottom Center' },
								{ value: 'bottom-right', label: 'Bottom Right' },
								{ value: 'middle-left', label: 'Middle Left' },
								{ value: 'middle-center', label: 'Middle Center' },
								{ value: 'middle-right', label: 'Middle Right' },
								{ value: 'top-left', label: 'Top Left' },
								{ value: 'top-center', label: 'Top Center' },
								{ value: 'top-right', label: 'Top Right' },
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="lwhh-card-figure">
					<img src="https://via.placeholder.com/400x400?text=LWHH Gutenberg Course" alt="..." />
					<div className={`lwhh-label lwhh-label--${label_position}`}>
						<RichText
							value={label}
							multiline={false}
							placeholder={__('Add text...')}
							onChange={(label) => setAttributes({ label })}
							keepPlaceholderOnFocus={true}
						/>
					</div>
				</div>
				<div className="lwhh-card-body">
					<h2 className="lwhh-card-title">
						<RichText
							value={title}
							multiline={false}
							placeholder={__('Add title text...')}
							onChange={(title) => setAttributes({ title })}
							keepPlaceholderOnFocus={true}
						/>
					</h2>
					<div className="lwhh-card-text">
						<p>
							<RichText
								value={content}
								multiline={false}
								placeholder={__('Add your card content')}
								onChange={(content) => setAttributes({ content })}
								keepPlaceholderOnFocus={true}
							/>
						</p>
					</div>
					<div className="lwhh-card-btn">
						<RichText
							value={btn_text}
							multiline={false}
							placeholder={__('Button text...')}
							onChange={(btn_text) => setAttributes({ btn_text })}
							keepPlaceholderOnFocus={true}
						/>
					</div>
					{isSelected && (
						<form
							className="block-library-button__inline-link"
							onSubmit={(event) => event.preventDefault()}>
							<Dashicon icon="admin-links" />
							<URLInput
								autoFocus={false}
								value={btn_url}
								onChange={(url) => setAttributes({ btn_url: url })}
							/>
							<IconButton icon="editor-break" label={__('Apply')} type="submit" />
						</form>
					)}
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
	save() {
	},
});
