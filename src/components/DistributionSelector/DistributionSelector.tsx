import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/api';
import mapValues from 'lodash/mapValues';
import isEqual from 'lodash/isEqual';

import { Distribution, DistributionType, distributionTypesSelectItems } from '../../utils/distribution';
import { filterObject } from '../../utils/filterObject';
import { ValidationIcon } from '../ValidationIcon/ValidationIcon';

export interface DistributionSelectorProps {

    value?: Distribution;
    normalSigmaSquare: boolean;

    onChange(value?: Distribution): void;
}

interface DistributionSelectorState {

    distributionType?: DistributionType;
    distributionParams: { [key: string]: string | undefined };
}

export class DistributionSelector extends React.Component<DistributionSelectorProps, DistributionSelectorState> {

    static defaultProps: DistributionSelectorProps = {

        normalSigmaSquare: true,

        onChange() {}
    };

    state: DistributionSelectorState = { distributionParams: {} };

    componentDidUpdate(
        prevProps: Readonly<DistributionSelectorProps>,
        prevState: Readonly<DistributionSelectorState>,
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

    private onDistributionTypeChange(value: SelectItem) {
        this.setState({
            ...this.state,

            distributionType: value.value as DistributionType
        });
    }

    private onDistributionParamChange(param: string, event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            distributionParams: {
                ...this.state.distributionParams,

                [param]: event.currentTarget.value
            }
        });
    }

    private onDistributionChange() {
        const { distributionType, distributionParams } = this.state;

        let newDistribution: Distribution | undefined;
        const numericParams = mapValues(
            filterObject(
                mapValues(distributionParams, s => s ? s.trim() : undefined),
                Boolean
            ),
            Number
        );
        switch (distributionType) {
            case DistributionType.BERNOULLI:
                if (!isNaN(numericParams['p'])) {
                    newDistribution = {
                        type: distributionType,
                        params: { p: numericParams['p'] }
                    }
                }
                break;

            case DistributionType.BINOMIAL:
                if (!isNaN(numericParams['n']) && !isNaN(numericParams['p'])) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            n: numericParams['n'],
                            p: numericParams['p']
                        }
                    }
                }
                break;

            case DistributionType.GEOMETRIC:
                if (!isNaN(numericParams['p'])) {
                    newDistribution = {
                        type: distributionType,
                        params: { p: numericParams['p'] }
                    }
                }
                break;

            case DistributionType.POISSON:
                if (!isNaN(numericParams['l'])) {
                    newDistribution = {
                        type: distributionType,
                        params: { l: numericParams['l'] }
                    }
                }
                break;

            case DistributionType.UNIFORM:
                if (!isNaN(numericParams['a']) && !isNaN(numericParams['b'])) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            a: numericParams['a'],
                            b: numericParams['b']
                        }
                    }
                }
                break;

            case DistributionType.EXPONENTIAL:
                if (!isNaN(numericParams['l'])) {
                    newDistribution = {
                        type: distributionType,
                        params: { l: numericParams['l'] }
                    }
                }
                break;

            case DistributionType.NORMAL:
                if (!isNaN(numericParams['a']) && !isNaN(numericParams['d'])) {
                    newDistribution = {
                        type: distributionType,
                        params: {
                            a: numericParams['a'],
                            d: numericParams['d']
                        }
                    }
                }
                break;
        }

        this.props.onChange(newDistribution);
    }

    render() {
        const { normalSigmaSquare } = this.props;
        const { distributionType, distributionParams } = this.state;

        const params: { name: string, field: string }[] = [];
        switch (distributionType) {
            case DistributionType.BERNOULLI:
                params.push({ name: 'p', field: 'p'});
                break;

            case DistributionType.BINOMIAL:
                params.push({ name: 'n', field: 'n'});
                params.push({ name: 'p', field: 'p'});
                break;

            case DistributionType.GEOMETRIC:
                params.push({ name: 'p', field: 'p'});
                break;

            case DistributionType.POISSON:
                params.push({ name: '\u03BB', field: 'l'});
                break;

            case DistributionType.UNIFORM:
                params.push({ name: 'a', field: 'a'});
                params.push({ name: 'b', field: 'b'});
                break;

            case DistributionType.EXPONENTIAL:
                params.push({ name: '\u03BB', field: 'l'});
                break;

            case DistributionType.NORMAL:
                params.push({ name: 'a', field: 'a'});
                params.push({ name: '\u03C3' + (normalSigmaSquare ? '\u00B2' : ''), field: 'd'});
                break;
        }

        const paramsComponents: JSX.Element[] = params
            .map(param => {
                const value = distributionParams[param.field];

                return (
                    <React.Fragment key={param.name}>
                        <strong>{param.name}</strong> =
                        <InputText value={value ?? ''} onChange={e => this.onDistributionParamChange(param.field, e)}/>
                        <ValidationIcon valid={!!value?.trim() && !isNaN(+value)}/>
                        <br/>
                    </React.Fragment>
                );
            });

        return (
            <>
                Распределение:
                <Dropdown value={this.state.distributionType} options={distributionTypesSelectItems}
                          onChange={this.onDistributionTypeChange.bind(this)} />
                <ValidationIcon valid={!!this.state.distributionType} />
                <br />

                {paramsComponents}
            </>
        );
    }
}
