import React from 'react';
import { InputText } from 'primereact/inputtext';
import mapValues from 'lodash/mapValues';
import isEqual from 'lodash/isEqual';

import { Distribution, DistributionType } from '../../utils/distribution';
import { filterObject } from '../../utils/filterObject';
import { ValidationIcon } from '../ValidationIcon/ValidationIcon';
import { InputDistributionType } from '../InputDistributionType/InputDistributionType';
import { verifyNumber } from '../../utils/verifyNumber';
import { verifyInteger } from '../../utils/verifyInteger';

export interface InputDistributionProps {

    value?: Distribution;
    normalSigmaSquare: boolean;
    exclude: DistributionType[];

    onChange(value?: Distribution): void;
}

interface InputDistributionState {

    distributionType?: DistributionType;
    distributionParams: { [key: string]: string };
}

export class InputDistribution extends React.Component<InputDistributionProps, InputDistributionState> {

    static defaultProps: InputDistributionProps = {

        normalSigmaSquare: true,
        exclude: [],

        onChange() {}
    };

    state: InputDistributionState = { distributionParams: {} };

    componentDidUpdate(
        prevProps: Readonly<InputDistributionProps>,
        prevState: Readonly<InputDistributionState>,
        snapshot?: any
    ) {
        if (!isEqual(this.props.value, prevProps.value) && this.props.value) {
            this.setState({
                ...this.state,

                distributionType: this.props.value.type,
                distributionParams: {
                    ...this.state.distributionParams,

                    ...mapValues(this.props.value.params, String)
                }
            });
        }

        if (!isEqual(this.state, prevState)) {
            this.onDistributionChange();
        }
    }

    private onDistributionTypeChange(distributionType: DistributionType) {
        this.setState({ ...this.state, distributionType });
    }

    private onDistributionParamChange(param: string) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                distributionParams: {
                    ...this.state.distributionParams,

                    [param]: e.currentTarget.value.trim()
                }
            });
        };
    }

    private onDistributionChange() {
        const { distributionType, distributionParams } = this.state;

        const numericParams = mapValues(filterObject(distributionParams, verifyNumber), Number);
        let newDistribution: Distribution | undefined;
        switch (distributionType) {
            case DistributionType.BERNOULLI:
                if (numericParams.p !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: { p: numericParams.p }
                    };
                }
                break;

            case DistributionType.BINOMIAL:
                if (numericParams.n !== undefined && numericParams.p !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            n: numericParams.n,
                            p: numericParams.p
                        }
                    };
                }
                break;

            case DistributionType.GEOMETRIC:
                if (numericParams.p !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: { p: numericParams.p }
                    };
                }
                break;

            case DistributionType.POISSON:
                if (numericParams.l !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: { l: numericParams.l }
                    };
                }
                break;

            case DistributionType.UNIFORM:
                if (numericParams.a !== undefined && numericParams.b !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            a: numericParams.a,
                            b: numericParams.b
                        }
                    };
                }
                break;

            case DistributionType.EXPONENTIAL:
                if (numericParams.l !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: { l: numericParams.l }
                    };
                }
                break;

            case DistributionType.NORMAL:
                if (numericParams.a !== undefined && numericParams.d !== undefined) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            a: numericParams.a,
                            d: numericParams.d
                        }
                    };
                }
                break;
        }

        this.props.onChange(newDistribution);
    }

    render() {
        const { normalSigmaSquare, exclude } = this.props;
        const { distributionType, distributionParams } = this.state;

        const params: { name: string, field: string, integer?: true }[] = [];
        switch (distributionType) {
            case DistributionType.BERNOULLI:
                params.push({ name: 'p', field: 'p' });
                break;

            case DistributionType.BINOMIAL:
                params.push({ name: 'n', field: 'n', integer: true });
                params.push({ name: 'p', field: 'p' });
                break;

            case DistributionType.GEOMETRIC:
                params.push({ name: 'p', field: 'p' });
                break;

            case DistributionType.POISSON:
                params.push({ name: '\u03BB', field: 'l' });
                break;

            case DistributionType.UNIFORM:
                params.push({ name: 'a', field: 'a' });
                params.push({ name: 'b', field: 'b' });
                break;

            case DistributionType.EXPONENTIAL:
                params.push({ name: '\u03BB', field: 'l' });
                break;

            case DistributionType.NORMAL:
                params.push({ name: 'a', field: 'a' });
                params.push({ name: '\u03C3' + (normalSigmaSquare ? '\u00B2' : ''), field: 'd' });
                break;
        }

        const paramsComponents: JSX.Element[] = params
            .map(param => {
                const value = distributionParams[param.field] ?? '';

                return (
                    <div key={param.name} className="p-inputgroup half-margin-bottom-not-last">
                        <span className="p-inputgroup-addon">
                            <strong>{param.name}</strong> =
                        </span>

                        <InputText type="number" value={value} onChange={this.onDistributionParamChange(param.field)} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={param.integer ? verifyInteger(value) : verifyNumber(value)} />
                        </span>
                    </div>
                );
            });

        return (
            <>
                <div className="p-inputgroup half-margin-bottom-not-last">
                    <span className="p-inputgroup-addon">
                        Распределение:
                    </span>

                    <InputDistributionType exclude={exclude} value={this.state.distributionType}
                                           onChange={this.onDistributionTypeChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={!!this.state.distributionType} />
                    </span>
                </div>

                {paramsComponents}
            </>
        );
    }
}
