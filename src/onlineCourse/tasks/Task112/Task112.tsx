import React from 'react';
import {InputText} from 'primereact/inputtext';

import {Task} from '../../../components/Task/Task';
import {ValidationIcon} from '../../../components/ValidationIcon/ValidationIcon';
import {verifyNumber} from '../../../utils/verifyNumber';
import {verifyInteger} from '../../../utils/verifyInteger';

interface Task112State {

    e: [string, string, string, string];
    wtf: [string, string, string, string];
    p: string;
    w: string;
}

export class Task112 extends Task<Task112State> {

    state: Task112State = {
        e: ['', '', '', ''],
        wtf: ['', '', '', ''],
        p: "",
        w: '',
    };

    private static checkRow(row: [string, string, string, string]) {
        return row.filter(verifyNumber).length === 4;
    }

    protected checkParameters(): boolean {
        const { e, p, w } = this.state;

        return Task112.checkRow(e) &&
            verifyInteger(p) && verifyInteger(w);
    }

    private onRowChange(param: 'e' | 'wtf', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row = [...this.state[param]];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: row });
        };
    }

    private onWChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            w: e.currentTarget.value.trim()
        });
    }

    private onDownChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            p: e.currentTarget.value.trim()
        });
    }

    protected renderParameters() {
        const { e, p, w } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Верхняя часть <strong>p1, p2, p3, p4</strong>
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={e[i]} onChange={this.onRowChange('e', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task112.checkRow(e)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Нижняя часть <strong>p1, p2, p3, p4</strong> =
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
                        <ValidationIcon valid={verifyNumber(w)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, p, w } = this.state;

        let sum = 0;
        if (parseFloat(w) === 1) { sum =
            parseFloat(e[1]) +
            parseFloat(e[2]) +
            parseFloat(e[3]);
        } else if (parseFloat(w) === 2) { sum =
            parseFloat(e[0]) +
            parseFloat(e[2]) +
            parseFloat(e[3]);
        } else if (parseFloat(w) === 3) { sum =
            parseFloat(e[0]) +
            parseFloat(e[1]) +
            parseFloat(e[3]);
        } else if (parseFloat(w) === 4) { sum =
            parseFloat(e[0]) +
            parseFloat(e[1]) +
            parseFloat(e[2]);
        }

        const answerUp = parseFloat(p) - sum;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>Возможно ли такое утро?</strong>
                    </span>
                    <InputText readOnly value="Нет" />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Ответ для w{w}:</strong>
                    </span>

                    <InputText readOnly value={answerUp + " / " + p} />
                </div>
            </>
        );
    }
}