import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { toNumber } from 'lodash';


interface Task142State {

    e: [string, string, string];
    p: [string, string, string];
    firma: string;
    status: string;
}

export class Task142 extends Task<Task142State> {

    state: Task142State = {
        e: ['', '', ''],
        p: ['', '', ''],
        firma: '',
        status: '',
    };

    private static checkRow(row: [string, string, string]) {
        return row.filter(verifyNumber).length === 3;
    }

    private static checkPercentRow(row: [string, string, string]) {
        return this.checkRow(row) && row.map(toNumber).reduce((a, b) => a + b) === 100;
    }

    private static verifyChocolateNuts(s: string) {
        return ['шоколад', 'орехи'].includes(s.trim().toLowerCase());
    }

    protected checkParameters(): boolean {
        const { e, p, firma, status } = this.state;

        return Task142.checkPercentRow(e) && Task142.checkRow(p) && verifyNumber(firma) && Task142.verifyChocolateNuts(status);
    }

    protected renderParameters() {
        const { e, p, firma, status } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Проценты фирм <strong>%</strong>
                    </span>

                    {[0, 1, 2].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={e[i]} onChange={this.onRowChange('e', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task142.checkPercentRow(e)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Ошибки фирм <strong>(кол-во)</strong>
                    </span>

                    {[0, 1, 2].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={p[i]} onChange={this.onRowChange('p', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task142.checkRow(p)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Куплено мороженно с <strong>("Шоколад" или "Орехи")</strong>:
                    </span>

                    <InputText type="text" value={status} onChange={this.onStatusChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task142.verifyChocolateNuts(status)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Какая вероятность что произвела фирма <strong>(номер)</strong> =
                    </span>

                    <InputText type="number" value={firma} onChange={this.onSecondChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(firma)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, p, firma, status } = this.state;
        let answerFirst, answerSecond;


        if (status.trim().toLowerCase() === 'орехи') {
            answerFirst = (parseFloat(e[0]) * parseFloat(p[0]) / 10000 + parseFloat(e[1]) * parseFloat(p[1]) / 10000 + parseFloat(e[2]) * parseFloat(p[2]) / 10000);
            answerSecond = (parseFloat(e[parseFloat(firma) - 1]) * parseFloat(p[parseFloat(firma) - 1]) / 10000 / answerFirst);
        } else if (status.trim().toLowerCase() === 'шоколад') {
            answerFirst = (parseFloat(e[0]) * (100 - parseFloat(p[0])) / 10000 + parseFloat(e[1]) * (100 - parseFloat(p[1])) / 10000 + parseFloat(e[2]) * (100 - parseFloat(p[2])) / 10000);
            answerSecond = (parseFloat(e[parseFloat(firma) - 1]) * (100 - parseFloat(p[parseFloat(firma) - 1])) / 10000 / answerFirst);
        } else {
            return (<> Неверный параметр "Куплено мороженно с ..."</>);
        }

        return (
            <>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Вероятность с мороженное было с {status}:</strong>
                    </span>

                    <InputText readOnly value={answerFirst} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Что его произвела {firma} фирма:</strong>
                    </span>

                    <InputText readOnly value={answerSecond} />
                </div>
            </>
        );
    }

    private onRowChange(param: 'e' | 'p', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row = [...this.state[param]];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: row });
        };
    }

    private onStatusChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            status: e.currentTarget.value.trim()
        });
    }

    private onSecondChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            firma: e.currentTarget.value.trim()
        });
    }
}
