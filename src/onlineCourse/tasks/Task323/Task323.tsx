import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { functions } from '../../../utils/functions';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { leftExprRegexp, parseExpression, rightExprRegexp } from '../../../utils/parseExpression';
import { DistributionType } from "../../../utils/distribution";
import { verifyStrings } from "../../../utils/verifyStrings";

interface Task323State {

    wtf: string;


}

export class Task323 extends Task<Task323State> {

    state: Task323State = { wtf: ''};


    protected checkParameters(): boolean {
        return false;
    }

    protected renderParameters() {
        return (
            <>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Правильный ответ:  <strong>1 и 6</strong>
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        return (
            <>
            </>
        );
    }
}