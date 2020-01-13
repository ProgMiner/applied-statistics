import React from 'react';

import { Task } from '../../../components/Task/Task';
import { Fieldset } from 'primereact/fieldset';

export abstract class FinalTask<P = {}, S = {}> extends Task<P, S> {

    protected renderParameters() {
        return (
            <>
                <Fieldset legend="Условие задачи" className="margin-bottom">
                    {this.renderProblem()}
                </Fieldset>

                {this.renderFinalParameters()}
            </>
        );
    }

    protected abstract renderProblem(): React.ReactNode;
    protected abstract renderFinalParameters(): React.ReactNode;
}
