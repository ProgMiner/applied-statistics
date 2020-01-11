import React from 'react';
import { InputText } from 'primereact/inputtext';
import isEqual from 'lodash/isEqual';

import { Task } from '../../components/Task/Task';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../utils/verifyNumber';
import { Fieldset } from 'primereact/fieldset';

interface Task511State {

    e: [string, string, string, string];
    p: [string, string, string, string];
    expr: {
        a: string;
        b: string;
        p: string;
    }
}

export class Task511 extends Task<{}, Task511State> {

    state: Task511State = {
        e: ['', '', '', ''],
        p: ['', '', '', ''],
        expr: { a: '', b: '', p: '' }
    };

    private static checkRow(row: [string, string, string, string]) {
        return row.filter(verifyNumber).map(Number).length === 4;
    }

    protected checkParameters(): boolean {
        const { e, p, expr } = this.state;

        return Task511.checkRow(e) && Task511.checkRow(p) &&
            verifyNumber(expr.a) && verifyNumber(expr.b) && verifyNumber(expr.p);
    }

    private onRowChange(param: 'e' | 'p', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const row = [...this.state[param]];

            row[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [param]: row });
        };
    }

    private onExprChange(param: 'a' | 'b' | 'p') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                expr: {
                    ...this.state.expr,

                    [param]: e.currentTarget.value.trim()
                }
            });
        };
    }

    protected renderParameters() {
        const { e, p, expr } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#958;
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText value={e[i]} onChange={this.onRowChange('e', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task511.checkRow(e)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        P
                    </span>

                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText value={p[i]} onChange={this.onRowChange('p', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task511.checkRow(p)} />
                    </span>
                </div>

                <Fieldset legend={
                    <>&#951; = {expr.a || 'a'} &#8901; &#958;<sup>{expr.p || 'p'}</sup> + {expr.b || 'b'}</>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            a =
                        </span>

                        <InputText value={expr.a} onChange={this.onExprChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(expr.a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            p =
                        </span>

                        <InputText value={expr.p} onChange={this.onExprChange('p')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(expr.p)} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            b =
                        </span>

                        <InputText value={expr.b} onChange={this.onExprChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(expr.b)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, p, expr } = this.state;

        const n: { value: number, p: number }[] = [];
        for (let i = 0; i < 4; ++i) {
            n.push({
                value: +expr.a * (+e[i]) ** +expr.p + +expr.b,
                p: +p[i]
            });
        }

        n.sort((a, b) => a.value - b.value);
        const reducedN = n.reduce((a: { value: number, p: number }[], b) => {
            const ret = a.map(a => a.value === b.value ? { value: a.value, p: a.p + b.p } : a);

            if (isEqual(a, ret)) {
                ret.push(b);
            }

            return ret;
        }, []);

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#951; = {expr.a || 'a'} &#8901; &#958;<sup>{expr.p || 'p'}</sup> + {expr.b || 'b'}
                    </span>

                    {reducedN.map((v, i) => (
                        <React.Fragment key={v.value}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText readOnly value={v.value} />
                        </React.Fragment>
                    ))}
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        P
                    </span>

                    {reducedN.map((v, i) => (
                        <React.Fragment key={v.value}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText readOnly value={v.p} />
                        </React.Fragment>
                    ))}
                </div>
            </>
        );
    }
}
