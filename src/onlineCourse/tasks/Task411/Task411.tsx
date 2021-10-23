import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { factorial } from '../../../utils/factorial';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';

interface Task411State {

    n: string;
    p: string;
    leftExpr: string;
    rightExpr: string;
}

export class Task411 extends Task<Task411State> {

    state: Task411State = { n: '', p: '', leftExpr: '', rightExpr: '' };

    private onStateChange(param: 'n' | 'p' | 'leftExpr' | 'rightExpr', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { n, p, leftExpr, rightExpr } = this.state;

        return verifyInteger(n) && verifyNumber(p) && leftExprRegexp.test(leftExpr) && rightExprRegexp.test(rightExpr);
    }

    protected renderParameters() {
        const { n, p, leftExpr, rightExpr } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>Bin({n || 'n'}, {p || 'p'})</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>n</strong> =
                        </span>

                        <InputText type="number" value={n} onChange={this.onStateChange('n')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(n)} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>p</strong> =
                        </span>

                        <InputText type="number" value={p} onChange={this.onStateChange('p')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(p)} />
                        </span>
                    </div>
                </Fieldset>

                <br />

                <strong>В выражении используйте &lt;= для &le;.</strong>

                <br />
                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Выражение:
                    </span>

                    <InputText style={{ textAlign: 'right' }} value={leftExpr}
                               onChange={this.onStateChange('leftExpr', false)} />

                    <span className="p-inputgroup-addon">
                        <strong>&#958;</strong>
                    </span>

                    <InputText value={rightExpr} onChange={this.onStateChange('rightExpr', false)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={leftExprRegexp.test(leftExpr) && rightExprRegexp.test(rightExpr)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { n, p, leftExpr, rightExpr } = this.state;

        const cleanedLeftExpr = leftExpr.replace(/\s/, '');
        const cleanedRightExpr = rightExpr.replace(/\s/, '');

        if (!!cleanedLeftExpr && cleanedRightExpr.includes('>')) {
            return (
                <>Введены некорректные данные</>
            );
        }

        const { k1, k2 } = parseExpression(cleanedLeftExpr, cleanedRightExpr, 0, +n + 1);

        let s = 0;
        for (let k = k1; k < k2; ++k) {
            s += (+p) ** k * (1 - +p) ** (+n - k) / factorial(k) / factorial(+n - k);
        }

        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <strong>P({k1} &le; &#958; &lt; {k2})</strong> =
                </span>

                <InputText readOnly value={normalizeNumber(factorial(+n) * s)} />
            </div>
        );
    }
}