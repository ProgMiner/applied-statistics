import React from 'react';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { verifyNumber } from '../../../utils/verifyNumber';
import { InputText } from 'primereact/inputtext';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';

interface Task1State {

    white: string;
    red: string;
}

export class Task1 extends FinalTask<Task1State> {

    state: Task1State = { white: '', red: '' };

    protected checkParameters(): boolean {
        const { white, red } = this.state;

        return verifyNumber(white) && verifyNumber(red);
    }

    protected renderProblem() {
        const { white, red } = this.state;

        return (
            <>
                В корзине <strong>{white || '?'}</strong> белых и <strong>{red || '?'}</strong> красных шаров.{' '}
                Из корзины наудачу вытащили один шар и, не смотря на его цвет, отложили в сторону,{' '}
                а затем вытащили еще один шар.
            </>
        );
    }

    private onChangeState(param: 'white' | 'red') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: e.currentTarget.value.trim()
            });
        }
    }

    protected renderFinalParameters() {
        const { white, red } = this.state;

        return (
            <>
                Количество белых шаров:{' '}
                <div className="p-inputgroup margin-bottom">
                    <InputText type="number" value={white} onChange={this.onChangeState('white')} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(white)} />
                    </span>
                </div>

                Количество красных шаров:{' '}
                <div className="p-inputgroup">
                    <InputText type="number" value={red} onChange={this.onChangeState('red')} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(red)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { white, red } = this.state;

        return (
            <>
                Какова вероятность, что вытащенный шар — красный?
                <br />

                <InputText readOnly value={`${red} / (${white} + ${red})`} />

                <br />
                <br />

                Пусть вторым вытащен красный шар. Какова вероятность, что первым вытащен белый?
                <br />

                <InputText readOnly value={`${white} / (${white} + ${red} - 1)`} />
            </>
        );
    }
}
