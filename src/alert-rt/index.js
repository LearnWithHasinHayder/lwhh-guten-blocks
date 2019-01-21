/**
 * BLOCK: alert rich text
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import { STYLES, getStyleNameFromClasses } from './helper';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.editor;

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
registerBlockType('lwhh/alert-rt', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Alert RT'), // Block title.
	icon: 'yes', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('LWHH'),
		__('Alert'),
		__('Notification'),
	],

	styles: STYLES,

	attributes: {
		style: {
			type: 'string'
		},
		content: {
			source: 'html',
			selector: '.alert',
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
	edit({ className, setAttributes, attributes }) {
		let style = getStyleNameFromClasses(STYLES, className);
		setAttributes({ style });
		return (
			<RichText
				placeholder={__('Add alert message...')}
				tagName="div"
				className={`${className} alert alert-${style}`}
				value={attributes.content}
				multiline={false}
				onChange={(content) => setAttributes({ content })}
			/>
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
		return (
			<RichText.Content className={`alert alert-${attributes.style}`} tagName="div" value={attributes.content} />
		);
	},
});
