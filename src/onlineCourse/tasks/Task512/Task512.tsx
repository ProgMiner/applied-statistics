import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';

interface Task512State {

    a: [string, string];
    b: [string, string];
}

export class Task512 extends Task<Task512State> {

    state: Task512State = {
        a: ['', ''],
        b: ['', ''],
    };

    private static checkArray(array: [string, string]) {
        return array.filter(verifyNumber).length === 2;
    }

    protected checkParameters(): boolean {
        const { a, b } = this.state;

        return Task512.checkArray(a) && Task512.checkArray(b);
    }

    private onParamChange(param: 'a' | 'b', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const params = [...this.state[param]];

            params[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: params });
        };
    }

    protected renderParameters() {
        const { a, b } = this.state;

        return (
            <>
                <Fieldset legend={
                    <><strong>&#958;</strong> ~ <strong>U<sub>{a[0] || 'a'},{b[0] || 'b'}</sub></strong></>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a[0]} onChange={this.onParamChange('a', 0)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a[0])} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>b</strong> =
                        </span>

                        <InputText type="number" value={b[0]} onChange={this.onParamChange('b', 0)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b[0])} />
                        </span>
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <><strong>&#951;</strong> ~ <strong>U<sub>{a[1] || 'a'},{b[1] || 'b'}</sub></strong></>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a[1]} onChange={this.onParamChange('a', 1)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a[1])} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>b</strong> =
                        </span>

                        <InputText type="number" value={b[1]} onChange={this.onParamChange('b', 1)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b[1])} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { a, b } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>&#952;<sub>0</sub></strong> =
                    </span>

                    <InputText readOnly value={`${+b[1] - +a[1]} / ${+b[0] - +a[0]}`} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>&#952;<sub>1</sub></strong> =
                    </span>

                    <InputText value={`${+a[0] * +a[1] - +a[0] * +b[1] + +a[1] * (+b[0] - +a[0])} / ${+b[0] - +a[0]}`}
                               readOnly />
                </div>
            </>
        );
    }
}
