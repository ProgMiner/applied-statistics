import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { erf } from '../../../utils/erf';
import { normalizeNumber } from '../../../utils/normalizeNumber';

interface Task423State {

    a: string;
    d: string;
    r: string;
}

export class Task423 extends Task<Task423State> {

    state: Task423State = { a: '', d: '', r: '' };

    private onStateChange(param: 'a' | 'd' | 'r', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { a, d, r } = this.state;

        return verifyNumber(a) && verifyNumber(d) && verifyNumber(r);
    }

    protected renderParameters() {
        const { a, d, r } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>N<sub>{a || 'a'}, {d || (<>&#963;<sup>2</sup></>)}</sub></strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a} onChange={this.onStateChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>&#963;<sup>2</sup></strong> =
                        </span>

                        <InputText type="number" value={d} onChange={this.onStateChange('d')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(d)} />
                        </span>
                    </div>
                </Fieldset>

                <br />
                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Выражение:
                    </span>

                    <span className="p-inputgroup-addon">
                        <strong>|&#958; - {a || 'a'}| &le;</strong>
                    </span>

                    <InputText value={r} onChange={this.onStateChange('r', false)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(r)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { a, d, r } = this.state;

        const F = (x: number): number => (1 + erf((x - +a) / Math.sqrt(2 * +d))) / 2;

        return (
            <div className="p-inputgroup half-margin-bottom">
                <span className="p-inputgroup-addon">
                    <strong>P(|&#958; - {a}| &le; {r})</strong> =
                </span>

                <InputText readOnly value={normalizeNumber(F(+a + +r) - F(+a - +r))} />
            </div>
        );
    }
}
