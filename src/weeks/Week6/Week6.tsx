import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../components/Week/Week';
import { Task1 } from './Task1/Task1';
import { Task21 } from './Task21/Task21';
import { Task22 } from './Task21/Task22';

export class Week6 extends Week {

    weekName = 'Неделя 6. Обзор задач, решаемых статистикой';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1 (Python)"><Task1 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 1"><Task21 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 2"><Task22 /></AccordionTab>
            </Accordion>
        )
    }
}
