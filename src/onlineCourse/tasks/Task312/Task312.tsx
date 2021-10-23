import React from 'react';
import {InputText} from 'primereact/inputtext';

import {Task} from '../../../components/Task/Task';
import {ValidationIcon} from '../../../components/ValidationIcon/ValidationIcon';
import {verifyNumber} from '../../../utils/verifyNumber';
import {verifyInteger} from '../../../utils/verifyInteger';
import {Fieldset} from "primereact/fieldset";

interface Task312State {

    y: string
    xy_no_less: string;
}

export class Task312 extends Task<Task312State> {

    state: Task312State = {
        y: '',
        xy_no_less: ''
    };

    protected checkParameters(): boolean {
        const { y, xy_no_less } = this.state;

        return verifyInteger(y) && verifyInteger(xy_no_less);
    }


    private onYChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            y: e.currentTarget.value.trim()
        });
    }

    private onXYnoLessChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            xy_no_less: e.currentTarget.value.trim()
        });
    }

    protected renderParameters() {
        const { y, xy_no_less } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Два положительных числа <strong>x, y &isin; (0; ?)</strong> (введите y) =
                    </span>

                    <InputText type="number" value={y} onChange={this.onYChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(y)} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Произведение <strong>xy</strong> не больше =
                    </span>

                    <InputText type="number" value={xy_no_less} onChange={this.onXYnoLessChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(xy_no_less)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { y, xy_no_less } = this.state;

        const y1 = parseInt(y)
        const xy = parseInt(xy_no_less)

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>Вероятность того, что произведение не больше {xy_no_less}:</strong>
                    </span>
                    <InputText readOnly value={(xy / 2 + xy * (Math.log(y1) - Math.log(xy / y1))) / (y1 * y1)} />
                </div>
            </>
        );
    }
}