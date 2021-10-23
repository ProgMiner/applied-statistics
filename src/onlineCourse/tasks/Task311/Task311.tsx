import React from 'react';
import {InputText} from 'primereact/inputtext';

import {Task} from '../../../components/Task/Task';
import {ValidationIcon} from '../../../components/ValidationIcon/ValidationIcon';
import {verifyNumber} from '../../../utils/verifyNumber';
import {verifyInteger} from '../../../utils/verifyInteger';
import {Fieldset} from "primereact/fieldset";

interface Task311State {

    tank: string;
    tank_less: string;
    tank_no_less: string;
    tank_no_more: string;
}

export class Task311 extends Task<Task311State> {

    state: Task311State = {
        tank: "",
        tank_less: '',
        tank_no_less: '',
        tank_no_more: ''
    };

    protected checkParameters(): boolean {
        const { tank, tank_less, tank_no_less, tank_no_more } = this.state;

        return verifyInteger(tank) && verifyInteger(tank_less) &&
            verifyInteger(tank_no_less) && verifyInteger(tank_no_more);
    }


    private onTankChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            tank: e.currentTarget.value.trim()
        });
    }

    private onTankLessChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            tank_less: e.currentTarget.value.trim()
        });
    }

    private onTankNoLessChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            tank_no_less: e.currentTarget.value.trim()
        });
    }

    private onTankNoMoreChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            tank_no_more: e.currentTarget.value.trim()
        });
    }

    protected renderParameters() {
        const { tank, tank_less, tank_no_less, tank_no_more } = this.state;

        return (
            <>
                <Fieldset legend={
                    <strong>Первое задание</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Обьем цистены на станции (тонн) =
                        </span>

                        <InputText type="number" value={tank} onChange={this.onTankChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(tank)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Цистерна меньше чем (тонн) =
                        </span>

                        <InputText type="number" value={tank_less} onChange={this.onTankLessChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(tank_less)} />
                        </span>
                    </div>
                </Fieldset>


                <Fieldset legend={
                    <strong>Второе задание</strong>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Цистерна не меньше чем (тонн) =
                        </span>

                        <InputText type="number" value={tank_no_less} onChange={this.onTankNoLessChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(tank_no_less)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            Цистерна не больше чем (тонн) =
                        </span>

                        <InputText type="number" value={tank_no_more} onChange={this.onTankNoMoreChange.bind(this)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(tank_no_more)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { tank, tank_less, tank_no_less, tank_no_more } = this.state;

        const difference = parseFloat(tank_no_more) - parseFloat(tank_no_less);

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>Вероятность того, что в цистерне меньше {tank_less} тонн бензина:</strong>
                    </span>
                    <InputText readOnly value={tank_less + "/" + tank} />
                </div>

                <br />

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>Вероятность того, что в цистерне не меньше {tank_no_less} тонн, но не больше {tank_no_more} тонн бензина:</strong>
                    </span>

                    <InputText readOnly value={difference + "/" + tank} />
                </div>
            </>
        );
    }
}