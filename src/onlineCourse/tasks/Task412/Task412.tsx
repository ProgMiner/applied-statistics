import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';

interface Task412State {

    p: string;
    leftExpr: string;
    rightExpr: string;
}

export class Task412 extends Task<Task412State> {

    state: Task412State = { p: '', leftExpr: '', rightExpr: '' };

    private onStateChange(param: 'p' | 'leftExpr' | 'rightExpr', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { p, leftExpr, rightExpr } = this.state;

        return verifyNumber(p) && leftExprRegexp.test(leftExpr) && rightExprRegexp.test(rightExpr);
    }

    protected renderParameters() {
        const { p, leftExpr, rightExpr } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>G<sub>{p || 'p'}</sub></strong>
                }>
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
        const { p, leftExpr, rightExpr } = this.state;

        const cleanedLeftExpr = leftExpr.replace(/\s/, '');
        const cleanedRightExpr = rightExpr.replace(/\s/, '');

        if (!!cleanedLeftExpr && cleanedRightExpr.includes('>')) {
            return (
                <>Введены некорректные данные</>
            );
        }

        const { k1, k2 } = parseExpression(cleanedLeftExpr, cleanedRightExpr, 1, 1001);

        let s = 0;
        for (let k = k1; k < k2; ++k) {
            s += (1 - +p) ** (k - 1);
        }

        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <strong>P({k1} &le; &#958; &lt; {k2})</strong> =
                </span>

                <InputText readOnly value={normalizeNumber(+p * s)} />
            </div>
        );
    }
}
