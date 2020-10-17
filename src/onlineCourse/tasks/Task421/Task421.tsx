import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';

interface Task421State {

    a: string;
    b: string;
    leftExpr: string;
    rightExpr: string;
}

export class Task421 extends Task<Task421State> {

    state: Task421State = { a: '', b: '', leftExpr: '', rightExpr: '' };

    private onStateChange(param: 'a' | 'b' | 'leftExpr' | 'rightExpr', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { a, b, leftExpr, rightExpr } = this.state;

        return verifyInteger(a) && verifyNumber(b) && leftExprRegexp.test(leftExpr) && rightExprRegexp.test(rightExpr);
    }

    protected renderParameters() {
        const { a, b, leftExpr, rightExpr } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>U<sub>{a || 'a'}, {b || 'b'}</sub></strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a} onChange={this.onStateChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>b</strong> =
                        </span>

                        <InputText type="number" value={b} onChange={this.onStateChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
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
        const { a, b, leftExpr, rightExpr } = this.state;

        const cleanedLeftExpr = leftExpr.replace(/\s/, '');
        const cleanedRightExpr = rightExpr.replace(/\s/, '');

        if (!!cleanedLeftExpr && cleanedRightExpr.includes('>')) {
            return (
                <>Введены некорректные данные</>
            );
        }

        const { k1, k2 } = parseExpression(cleanedLeftExpr, cleanedRightExpr, +a, +b);

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>P({k1} &le; &#958; &lt; {k2})</strong> =
                    </span>

                    <InputText readOnly value={`${k2 - k1} / ${+b - +a}`} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>&forall;x &notin; [{a}, {b}], f<sub>&#958;</sub>(x)</strong> =
                    </span>

                    <InputText readOnly value="0" />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>&forall;x &isin; [{a}, {b}], f<sub>&#958;</sub>(x)</strong> =
                    </span>

                    <InputText readOnly value={`1 / ${+b - +a}`} />
                </div>
            </>
        );
    }
}
