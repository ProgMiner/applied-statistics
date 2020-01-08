import React from 'react';
import { Panel } from 'primereact/panel';

export abstract class Week<P = {}, S = {}> extends React.Component<P, S> {

    protected readonly abstract weekName: string;
    protected readonly weekClassNames?: string | string[];

    private readonly className: string;

    protected constructor(props: P) {
        super(props);

        const classNames = ['Week'];
        if (this.weekClassNames) {
            if (Array.isArray(this.weekClassNames)) {
                classNames.push(...this.weekClassNames);
            } else {
                classNames.push(this.weekClassNames);
            }
        }

        this.className = classNames.join(' ');
    }

    render() {
        return (
            <div className={this.className}>
                <Panel header={this.weekName} toggleable collapsed>
                    {this.renderContent()}
                </Panel>
            </div>
        );
    }

    protected abstract renderContent(): React.ReactNode;
}
