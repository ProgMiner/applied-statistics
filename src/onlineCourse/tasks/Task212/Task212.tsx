import React from 'react';
import {InputText} from 'primereact/inputtext';

import {Task} from '../../../components/Task/Task';
import {ValidationIcon} from '../../../components/ValidationIcon/ValidationIcon';
import {verifyNumber} from '../../../utils/verifyNumber';

interface Task212State {

    e: [string, string, string, string];
    n: [string, string];
    changeFirst: [string, string, string, string];
    changeSecond: [string, string, string, string];
}

export class Task212 extends Task<Task212State> {

    state: Task212State = {
        e: ['', '', '', ''],
        n: ['', ''],
        changeFirst: ['', '', '', ''],
        changeSecond: ['', '', '', ''],
    };

    private static checkRow4(row: [string, string, string, string]) {
        return row.filter(verifyNumber).length === 4;
    }

    private static checkRow2(row: [string, string]) {
        return row.filter(verifyNumber).length === 2
    }


    protected checkParameters(): boolean {
        const { e, n, changeFirst, changeSecond } = this.state;

        return Task212.checkRow4(e) && Task212.checkRow4(changeFirst) &&
            Task212.checkRow4(changeSecond) && Task212.checkRow2(n);
    }

    private onRowChange(param: 'e' | 'n' | 'changeFirst' | 'changeSecond', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row = [...this.state[param]];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: row });
        };
    }


    protected renderParameters() {
        const { e, n, changeFirst, changeSecond } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Рост участка <strong>&#958;</strong>:
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
                        <ValidationIcon valid={Task212.checkRow4(e)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Длина прыжка <strong>&#951;</strong>:
                    </span>

                    {[0, 1].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={n[i]} onChange={this.onRowChange('n', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task212.checkRow2(n)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Вероятности в <strong>первой</strong> строке:
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={changeFirst[i]} onChange={this.onRowChange('changeFirst', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task212.checkRow4(changeFirst)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Вероятности во <strong>второй</strong> строке:
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={changeSecond[i]} onChange={this.onRowChange('changeSecond', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task212.checkRow4(changeSecond)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, n, changeFirst, changeSecond  } = this.state;

        let newE = [], newN = [], newChange1 = [], newChange2 = [];

        for (let i = 0; i < 4; ++i){
            newE[i] = parseFloat(e[i]);
            newChange1[i] = parseFloat(changeFirst[i]);
            newChange2[i] = parseFloat(changeSecond[i]);
            if (i < 2){
                newN[i] = parseFloat(n[i]);
            }
        }

        const newMatrix = [
            (newChange1[0] + newChange2[0]),
            (newChange1[1] + newChange2[1]),
            (newChange1[2] + newChange2[2]),
            (newChange1[3] + newChange2[3]),
        ]

        const waiting_E =
            newMatrix[0] * newE[0] +
            newMatrix[1] * newE[1] +
            newMatrix[2] * newE[2] +
            newMatrix[3] * newE[3];

        const dispersion_E =
            newMatrix[0] * Math.pow(newE[0], 2) +
            newMatrix[1] * Math.pow(newE[1], 2) +
            newMatrix[2] * Math.pow(newE[2], 2) +
            newMatrix[3] * Math.pow(newE[3], 2) -
            Math.pow(waiting_E, 2);

        const matrix_row1_change = newChange1.reduce(function (sum, a){
            return sum + a;
        });
        const matrix_row2_change = newChange2.reduce(function (sum, a){
            return sum + a;
        });

        const waiting_N =
            newN[0] * matrix_row1_change +
            newN[1] * matrix_row2_change;

        const dispersion_N =
            Math.pow(newN[0], 2) * matrix_row1_change +
            Math.pow(newN[1], 2) * matrix_row2_change -
            Math.pow(waiting_N, 2);

        const cov_E_n =
            (
                newN[0] * (newE[0] * newChange1[0] + newE[1] * newChange1[1] + newE[2] * newChange1[2] + newE[3] * newChange1[3]) +
                newN[1] * (newE[0] * newChange2[0] + newE[1] * newChange2[1] + newE[2] * newChange2[2] + newE[3] * newChange2[3])
            ) - (waiting_E * waiting_N);

        const correction_p = cov_E_n / (Math.sqrt(dispersion_E) * Math.sqrt(dispersion_N));


        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>P(&#958; = {e[0]}) =</strong>
                    </span>
                    <InputText readOnly value={newMatrix[0].toFixed(2)} />

                    <span className="p-inputgroup-addon">
                        <strong>P(&#958; = {e[1]}) =</strong>
                    </span>
                    <InputText readOnly value={newMatrix[1].toFixed(2)} />

                    <span className="p-inputgroup-addon">
                        <strong>P(&#958; = {e[2]} =</strong>
                    </span>
                    <InputText readOnly value={newMatrix[2].toFixed(2)} />

                    <span className="p-inputgroup-addon">
                        <strong>P(&#958; = {e[3]}) =</strong>
                    </span>
                    <InputText readOnly value={newMatrix[3].toFixed(2)} />
                </div>

                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Математическое ожидание случайной величины &#958;:</strong>
                    </span>

                    <InputText readOnly value={waiting_E} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Дисперсия случайной величины &#958;:</strong>
                    </span>

                    <InputText readOnly value={dispersion_E} />
                </div>

                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>P(&#951; = {n[0]}) =</strong>
                    </span>

                    <InputText readOnly value={matrix_row1_change} />

                    <span className="p-inputgroup-addon">
                        <strong>P(&#951; = {n[1]}) =</strong>
                    </span>

                    <InputText readOnly value={matrix_row2_change} />
                </div>

                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Математическое ожидание случайной величины &#951;:</strong>
                    </span>

                    <InputText readOnly value={waiting_N} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Дисперсия случайной величины &#951;:</strong>
                    </span>

                    <InputText readOnly value={dispersion_N} />
                </div>

                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Ковариация cov(&#958;,&#951;) :</strong>
                    </span>

                    <InputText readOnly value={cov_E_n} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Коэффициент корреляции p(&#958;,&#951;) :</strong>
                    </span>

                    <InputText readOnly value={correction_p} />
                </div>
            </>
        );
    }
}