import React from 'react';
import { Panel } from 'primereact/panel';

export abstract class Week<P = {}, S = {}> extends React.Component<P, S> {

    protected readonly abstract weekName: string;
    protected readonly className?: string | string[];

    private readonly weekClassName: string;

    protected constructor(props: P) {
        super(props);

        const classNames = ['Week'];
        if (this.className) {
            if (Array.isArray(this.className)) {
                classNames.push(...this.className);
            } else {
                classNames.push(this.className);
            }
        }

        this.weekClassName = classNames.join(' ');
    }

    render() {
        return (
            <div className={this.weekClassName}>
                <Panel header={this.weekName} toggleable collapsed>
                    {this.renderContent()}
                </Panel>
            </div>
        );
    }

    protected abstract renderContent(): React.ReactNode;
}
