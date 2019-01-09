const { __ } = wp.i18n;

export const STYLES = [
    {
        name: 'primary',
        label: __('Primary'),
        isDefault: true
    },
    {
        name: 'secondary',
        label: __('Secondary'),
    },
    {
        name: 'success',
        label: __('Success'),
    },
    {
        name: 'danger',
        label: __('Danger'),
    },
    {
        name: 'warning',
        label: __('Warning'),
    },
    {
        name: 'info',
        label: __('Info'),
    },
    {
        name: 'light',
        label: __('Light'),
    },
    {
        name: 'dark',
        label: __('Dark'),
    }
];

export function getStyleNameFromClasses(styles, classes) {
    let style = (classes && styles.find(style => classes.includes(style.name)));
    return (style ? style.name : 'primary');
}
