import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/api';

import { DistributionType } from '../../utils/distribution';
import { ValidationIcon } from '../ValidationIcon/ValidationIcon';

export interface InputDistributionTypeProps {

    value?: DistributionType,

    onChange(value?: DistributionType): void;
}

export class InputDistributionType extends React.Component<InputDistributionTypeProps> {

    static defaultProps: InputDistributionTypeProps = { onChange() {} };

    private static selectItems: SelectItem[] = [
        { label: 'Бернулли', value: DistributionType.BERNOULLI },
        { label: 'Биноминальное', value: DistributionType.BINOMIAL },
        { label: 'Геометрическое', value: DistributionType.GEOMETRIC },
        { label: 'Пуассона', value: DistributionType.POISSON },
        { label: 'Равномерное', value: DistributionType.UNIFORM },
        { label: 'Показательное', value: DistributionType.EXPONENTIAL },
        { label: 'Нормальное', value: DistributionType.NORMAL }
    ];

    private static mnemonics = new Map<DistributionType, [string, string]>([
        [DistributionType.BERNOULLI, ['B', 'p']],
        [DistributionType.BINOMIAL, ['Bin', 'n,p']],
        [DistributionType.GEOMETRIC, ['G', 'p']],
        [DistributionType.POISSON, ['\u03A0', '\u03BB']],
        [DistributionType.UNIFORM, ['U', 'a,b']],
        [DistributionType.EXPONENTIAL, ['Exp', '\u03BB']],
        [DistributionType.NORMAL, ['N', 'a,\u03C3\u00B2']],
    ]);

    private static dropdownTemplate(option: SelectItem): React.ReactNode {
        const mnemonic = InputDistributionType.mnemonics.get(option.value)!;

        return (<>{option.label}&nbsp;(<strong>{mnemonic[0]}<sub>{mnemonic[1]}</sub></strong>)</>);
    }

    render() {
        return (
            <>
                <Dropdown itemTemplate={InputDistributionType.dropdownTemplate}
                          options={InputDistributionType.selectItems} value={this.props.value}
                          onChange={(e: { value: DistributionType }) => this.props.onChange(e.value)} />
                <ValidationIcon valid={!!this.props.value} />
            </>
        );
    }
}
