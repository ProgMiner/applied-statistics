import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { functions } from '../../../utils/functions';


interface Task33State {

    distributionType: string;
    x: string;
    e: [string, string];
}

export class Task33 extends Task<Task33State> {

    state: Task33State = { x: '', e: ['', ''], distributionType: '' };

    private static checkRow2(row: [string, string]) {
        return row.filter(s => !!s).length === 2
    }

    protected checkParameters(): boolean {
        const { x, e, distributionType } = this.state;

        return !!x && !!distributionType && Task33.checkRow2(e);
    }

    protected renderParameters() {
        const { x, e, distributionType } = this.state;

        return (
            <>
                Пример функций: (2^x-1), (3^x-1), (4^x-1), arctan(x), x^5, tan(x), x^4

                <br />
                <br />

                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>Функция</strong> =
                        </span>

                    <InputText type="text" value={distributionType} onChange={this.onStateChange('distributionType')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={!!distributionType} />
                        </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>2 Число</strong> из промежутка =
                        </span>

                    <InputText type="text" value={x} onChange={this.onStateChange('x')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={!!x} />
                        </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>Промежуток</strong> последнего задания =
                        </span>

                    {[0, 1].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="text" value={e[i]} onChange={this.onERowChange(i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task33.checkRow2(e)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { x, e, distributionType } = this.state;

        let answer1, answer2, answer3, answer6;

        answer1 = '1/' + functions(distributionType.trim(), x);
        answer2 = functions(distributionType.trim(), '0');
        answer3 = answer1 + '*' + functions(distributionType.trim(), 'x');
        if (distributionType.trim() !== 'tan(x)') {
            if (parseFloat(e[1]) > parseFloat(x)) {
                answer6 = '(' + functions(distributionType.trim(), x) + '-' + functions(distributionType.trim(), e[0]) + ')/' + functions(distributionType.trim(), x);
            } else {
                answer6 = '(' + functions(distributionType.trim(), e[1]) + '-' + functions(distributionType.trim(), e[0]) + ')/' + functions(distributionType.trim(), x);
            }
        } else {
            answer6 = '(' + functions(distributionType.trim(), e[1]) + '-' + functions(distributionType.trim(), e[0]) + ')/' + functions(distributionType.trim(), x);
        }


        return (
            <>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Найдите возможные значения <strong>&#x3B8;</strong> и введите правую границу интервала:
                    </span>

                    <InputText readOnly value={answer1} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        При <strong>x &#x2264; 0</strong> =
                    </span>

                    <InputText readOnly value={answer2} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        При <strong>x &#x2208; (0;{x}]</strong> =
                    </span>

                    <InputText readOnly value={answer3} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        При <strong>x &gt; {x}</strong> =
                    </span>

                    <InputText readOnly value="1" />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Вероятность события <strong>&#x3BE; = {x}</strong> =
                    </span>

                    <InputText readOnly value="0.5" />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Значение &#x3B8;, если <strong>&#x3BE; &#x2208; [{e[0]}, {e[1]}]</strong> =
                    </span>

                    <InputText readOnly value={answer6} />
                </div>

            </>
        );
    }

    private onStateChange(param: 'x' | 'distributionType', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    private onERowChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row: Task33State['e'] = [...this.state.e];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, e: row });
        };
    }
}
