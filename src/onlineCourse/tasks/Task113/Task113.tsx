import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { range } from 'lodash';

interface Task113State {

    faces: string;
    type_num: string;
    type_num_more: string;
    num_more: string;
}

export class Task113 extends Task<Task113State> {

    state: Task113State = {
        faces: '',
        type_num: '',
        type_num_more: '',
        num_more: ''
    };

    private static normalizeOddEvenType(t: string) {
        return t.trim().toLowerCase().replaceAll('ё', 'е');
    }

    private static verifyOddEvenType(t: string) {
        return ['четное', 'нечетное'].includes(this.normalizeOddEvenType(t));
    }

    private static verifyGreaterLowerType(t: string) {
        return ['больше', 'меньше'].includes(t.trim().toLowerCase());
    }

    protected checkParameters(): boolean {
        const { faces, type_num, num_more, type_num_more } = this.state;

        return verifyInteger(faces) && verifyInteger(num_more) && Task113.verifyOddEvenType(type_num)
            && Task113.verifyGreaterLowerType(type_num_more);
    }

    protected renderParameters() {
        const { faces, type_num, num_more, type_num_more } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Кол-во граней кубика =
                    </span>

                    <InputText type="number" value={faces} onChange={this.onFacesChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(faces)} />
                    </span>
                </div>

                <Fieldset legend={
                    <strong>Второе задание</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Какое число выпало (чётное/нечётное):
                        </span>

                        <InputText type="text" value={type_num} onChange={this.onTypeNumChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={Task113.verifyOddEvenType(type_num)} />
                        </span>
                    </div>
                </Fieldset>

                <Fieldset legend={
                    <strong>Третье задание</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Какое число выпало (больше/меньше) =
                        </span>

                        <InputText type="text" value={type_num_more} onChange={this.onTypeNumMoreChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={Task113.verifyGreaterLowerType(type_num_more)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Выпало число =
                        </span>

                        <InputText type="number" value={num_more} onChange={this.onNumMoreChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(num_more)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { faces, type_num, num_more, type_num_more } = this.state;

        const faces_int = parseInt(faces);
        const sum_faces = range(1, faces_int + 1).reduce((a, b) => a + b);

        const type_sum_flt = Task113.normalizeOddEvenType(type_num) === 'четное'
            ? (i: number) => i % 2 === 0 : (i: number) => i % 2 !== 0;
        const type_sum = range(1, faces_int + 1).filter(type_sum_flt).reduce((a, b) => a + b);

        const count_num_more = Math.min(Math.max(type_num_more.trim().toLowerCase() === 'больше'
            ? faces_int - +num_more : +num_more - 1, 0), faces_int);

        if (faces_int < +num_more) {
            return (<>Число в 3 задании не может быть больше чем граний у кубика</>);
        }

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Число <strong>k</strong>:
                    </span>

                    <InputText readOnly value={1 + '/' + sum_faces} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Вероятность события «выпало <strong>{type_num.trim().toLowerCase()}</strong> число»:
                    </span>

                    <InputText readOnly value={type_sum + '/' + sum_faces} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Состоит «выпало число <strong>{type_num_more.trim().toLowerCase()}</strong>,{' '}
                        чем <strong>{num_more}</strong>» из событий:
                    </span>

                    <InputText readOnly value={count_num_more} />
                </div>
            </>
        );
    }

    private onFacesChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            faces: e.currentTarget.value.trim()
        });
    }

    private onTypeNumChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            type_num: e.currentTarget.value.trim()
        });
    }

    private onTypeNumMoreChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            type_num_more: e.currentTarget.value.trim()
        });
    }

    private onNumMoreChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            num_more: e.currentTarget.value.trim()
        });
    }
}
