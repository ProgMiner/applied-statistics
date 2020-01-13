import React from 'react';

import { Week } from '../../../components/Week/Week';
import { Task7 } from '../../tasks/Task7/Task7';

export class Week7 extends Week {

    weekName = 'Неделя 7. Выборочные характеристики';

    protected renderContent() {
        return (<Task7 />);
    }
}
