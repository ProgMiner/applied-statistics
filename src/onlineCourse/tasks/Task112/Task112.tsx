import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';

interface Task112State {

    e: [string, string, string, string];
    p: string;
    w: string;
}

export class Task112 extends Task<Task112State> {

    state: Task112State = {
        e: ['', '', '', ''],
        p: '',
        w: '',
    };

    private static checkRow(row: [string, string, string, string]) {
        return row.filter(verifyNumber).length === 4;
    }

    private static checkW(w: string) {
        return verifyInteger(w) && +w > 0 && +w < 5;
    }

    protected checkParameters(): boolean {
        const { e, p, w } = this.state;

        return Task112.checkRow(e) && verifyInteger(p) && Task112.checkW(w);
    }

    protected renderParameters() {
        const { e, p, w } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Верхняя часть <strong>p<sub>1</sub>, p<sub>2</sub>, p<sub>3</sub>, p<sub>4</sub></strong> =
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={e[i]} onChange={this.onERowChange(i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task112.checkRow(e)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Нижняя часть <strong>p<sub>1</sub>, p<sub>2</sub>, p<sub>3</sub>, p<sub>4</sub></strong> =
                    </span>

                    <InputText type="number" value={p} onChange={this.onDownChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(p)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Номер <strong>w</strong> =
                    </span>

                    <InputText type="number" value={w} onChange={this.onWChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task112.checkW(w)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, p, w } = this.state;

        const fullSum = e.map(parseFloat).reduce((a, b) => a + b);
        const sum = e.filter((_, i) => i !== (+w - 1)).map(parseFloat).reduce((a, b) => a + b);
        const answerUp = parseFloat(p) - sum;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>Возможно ли такое утро?</strong>
                    </span>

                    <InputText readOnly value={fullSum === +p ? 'Да' : 'Нет'} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Ответ для w<sub>{w}</sub>:</strong>
                    </span>

                    <InputText readOnly value={answerUp + ' / ' + p} />
                </div>
            </>
        );
    }

    private onERowChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row: Task112State['e'] = [...this.state.e];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, e: row });
        };
    }

    private onWChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            w: e.currentTarget.value.trim(),
        });
    }

    private onDownChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            p: e.currentTarget.value.trim(),
        });
    }
}
