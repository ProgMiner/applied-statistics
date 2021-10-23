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
import {verifyStrings} from "../../../utils/verifyStrings";

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

    protected checkParameters(): boolean {
        const { faces, type_num, num_more, type_num_more } = this.state;

        return verifyInteger(faces) && verifyInteger(num_more) && verifyStrings(type_num) && verifyStrings(type_num_more)
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
                                Какое число выпало (четное/нечетное) =
                            </span>

                        <InputText type="text" value={type_num} onChange={this.onTypeNumChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                                <ValidationIcon valid={verifyNumber(type_num)} />
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
                                <ValidationIcon valid={verifyNumber(type_num_more)} />
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

        const faces_int = parseInt(faces)
        let sum_faces = 0;
        let type_sum = 0;
        let count_num_more = 0

        if (faces_int < +num_more){ return (<> Число в 3 задании не может быть больше чем граний у кубика</>); }


        for (let i = 1; i <= faces_int; i++){
            sum_faces += i;
            if (type_num.trim().toLowerCase() === "четное"){
                if (i % 2 == 0) {
                    type_sum += i;
                }
            } else if (type_num.trim().toLowerCase() === "нечетное"){
                if (i % 2 != 0) {
                    type_sum += i;
                }
            } else {
                return (<> Какое число выпало (четное/нечетное) </>);
            }

            if (type_num_more.trim().toLowerCase() === "больше"){
                if (i > +num_more){
                    count_num_more++;
                }
            } else if (type_num_more.trim().toLowerCase() === "меньше"){
                if (i < +num_more){
                    count_num_more++;
                }
            } else {
                return (<> Какое число выпало (больше/меньше) </>);
            }
        }


        return (
            <>
                <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Число <strong>k</strong>:
                        </span>

                    <InputText readOnly value={1 + "/" + sum_faces} />
                </div>

                <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Вероятность события «выпало <strong>{type_num.trim().toLowerCase()}</strong> число»:
                        </span>

                    <InputText readOnly value={type_sum + "/" + sum_faces} />
                </div>

                <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Состоит «выпало число <strong>{type_num_more.trim().toLowerCase()}</strong>, чем <strong>{num_more}</strong>» из собитый:
                        </span>

                    <InputText readOnly value={count_num_more} />
                </div>
            </>
        );
    }
}