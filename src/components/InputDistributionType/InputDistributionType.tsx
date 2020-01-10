import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/api';

import { DistributionType } from '../../utils/distribution';

export interface InputDistributionTypeProps {

    value?: DistributionType;
    exclude: DistributionType[];

    onChange(value?: DistributionType): void;
}

export class InputDistributionType extends React.Component<InputDistributionTypeProps> {

    static defaultProps: InputDistributionTypeProps = { exclude: [], onChange() {} };

    private static selectItems: SelectItem[] = [
        { label: 'Бернулли', value: DistributionType.BERNOULLI },
        { label: 'Биномиальное', value: DistributionType.BINOMIAL },
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
        const { exclude } = this.props;

        return (
            <Dropdown itemTemplate={InputDistributionType.dropdownTemplate} value={this.props.value}
                      options={InputDistributionType.selectItems.filter(v => !exclude.includes(v.value))}
                      onChange={(e: { value: DistributionType }) => this.props.onChange(e.value)} />
        );
    }
}
