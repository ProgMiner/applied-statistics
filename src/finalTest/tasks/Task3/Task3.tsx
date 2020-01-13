import React from 'react';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import exampleImage from './example.png';

interface Task3State {

    rendered?: true;
}

export class Task3 extends FinalTask<{}, Task3State> {

    state: Task3State = {};

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,

                rendered: true
            });
        });
    }

    protected checkParameters(): boolean {
        return true;
    }

    protected renderProblem() {
        return (
            <>
                Функция распределения случайной величины <strong>&#958;</strong> задана соотношением.<br />
                Найдите вероятность того, что <strong>&#958; &isin; [a, b]</strong>.
            </>
        );
    }

    protected renderFinalParameters() {
        return undefined;
    }

    protected async renderAnswer() {
        return (
            <>
                Ответ:{' '}
                <InputText readOnly value="F(b + 0.00001) - F(a)" />

                <br />
                <br />

                Значения брать из функции, которая будет описана перед заданием.

                <br />
                <br />

                <Fieldset legend="Пример">
                    <div style={{ textAlign: 'center' }}>
                        <img src={exampleImage} alt="картинка из примера" />
                    </div>

                    В примере: <strong>&#958; &isin; [0.5, 1]</strong><br />
                    <InputText readOnly style={{ width: '100%' }} value="F(1 + 0.00001) - F(0.5) = 0.5 - 0.25 = 0.25" />
                </Fieldset>
            </>
        );
    }
}
