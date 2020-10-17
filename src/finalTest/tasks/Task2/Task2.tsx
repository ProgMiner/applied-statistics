import React from 'react';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { verifyNumber } from '../../../utils/verifyNumber';
import { InputText } from 'primereact/inputtext';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';

interface Task2State {

    e: [string, string];
    n: [string, string];
    p: [[string, string], [string, string]];
    pChanged: number; // Hack
}

export class Task2 extends FinalTask<Task2State> {

    state: Task2State = { e: ['', ''], n: ['', ''], p: [['', ''], ['', '']], pChanged: 0 };

    private static checkRow(row: [string, string]) {
        return row.filter(verifyNumber).length === 2;
    }

    private static checkTable(table: [[string, string], [string, string]]) {
        return table.filter(this.checkRow).length === 2;
    }

    protected checkParameters(): boolean {
        const { e, n, p } = this.state;

        return Task2.checkRow(e) && Task2.checkRow(n) && Task2.checkTable(p);
    }

    protected renderProblem() {
        const { e, n, p } = this.state;

        return (
            <>
                Случайный вектор имеет распределение, задаваемое таблицей:
                <br />

                <table style={{ margin: '0 auto' }}>
                    <thead>
                    <tr>
                        <th>&#951; \ &#958;</th>
                        <th>{e[0] || (<>&#958;<sub>1</sub></>)}</th>
                        <th>{e[1] || (<>&#958;<sub>2</sub></>)}</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <th>{n[0] || (<>&#951;<sub>1</sub></>)}</th>
                        <th>{p[0][0] || (<>P<sub>1,1</sub></>)}</th>
                        <th>{p[0][1] || (<>P<sub>1,2</sub></>)}</th>
                    </tr>

                    <tr>
                        <th>{n[1] || (<>&#951;<sub>2</sub></>)}</th>
                        <th>{p[1][0] || (<>P<sub>2,1</sub></>)}</th>
                        <th>{p[1][1] || (<>P<sub>2,2</sub></>)}</th>
                    </tr>
                    </tbody>
                </table>

                Составьте маргинальные распределения <strong>&#958;</strong> и <strong>&#951;</strong>.
            </>
        );
    }

    private onRowChange(param: 'e' | 'n', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row = [...this.state[param]];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: row });
        };
    }

    private onPChange(i: number, j: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const table = [...this.state.p] as [[string, string], [string, string]];

            table[i][j] = e.currentTarget.value.trim();
            this.setState({ ...this.state, p: table, pChanged: this.state.pChanged + 1 });
        };
    }

    protected renderFinalParameters() {
        const { p } = this.state;

        return (
            <>
                {[{ letter: '\u03be', name: 'e' }, { letter: '\u03b7', name: 'n' }]
                    .map(param => [0, 1].map(i => (
                        <div key={param.name + i} className="p-inputgroup margin-bottom">
                            <span className="p-inputgroup-addon">
                                <strong>{param.letter}<sub>{i + 1}</sub></strong>
                            </span>

                            <InputText type="number" value={this.state[param.name as 'e' | 'n'][i]}
                                       onChange={this.onRowChange(param.name as 'e' | 'n', i)} />

                            <span className="p-inputgroup-addon">
                                <ValidationIcon valid={verifyNumber(this.state[param.name as 'e' | 'n'][i])} />
                            </span>
                        </div>
                    )))}

                {[0, 1].map(i => [0, 1].map(j => (
                    <div key={i + ',' + j} className={`p-inputgroup ${!(i && j) && 'margin-bottom'}`}>
                        <span className="p-inputgroup-addon">
                            <strong>P<sub>{i + 1},{j + 1}</sub></strong>
                        </span>

                        <InputText type="number" value={p[i][j]} onChange={this.onPChange(i, j)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(p[i][j])} />
                        </span>
                    </div>
                )))}
            </>
        );
    }

    protected async renderAnswer() {
        const { e, n, p } = this.state;

        const en = +n[0] * (+p[0][0] + +p[0][1]) + +n[1] * (+p[1][0] + +p[1][1]);
        const en2 = (+n[0]) ** 2 * (+p[0][0] + +p[0][1]) + (+n[1]) ** 2 * (+p[1][0] + +p[1][1]);

        return (
            <>
                Найдите математические ожидания <strong>E&#958;</strong>:{' '}
                <InputText readOnly value={+e[0] * (+p[0][0] + +p[1][0]) + +e[1] * (+p[0][1] + +p[1][1])} />

                <br />
                <br />

                Найдите математические ожидания <strong>E&#951;</strong>:{' '}
                <InputText readOnly value={en} />

                <br />
                <br />

                Найдите дисперсию <strong>D&#951;</strong>:{' '}
                <InputText readOnly value={en2 - en ** 2} />
            </>
        );
    }
}
