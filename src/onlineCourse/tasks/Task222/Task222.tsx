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

interface Task222State {

    chance_2: string;
    eggs: string;
    min_seeds_2: string;
    max_seeds_2: string;
}

export class Task222 extends Task<Task222State> {

    state: Task222State = { chance_2: '', eggs: '', min_seeds_2: '', max_seeds_2: '' };

    private onStateChange(param: 'chance_2' | 'eggs' | 'min_seeds_2' | 'max_seeds_2', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { chance_2, eggs, min_seeds_2, max_seeds_2 } = this.state;

        return verifyNumber(chance_2) && verifyInteger(eggs) && verifyInteger(min_seeds_2) && verifyInteger(max_seeds_2);
    }

    protected renderParameters() {
        const { chance_2, eggs, min_seeds_2, max_seeds_2 } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>n</strong> =
                        </span>

                    <InputText type="number" value={chance_2} onChange={this.onStateChange('chance_2')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(chance_2)} />
                        </span>
                </div>

            </>
        );
    }

    protected async renderAnswer() {
        const {  chance_2, eggs, min_seeds_2, max_seeds_2  } = this.state;


        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <strong>P(1)</strong> =
                </span>

                <InputText readOnly value={chance_2} />
            </div>
        );
    }
}