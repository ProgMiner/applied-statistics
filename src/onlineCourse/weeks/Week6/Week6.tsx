import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task61 } from '../../tasks/Task61/Task61';
import { Task621 } from '../../tasks/Task621/Task621';
import { Task622 } from '../../tasks/Task622/Task622';

export class Week6 extends Week {

    weekName = 'Неделя 6. Обзор задач, решаемых статистикой';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1 (Python)"><Task61 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 1"><Task621 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 2"><Task622 /></AccordionTab>
            </Accordion>
        );
    }
}
