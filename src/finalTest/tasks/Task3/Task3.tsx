import React from 'react';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';

import exampleImage from './example.png';

interface Task3State {

    f: [string, string, string, string];
    x: [string, string, string];

    a: string;
    b: string;
}

export class Task3 extends FinalTask<Task3State> {

    state: Task3State = {
        f: ['0', '', '', '1'],
        x: ['', '', ''],
        a: '',
        b: ''
    };

    private static checkF(f: [string, string, string, string]) {
        return f.filter(verifyNumber).length === 4;
    }

    private static checkX(x: [string, string, string]) {
        return x.filter(verifyInteger).length === 3;
    }

    protected checkParameters(): boolean {
        const { f, x, a, b } = this.state;

        return Task3.checkF(f) && Task3.checkX(x) && verifyNumber(a) && verifyNumber(b);
    }

    protected renderProblem() {
        const { f, x, a, b } = this.state;

        return (
            <>
                Функция распределения случайной величины <strong>&#958;</strong> задана соотношением.<br />

                <table style={{ margin: '0 auto' }}>
                    <tbody>
                    <tr>
                        <td rowSpan={4}>
                            <strong>F<sub>&#958;</sub>(x)</strong> =
                        </td>

                        <td style={{ minWidth: '35px' }}>
                            <strong>{f[0] || (
                                <>F<sub>1</sub></>
                            )},</strong>
                        </td>

                        <td>
                            <strong>x &le; {x[0] || (
                                <>x<sub>1</sub></>
                            )}</strong>
                        </td>
                    </tr>

                    {[1, 2].map((i) => (
                        <tr key={i}>
                            <td>
                                <strong>{f[i] || (
                                    <>F<sub>{i + 1}</sub></>
                                )},</strong>
                            </td>

                            <td>
                                <strong>
                                    {x[i - 1] || (
                                        <>x<sub>{i}</sub></>
                                    )} &lt; x &le; {x[i] || (
                                    <>x<sub>{i + 1}</sub></>
                                )}
                                </strong>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td>
                            <strong>{f[3] || (
                                <>F<sub>4</sub></>
                            )},</strong>
                        </td>

                        <td>
                            <strong>x &gt; {x[2] || (
                                <>x<sub>3</sub></>
                            )}</strong>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <br />

                Найдите вероятность того, что <strong>&#958; &isin; [{a || 'a'}, {b || 'b'}]</strong>.

                <br />
                <br />

                <Accordion>
                    <AccordionTab header="Методика решения">
                        Значения брать из функции, которая будет описана перед заданием.

                        <br />
                        <br />

                        <Fieldset legend="Пример">
                            <div style={{ textAlign: 'center' }}>
                                <img src={exampleImage} alt="картинка из примера" className="max-width-100" />
                            </div>

                            В примере: <strong>&#958; &isin; [0.5, 1]</strong><br />
                            <InputText readOnly style={{ width: '100%' }}
                                       value="F(1 + 0.00001) - F(0.5) = 0.5 - 0.25 = 0.25" />
                        </Fieldset>
                    </AccordionTab>
                </Accordion>
            </>
        );
    }

    private onFChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const f = [...this.state.f] as [string, string, string, string];

            f[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, f });
        }
    }

    private onXChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const x = [...this.state.x] as [string, string, string];

            x[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, x });
        }
    }

    private onStateChange(param: 'a' | 'b') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: e.currentTarget.value.trim(),
            });
        }
    }

    protected renderFinalParameters() {
        const { f, x, a, b } = this.state;

        return (
            <>
                {[0, 1, 2, 3].map(i =>
                    <div key={i} className="p-inputgroup margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>F<sub>{i + 1}</sub></strong>
                        </span>

                        <InputText type="number" value={f[i]} onChange={this.onFChange(i)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(f[i])} />
                        </span>
                    </div>
                )}

                {[0, 1, 2].map(i =>
                    <div key={i} className="p-inputgroup margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>x<sub>{i + 1}</sub></strong>
                        </span>

                        <InputText type="number" value={x[i]} onChange={this.onXChange(i)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(x[i])} />
                        </span>
                    </div>
                )}

                <div className="p-inputgroup margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>a</strong>
                    </span>

                    <InputText type="number" value={a} onChange={this.onStateChange('a')} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(a)} />
                    </span>
                </div>

                <div className="p-inputgroup margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>b</strong>
                    </span>

                    <InputText type="number" value={b} onChange={this.onStateChange('b')} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(b)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { f, x, a, b } = this.state;

        const F = (v: number): number => {
            if (v <= +x[0]) {
                return +f[0];
            } else if (v <= +x[1]) {
                return +f[1]
            } else if (v <= +x[2]) {
                return +f[2];
            } else {
                return +f[3];
            }
        };

        return (
            <>
                Ответ:{' '}
                <div className="p-inputgroup margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>P(&#958; &isin; [{a}, {b}])</strong> =
                    </span>

                    <InputText readOnly value={F(+b + 0.0001) - F(+a)} />
                </div>
            </>
        );
    }
}
