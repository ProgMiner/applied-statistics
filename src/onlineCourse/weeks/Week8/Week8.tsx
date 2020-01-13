import React from 'react';

import { Week } from '../../../components/Week/Week';
import { Task8 } from '../../tasks/Task8/Task8';

export class Week8 extends Week {

    weekName = 'Неделя 8. Точечное оценивание';

    protected renderContent() {
        return (<Task8 />);
    }
}
