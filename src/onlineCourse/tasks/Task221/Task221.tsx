import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';

interface Task221State {

    seeds_1: string;
    chance_1: string;
    min_seeds_1: string;

}

export class Task221 extends Task<Task221State> {

    state: Task221State = { seeds_1: '', chance_1: '', min_seeds_1: '' };

    private onStateChange(param: 'seeds_1' | 'chance_1' | 'min_seeds_1', trim: boolean = true) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: trim ? e.currentTarget.value.trim() : e.currentTarget.value
            });
        };
    }

    protected checkParameters(): boolean {
        const { seeds_1, chance_1, min_seeds_1 } = this.state;

        return verifyInteger(seeds_1) && verifyNumber(chance_1) && verifyInteger(min_seeds_1);
    }

    protected renderParameters() {
        const { seeds_1, chance_1, min_seeds_1 } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Кол-во <strong>семян</strong> =
                        </span>

                    <InputText type="number" value={seeds_1} onChange={this.onStateChange('seeds_1')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(seeds_1)} />
                        </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Вероятность прижиться <strong>семян</strong> =
                        </span>

                    <InputText type="number" value={chance_1} onChange={this.onStateChange('chance_1')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(chance_1)} />
                        </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Прижиться <strong>не менее N семян</strong> =
                        </span>

                    <InputText type="number" value={min_seeds_1} onChange={this.onStateChange('min_seeds_1')} />

                    <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(min_seeds_1)} />
                        </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { seeds_1, chance_1, min_seeds_1 } = this.state;


        let Bernoulli = 0;


        console.log(Bernoulli)

        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <strong>g</strong> =
                </span>

                <InputText readOnly value={seeds_1} />
            </div>
        );
    }
}