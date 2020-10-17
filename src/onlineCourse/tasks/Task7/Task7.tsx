import React from 'react';
import { SelectItem } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import mean from 'lodash/mean';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { sampleVariance } from '../../../utils/sampleVariance';
import { median } from '../../../utils/median';
import { sampleQuantile } from '../../../utils/sampleQuantile';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { verifyInteger } from '../../../utils/verifyInteger';

const citySelectItems: SelectItem[] = [
    { label: 'Алтайский край', value: 0 },
    { label: 'Амурская область', value: 1 },
    { label: 'Архангельская область', value: 2 },
    { label: 'Астраханская область', value: 3 },
    { label: 'Белгородская область', value: 4 },
    { label: 'Брянская область', value: 5 },
    { label: 'Владимирская область', value: 6 },
    { label: 'Волгоградская область', value: 7 },
    { label: 'Вологодская область', value: 8 },
    { label: 'Воронежская область', value: 9 },
    { label: 'г. Москва', value: 10 },
    { label: 'г. Санкт-Петербург', value: 11 },
    { label: 'г. Севастополь', value: 12 },
    { label: 'Еврейская АО', value: 13 },
    { label: 'Забайкальский край', value: 14 },
    { label: 'Ивановская область', value: 15 },
    { label: 'Иркутская область', value: 16 },
    { label: 'Кабардино-Балкарская Республика', value: 17 },
    { label: 'Калининградская область', value: 18 },
    { label: 'Калужская область', value: 19 },
    { label: 'Камчатский край', value: 20 },
    { label: 'Карачаево-Черкесская Республика', value: 21 },
    { label: 'Кемеровская область', value: 22 },
    { label: 'Кировская область', value: 23 },
    { label: 'Костромская область', value: 24 },
    { label: 'Краснодарский край', value: 25 },
    { label: 'Красноярский край', value: 26 },
    { label: 'Курганская область', value: 27 },
    { label: 'Курская область', value: 28 },
    { label: 'Ленинградская область', value: 29 },
    { label: 'Липецкая область', value: 30 },
    { label: 'Магаданская обл.', value: 31 },
    { label: 'Московская обл.', value: 32 },
    { label: 'Мурманская обл.', value: 33 },
    { label: 'Ненецкий АО', value: 34 },
    { label: 'Нижегородская область', value: 35 },
    { label: 'Новгородская область', value: 36 },
    { label: 'Новосибирская область', value: 37 },
    { label: 'Омская область', value: 38 },
    { label: 'Оренбургская область', value: 39 },
    { label: 'Орловская область', value: 40 },
    { label: 'Пензенская область', value: 41 },
    { label: 'Пермский край', value: 42 },
    { label: 'Приморский край', value: 43 },
    { label: 'Псковская область', value: 44 },
    { label: 'Республика Адыгея', value: 45 },
    { label: 'Республика Алтай', value: 46 },
    { label: 'Республика Башкортостан', value: 47 },
    { label: 'Республика Бурятия', value: 48 },
    { label: 'Республика Дагестан', value: 49 },
    { label: 'Республика Ингушетия', value: 50 },
    { label: 'Республика Калмыкия', value: 51 },
    { label: 'Республика Карелия', value: 52 },
    { label: 'Республика Коми', value: 53 },
    { label: 'Республика Крым', value: 54 },
    { label: 'Республика Марий Эл', value: 55 },
    { label: 'Республика Мордовия', value: 56 },
    { label: 'Республика Саха (Якутия)', value: 57 },
    { label: 'Республика Северная Осетия - Алания', value: 58 },
    { label: 'Республика Татарстан', value: 59 },
    { label: 'Республика Тыва', value: 60 },
    { label: 'Республика Хакасия', value: 61 },
    { label: 'Ростовская область', value: 62 },
    { label: 'Рязанская область', value: 63 },
    { label: 'Самарская область', value: 64 },
    { label: 'Саратовская область', value: 65 },
    { label: 'Сахалинская обл.', value: 66 },
    { label: 'Свердловская область', value: 67 },
    { label: 'Смоленская область', value: 68 },
    { label: 'Ставропольский край', value: 69 },
    { label: 'Тамбовская область', value: 70 },
    { label: 'Тверская область', value: 71 },
    { label: 'Томская область', value: 72 },
    { label: 'Тульская область', value: 73 },
    { label: 'Тюменская обл.', value: 74 },
    { label: 'Удмуртская Республика', value: 75 },
    { label: 'Ульяновская область', value: 76 },
    { label: 'Хабаровский край', value: 77 },
    { label: 'Ханты-Мансийский АО (Югра)', value: 78 },
    { label: 'Челябинская область', value: 79 },
    { label: 'Чеченская Республика', value: 80 },
    { label: 'Чувашская Республика', value: 81 },
    { label: 'Чукотский АО', value: 82 },
    { label: 'Ямало-Ненецкий АО', value: 83 },
    { label: 'Ярославская область', value: 84 },
];

const avgSalary: number[] = [25960, 43156, 47526, 32166, 31163, 27403, 31647, 30097, 36081, 31286, 78946, 58310,
    31008, 39797, 40728, 26053, 42921, 25318, 32473, 38005, 71553, 25699, 37857, 27580, 27948, 33258, 44692, 27887,
    30125, 42434, 30775, 101662, 50135, 56005, 77277, 32973, 30820, 36048, 32013, 29892, 26834, 30112, 34809, 42026,
    27339, 27455, 37764, 33137, 37867, 24550, 25663, 25719, 39755, 48316, 28400, 28232, 26999, 65881, 26108, 35722,
    35619, 37949, 30647, 31192, 33086, 26555, 73261, 37605, 29566, 28256, 26754, 30764, 39707, 33933, 61937, 31990,
    27927, 46583, 62555, 34944, 26108, 27028, 96930, 86560, 33882];

interface Task7State {

    cities: number[];
    sampleIndices: [string, string, string];
    intervalIndices: [string, string, string];
}

export class Task7 extends Task<Task7State> {

    state: Task7State = {
        cities: [],
        sampleIndices: ['', '', ''],
        intervalIndices: ['', '', '']
    };

    private static checkIndices(indices: [string, string, string], max: number = 10) {
        return indices.filter(verifyInteger).map(Number).filter(v => v > 0 && v <= max).length === 3;
    }

    protected checkParameters(): boolean {
        const { cities, sampleIndices, intervalIndices } = this.state;

        return Task7.checkIndices(sampleIndices, avgSalary.length - cities.length) &&
            Task7.checkIndices(intervalIndices);
    }

    private onCitiesChange(e: { value: number[] }) {
        this.setState({
            ...this.state,

            cities: e.value
        });
    }

    private onIndexChange(name: 'sampleIndices' | 'intervalIndices', i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const indices = [...this.state[name]];

            indices[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, [name]: indices });
        }
    }

    protected renderParameters() {
        const { cities, sampleIndices, intervalIndices } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Выберите города, <strong>не</strong> попавшие в выборку:
                    </span>

                    <MultiSelect filter value={cities} options={citySelectItems} style={{ verticalAlign: 'middle' }}
                                 onChange={this.onCitiesChange.bind(this)} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Введите номера необходимых элементов выборки (<strong>X</strong>):
                    </span>

                    {[0, 1, 2].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={sampleIndices[i]}
                                       onChange={this.onIndexChange('sampleIndices', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task7.checkIndices(sampleIndices, avgSalary.length - cities.length)} />
                    </span>
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Введите номера необходимых интервалов (<strong>A</strong>):&nbsp;
                    </span>

                    {[0, 1, 2].map(i => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <span className="p-inputgroup-addon" style={{ minWidth: 0 }} />
                            )}

                            <InputText type="number" value={intervalIndices[i]}
                                       onChange={this.onIndexChange('intervalIndices', i)} />
                        </React.Fragment>
                    ))}

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={Task7.checkIndices(intervalIndices)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer(): Promise<React.ReactNode> {
        const { cities, sampleIndices, intervalIndices } = this.state;
        const sample = avgSalary.filter((_, i) => !cities.includes(i)).sort((a, b) => a - b);

        const numericSampleIndices = sampleIndices.map(v => +v - 1);
        const numericIntervalIndices = intervalIndices.map(v => +v - 1);

        const a: number[] = [];
        const intervalLength = (sample[sample.length - 1] - sample[0]) / 10;
        for (let i = 0; i < 10; ++i) {
            const intervalOffset = sample[0] + i * intervalLength;

            a[i] = sample.filter((v) => v >= intervalOffset && v < intervalOffset + intervalLength).length;
        }

        const e = mean(sample);
        const v = sampleVariance(sample, e);
        const fixedV = v * sample.length / (sample.length - 1);
        const m = median(sample);

        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            {numericSampleIndices.map(v => (
                                <td key={v}>
                                    <strong>X<sub>({v + 1})</sub></strong> =&nbsp;
                                    <InputText readOnly value={sample[v]} />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            {numericIntervalIndices.map(v => (
                                <td key={v}>
                                    <strong>A<sub>({v + 1})</sub></strong> =&nbsp;
                                    <InputText readOnly value={a[v]} />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                Выборочное среднее:&nbsp;
                <InputText readOnly value={normalizeNumber(e)} />
                <br />

                Смещенная выборочная дисперсия:&nbsp;
                <InputText readOnly value={normalizeNumber(v)} />
                <br />

                Несмещенная выборочная дисперсия:&nbsp;
                <InputText readOnly value={normalizeNumber(fixedV)} />
                <br />

                Выборочная медиана:&nbsp;
                <InputText readOnly value={m} />
                <br />

                Квантиль уровня <strong>0.25</strong>:&nbsp;
                <InputText readOnly value={sampleQuantile(0.25, sample)} />
                <br />

                Квантиль уровня <strong>0.75</strong>:&nbsp;
                <InputText readOnly value={sampleQuantile(0.75, sample)} />
            </>
        );
    }
}
