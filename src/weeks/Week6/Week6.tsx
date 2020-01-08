import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../components/Week/Week';
import { Task1 } from './Task1/Task1';

export class Week6 extends Week {

    weekName = 'Неделя 6. Обзор задач, решаемых статистикой';

    protected renderContent() {
        return (
            <Accordion>
                <AccordionTab header="Упражнение 1 (Python)"><Task1 /></AccordionTab>
            </Accordion>
        )
    }
}
