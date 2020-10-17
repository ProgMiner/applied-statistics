import React from 'react';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { calcVariance, Distribution, renderDistribution } from '../../../utils/distribution';
import { InputDistribution } from '../../../components/InputDistribution/InputDistribution';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';

interface Task5State {

    e?: Distribution;
    n?: Distribution;

    a: string;
    b: string;
    c: string;
}

export class Task5 extends FinalTask<Task5State> {

    state: Task5State = { a: '', b: '', c: '' };

    private onDistributionChange(param: 'e' | 'n') {
        return (distribution?: Distribution) => {
            this.setState({ ...this.state, [param]: distribution });
        };
    }

    protected checkParameters(): boolean {
        const { e, n, a, b } = this.state;

        return !!e && !!n && verifyNumber(a) && verifyNumber(b);
    }

    protected renderProblem() {
        const { e, n } = this.state;

        return (
            <>
                Пусть случайная величина <strong>&#958;</strong> имеет распределение{' '}
                <strong>{renderDistribution(e, '?')}</strong>, а случайная величина{' '}
                <strong>&#951;</strong> имеет распределение <strong>{renderDistribution(n, '?')}</strong>,{' '}
                причем <strong>&#958;</strong> и <strong>&#951;</strong> независимы.
            </>
        );
    }

    private onChangeState(param: 'a' | 'b' | 'c') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: e.currentTarget.value.trim()
            });
        }
    }

    protected renderFinalParameters() {
        const { e, n, a, b, c } = this.state;

        return (
            <>
                <strong>&#958; ~</strong><br />
                <InputDistribution value={e} onChange={this.onDistributionChange('e')} />

                <br />

                <strong>&#951; ~</strong><br />
                <InputDistribution value={n} onChange={this.onDistributionChange('n')} />

                <Fieldset legend={(
                    <>
                        Найдите <strong>D({a || 'a'}&#958; + {b || 'b'}&#951; + {c || 'c'})</strong>
                    </>
                )}>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={a} onChange={this.onChangeState('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>b</strong> =
                        </span>

                        <InputText type="number" value={b} onChange={this.onChangeState('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            <strong>c</strong> =
                        </span>

                        <InputText type="number" value={c} onChange={this.onChangeState('c')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(c)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, n, a, b, c } = this.state;

        if (!e || !n) {
            return;
        }

        return (
            <>
                Найдите <strong>D({a}&#958; + {b}&#951; + {c || 'c'})</strong>:{' '}
                <InputText value={(+a) ** 2 * calcVariance(e) + (+b) ** 2 * calcVariance(n)} />
            </>
        );
    }
}
