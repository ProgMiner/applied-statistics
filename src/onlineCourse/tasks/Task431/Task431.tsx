import React, { ReactNode } from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';

interface Task431State {

    ak: string;
    bk: string;
    ck: string;
    dk: string;

    ap: string;
    bp: string;
    cp: string;
    dp: string;
}

export class Task431 extends Task<Task431State> {

    readonly state: Task431State = { ak: '', bk: '', ck: '', dk: '', ap: '', bp: '', cp: '', dp: '' };

    private onStateChange(param: keyof Task431State, trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { ak, bk, ck, dk, ap, bp, cp, dp } = this.state;

        return [ak, bk, ck, dk, ap, bp, cp, dp].every(verifyNumber);
    }

    private renderFields(fields: ReadonlyArray<readonly [keyof Task431State, ReactNode]>) {
        return fields.map(([key, lbl], i) => (
            <div className={`p-inputgroup ${i < fields.length - 1 ? 'half-margin-bottom' : ''}`} key={`${key}-${lbl}`}>
                <span className="p-inputgroup-addon">
                    <strong>{lbl}</strong> =
                </span>

                <InputText type="number" value={this.state[key]} onChange={this.onStateChange(key)} />

                <span className="p-inputgroup-addon">
                    <ValidationIcon valid={verifyNumber(this.state[key])} />
                </span>
            </div>
        ));
    }

    protected renderParameters() {
        const { ak, bk, ck, dk, ap, bp, cp, dp } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>
                        K : x &isin; [{ak || <>a<sub>K</sub></>}, {bk || <>b<sub>K</sub></>}],{' '}
                        y &isin; [{ck || <>c<sub>K</sub></>}, {dk || <>d<sub>K</sub></>}]
                    </strong>
                }>
                    {this.renderFields([
                        ['ak', <>a<sub>K</sub></>],
                        ['bk', <>b<sub>K</sub></>],
                        ['ck', <>c<sub>K</sub></>],
                        ['dk', <>d<sub>K</sub></>]
                    ])}
                </Fieldset>

                <Fieldset legend={
                    <strong>
                        P : x &isin; [{ap || <>a<sub>P</sub></>}, {bp || <>b<sub>P</sub></>}],{' '}
                        y &isin; [{cp || <>c<sub>P</sub></>}, {dp || <>d<sub>P</sub></>}]
                    </strong>
                }>
                    {this.renderFields([
                        ['ap', <>a<sub>P</sub></>],
                        ['bp', <>b<sub>P</sub></>],
                        ['cp', <>c<sub>P</sub></>],
                        ['dp', <>d<sub>P</sub></>]
                    ])}
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { ak, bk, ck, dk, ap, bp, cp, dp } = this.state;

        if (+ak > +bk || +ck > +dk || +ap > +bp || +cp > +dp) {
            return <>Неверные границы отрезков.</>;
        }

        const xSide = +bk - +ak;
        const ySide = +dk - +ck;
        const area = xSide * ySide;

        const fixX = (x: number) => Math.min(Math.max(x, +ak), +bk);
        const fixY = (y: number) => Math.min(Math.max(y, +ck), +dk);

        return (
            <>
                <Fieldset legend={
                    <strong>f<sub>&xi;</sub>(x, y)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>(x, y) &notin; K</strong>:
                    </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>(x, y) &isin; K</strong>:
                    </span>

                        <InputText readOnly value={`1/${area}`} />
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <strong>f<sub>&xi;<sub>1</sub></sub>(x)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &notin; [{ak}, {bk}]</strong>:
                        </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x &isin; [{ak}, {bk}]</strong>:
                        </span>

                        <InputText readOnly value={`1/${xSide}`} />
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <strong>f<sub>&xi;<sub>2</sub></sub>(y)</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>y &notin; [{ck}, {dk}]</strong>:
                        </span>

                        <InputText readOnly value="0" />
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>y &isin; [{ck}, {dk}]</strong>:
                        </span>

                        <InputText readOnly value={`1/${ySide}`} />
                    </div>
                </Fieldset>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>P (x &isin; [{ap}, {bp}], y &isin; [{cp}, {dp}])</strong>:
                    </span>

                    <InputText readOnly value={`1/${area} * (${fixX(+bp)} - ${fixX(+ap)}) * (${fixY(+dp)} - ${fixY(+cp)})`} />
                </div>
            </>
        );
    }
}
