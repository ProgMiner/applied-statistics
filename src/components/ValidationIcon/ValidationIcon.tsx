import React from 'react';

export interface ValidationIconProps {

    valid?: boolean;
    clickable: boolean;

    onClick(): void;
}

export class ValidationIcon extends React.Component<ValidationIconProps> {

    static defaultProps: ValidationIconProps = {

        clickable: false,

        onClick() {}
    };

    render() {
        const { valid, clickable, onClick } = this.props;

        if (valid === undefined) {
            return clickable
                ? (<i className="pi pi-spin pi-replay" />)
                : (<i className="pi pi-spin pi-spinner" />);
        } else {
            return valid
                ? (<i className="pi pi-check" />)
                : clickable
                    ? (<i className="pi pi-replay" style={{ cursor: 'pointer' }} onClick={onClick} />)
                    : (<i className="pi pi-times" />);
        }
    }
}
