import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../components/Task/Task';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../utils/verifyNumber';
import { Fieldset } from 'primereact/fieldset';

interface Task523State {

    d: [string, string];
    a: string;
    b: string;
    c: string;
}

export class Task523 extends Task<{}, Task523State> {

    state: Task523State = { d: ['', ''], a: '', b: '', c: '' };

    private static checkArray(array: [string, string]) {
        return array.filter(verifyNumber).map(Number).length === 2;
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
                        D&#958;<sub>1</sub> =
                    </span>

                    <InputText value={d[0]} onChange={this.onDChange(0)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(d[0])} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        D&#958;<sub>2</sub> =
                    </span>

                    <InputText value={d[1]} onChange={this.onDChange(1)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(d[1])} />
                    </span>
                </div>

                <Fieldset legend={
                    <>Найти D({a || 'a'}&#958;<sub>1</sub> + {b || 'b'}&#958;<sub>2</sub> + {c || 'c'})</>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            a =
                        </span>

                        <InputText value={a} onChange={this.onParamChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            b =
                        </span>

                        <InputText value={b} onChange={this.onParamChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            c =
                        </span>

                        <InputText value={c} onChange={this.onParamChange('c')} />

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
                        D({a}&#958;<sub>1</sub> + {b}&#958;<sub>2</sub> + {c}) =
                    </span>

                    <InputText readOnly value={(+a) ** 2 * +d[0] + (+b) ** 2 * +d[1]} />
                </div>
            </>
        );
    }
}
