import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';

interface Task523State {

    d: [string, string];
    a: string;
    b: string;
    c: string;
}

export class Task523 extends Task<Task523State> {

    state: Task523State = { d: ['', ''], a: '', b: '', c: '' };

    private static checkArray(array: [string, string]) {
        return array.filter(verifyNumber).length === 2;
    }

    protected checkParameters(): boolean {
        const { d, a, b, c } = this.state;

        return Task523.checkArray(d) && verifyNumber(a) && verifyNumber(b) && verifyNumber(c);
    }

    private onDChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const params = [...this.state.d] as [string, string];

            params[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, d: params });
        };
    }

    private onParamChange(param: 'a' | 'b' | 'c') {
        return (e: React.FormEvent<HTMLInputElement>) => this.setState({
            ...this.state,

            [param]: e.currentTarget.value
        });
    }

    protected renderParameters() {
        const { d, a, b, c } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>D&#958;<sub>1</sub></strong> =
                    </span>

                    <InputText type="number" value={d[0]} onChange={this.onDChange(0)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(d[0])} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>D&#958;<sub>2</sub></strong> =
                    </span>

                    <InputText type="number" value={d[1]} onChange={this.onDChange(1)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(d[1])} />
                    </span>
                </div>

                <Fieldset legend={
                    <>
                        Вычислить{' '}
                        <strong>D({a || 'a'}&#958;<sub>1</sub> + {b || 'b'}&#958;<sub>2</sub> + {c || 'c'})</strong>
                    </>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a} onChange={this.onParamChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>b</strong> =
                        </span>

                        <InputText type="number" value={b} onChange={this.onParamChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>c</strong> =
                        </span>

                        <InputText type="number" value={c} onChange={this.onParamChange('c')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(c)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { d, a, b, c } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>D({a}&#958;<sub>1</sub> + {b}&#958;<sub>2</sub> + {c})</strong> =
                    </span>

                    <InputText readOnly value={(+a) ** 2 * +d[0] + (+b) ** 2 * +d[1]} />
                </div>
            </>
        );
    }
}
