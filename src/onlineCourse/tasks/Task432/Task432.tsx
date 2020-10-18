import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { fraction } from '../../../utils/fraction';

interface Task432State {

    a: string;
    b: string;
    p: string;
    q: string;
}

export class Task432 extends Task<Task432State> {

    readonly state: Task432State = { a: '', b: '', p: '', q: '' };

    private onStateChange(param: keyof Task432State, trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { a, b, p, q } = this.state;

        return [a, b, p, q].every(verifyNumber);
    }

    private renderFields(fields: ReadonlyArray<keyof Task432State>) {
        return fields.map((key, i) => (
            <div className={`p-inputgroup ${i < fields.length - 1 ? 'half-margin-bottom' : ''}`} key={key}>
                <span className="p-inputgroup-addon">
                    <strong>{key}</strong> =
                </span>

                <InputText type="number" value={this.state[key]} onChange={this.onStateChange(key)} />

                <span className="p-inputgroup-addon">
                    <ValidationIcon valid={verifyNumber(this.state[key])} />
                </span>
            </div>
        ));
    }

    protected renderParameters() {
        const { a, b, p, q } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>c ({p || 'p'}x + {q || 'q'}) y, (x, y) &isin; K</strong>
                }>
                    {this.renderFields(['p', 'q'])}
                </Fieldset>

                <Fieldset legend={
                    <strong>x = 0, y = 0, y = {a || 'a'} - {a || 'a'}/{b || 'b'} x</strong>
                }>
                    {this.renderFields(['a', 'b'])}
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { a, b, p, q } = this.state;

        const c = fraction(6, (+a) ** 2 * +b * (+b * +p / 4 + +q));

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>c</strong> =
                    </span>

                    <InputText readOnly value={c} />
                </div>

                <Fieldset legend={
                    <strong>f<sub>&xi;<sub>1</sub></sub>(x)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &notin; (0, {b}]</strong>:
                        </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &isin; (0, {b}]</strong>:
                        </span>

                        <InputText readOnly value={
                            `${c} / 2 * (${p} * x + ${q}) * (${a} - ${fraction(+a, +b)} * x)^2`
                        } />
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <strong>f<sub>&xi;<sub>2</sub></sub>(y)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>y &notin; (0, {a}]</strong>:
                        </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>y &isin; (0, {a}]</strong>:
                        </span>

                        <InputText readOnly value={
                            `${c} * ${b} * y * (${fraction(+p * +b, 2)} * (1 - y / ${a}) + ${q}) * (1 - y / ${a})`
                        } />
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <strong>F<sub>&xi;</sub>(x, y)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &lt; 0, y &lt; 0</strong>:
                        </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>(x, y) &isin; K</strong>:
                        </span>

                        <InputText readOnly value={`${c} / 2 * x * y^2 * (${fraction(+p, 2)} * x + ${q})`} />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &gt; {b}, y &gt; {a}</strong>:
                        </span>

                        <InputText readOnly value="1" />
                    </div>
                </Fieldset>
            </>
        );
    }
}
