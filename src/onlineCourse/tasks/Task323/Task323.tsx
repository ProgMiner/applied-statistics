import React from 'react';

import { Task } from '../../../components/Task/Task';


export class Task323 extends Task {

    state = {};

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
        return (<></>);
    }
}
