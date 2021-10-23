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

interface Task111State {

    n: string;
    p: string;
    leftExpr: string;
    rightExpr: string;
}

export class Task111 extends Task<Task111State> {

    state: Task111State = { n: '', p: '', leftExpr: '', rightExpr: '' };

    protected checkParameters(): boolean {

        return false;
    }

    protected renderParameters() {

        return (
            <>
            </>
        );
    }

    protected async renderAnswer() {

        return (
            <div className="p-inputgroup">

            </div>
        );
    }
}