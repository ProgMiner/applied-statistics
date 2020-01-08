import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Distribution } from '../../../utils/distribution';
import { DistributionSelector } from '../../../components/DistributionSelector/DistributionSelector';

interface Task1State {

    n?: number;
    distribution?: Distribution;
}

export class Task1 extends React.Component<{}, Task1State> {

    state: Task1State = {};

    private onDistributionChange(value?: Distribution) {
        this.setState({
            ...this.state,

            distribution: value
        });
    }

    render() {
        return (
            <div>
                Объём (<strong>n</strong> =): <InputText /><br />
                <DistributionSelector onChange={this.onDistributionChange.bind(this)} />
            </div>
        );
    }
}
