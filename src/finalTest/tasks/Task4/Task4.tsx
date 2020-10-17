import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { FinalTask } from '../../components/FinalTask/FinalTask';

import distributionIImage from './distributions/i.png';
import distributionBImage from './distributions/b.png';
import distributionUImage from './distributions/u.png';
import distributionExpImage from './distributions/exp.png';
import distributionNImage from './distributions/n.png';
import distributionN01Image from './distributions/n01.png';

interface Task4State {

    rendered?: true;
}

interface RowType {

    name: string;
    image: string,
    distribution: React.ReactNode
}

export class Task4 extends FinalTask<Task4State> {

    private static table: RowType[] = [
        { name: 'I', image: distributionIImage, distribution: (<>I<sub>x<sub>0</sub></sub></>) },
        { name: 'B', image: distributionBImage, distribution: (<>B<sub>p</sub></>) },
        { name: 'U', image: distributionUImage, distribution: (<>U<sub>a,b</sub></>) },
        { name: 'Exp', image: distributionExpImage, distribution: (<>Exp<sub>&#955;</sub></>) },
        { name: 'I', image: distributionNImage, distribution: (<>N<sub>a,&#963;<sup>2</sup></sub></>) },
        { name: 'I01', image: distributionN01Image, distribution: (<>N<sub>0,1</sub></>) }
    ];

    state: Task4State = {};

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,

                rendered: true
            });
        });
    }

    protected checkParameters(): boolean {
        return true;
    }

    protected renderProblem() {
        return (
            <>
                Функция распределения случайной величины <strong>&#958;</strong> задана соотношением.<br />
                Какое распределение имеет данная случайная величина?
            </>
        );
    }

    protected renderFinalParameters() {
        return undefined;
    }

    protected async renderAnswer() {
        return (
            <>
                Ищем в табличке формулу, совпадающую с данной в задании,{' '}
                и выбираем соответствующее обозначение распределения.{' '}
                При этом нужно заменить все параметры (буквы в нижних индексах) числами,{' '}
                которые вытаскиваем из формулы (как в последних двух строках).

                <br />
                <br />

                <DataTable value={Task4.table}>
                    <Column header="Функция" body={(d: RowType) => (
                        <img src={d.image} alt={d.name} className="max-width-100" />
                    )} style={{ textAlign: 'center' }} />

                    <Column header="Распределение" body={(d: RowType) => (
                        <strong style={{ fontSize: '1.5em' }}>{d.distribution}</strong>
                    )} style={{ textAlign: 'center' }} />
                </DataTable>
            </>
        );
    }
}
