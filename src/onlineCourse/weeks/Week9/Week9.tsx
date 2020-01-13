import React from 'react';

import { Week } from '../../../components/Week/Week';
import { Task9 } from '../../tasks/Task9/Task9';

export class Week9 extends Week {

    weekName = 'Неделя 9. Точные и асимптотические доверительные интервалы';

    protected renderContent() {
        return (<Task9 />);
    }
}
