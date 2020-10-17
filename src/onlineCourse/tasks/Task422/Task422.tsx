import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';

interface Task422State {

    l: string;
    leftExpr: string;
    rightExpr: string;
}

export class Task422 extends Task<Task422State> {

    state: Task422State = { l: '', leftExpr: '', rightExpr: '' };

    private onStateChange(param: 'l' | 'leftExpr' | 'rightExpr', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { l, leftExpr, rightExpr } = this.state;

        return verifyNumber(l) && leftExprRegexp.test(leftExpr) && rightExprRegexp.test(rightExpr);
    }

    protected renderParameters() {
        const { l, leftExpr, rightExpr } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>Exp<sub>{l || '\u03bb'}</sub></strong>
                }>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>&#955;</strong> =
                        </span>

                        <InputText type="number" value={l} onChange={this.onStateChange('l')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(l)} />
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
        const { l, leftExpr, rightExpr } = this.state;

        const cleanedLeftExpr = leftExpr.replace(/\s/, '');
        const cleanedRightExpr = rightExpr.replace(/\s/, '');

        if (!!cleanedLeftExpr && cleanedRightExpr.includes('>')) {
            return (
                <>Введены некорректные данные</>
            );
        }

        const { k1, k2 } = parseExpression(cleanedLeftExpr, cleanedRightExpr, 0, Infinity);
        const F = (x: number): number => {
            if (x < 0) {
                return 0;
            } else {
                return 1 - Math.exp(-l * x);
            }
        };

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>P({k1} &le; &#958; &lt; {k2})</strong> =
                    </span>

                    <InputText readOnly value={normalizeNumber(F(k2) - F(k1 - 1))} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>&forall;x &le; 0, f<sub>&#958;</sub>(x)</strong> =
                    </span>

                    <InputText readOnly value="0" />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>&forall;x &gt; 0, f<sub>&#958;</sub>(x)</strong> =
                    </span>

                    <InputText readOnly value={`1 - exp(${-l} * x)`} />
                </div>
            </>
        );
    }
}
