import React from 'react';
import { LoadingContainer } from '../LoadingContainer/LoadingContainer';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

interface TaskState {

    answer?: React.ReactNode;
}

export abstract class Task<P = {}, S = {}> extends React.Component<React.PropsWithChildren<P>, S & TaskState> {

    protected readonly className?: string | string[];

    private readonly taskClassName: string;
    private answerPromise?: Promise<React.ReactNode>;

    state = {} as S & TaskState;

    protected constructor(props: P) {
        super(props);

        const classNames = ['Task'];
        if (this.className) {
            if (Array.isArray(this.className)) {
                classNames.push(...this.className);
            } else {
                classNames.push(this.className);
            }
        }

        this.taskClassName = classNames.join(' ');
    }

    componentDidUpdate(
        prevProps: Readonly<React.PropsWithChildren<P>>,
        prevState: Readonly<S & TaskState>,
        snapshot?: any
    ): void {
        if (!isEqual(omit(this.state, 'answer'), omit(prevState, 'answer')) && this.checkParameters()) {
            (async () => {
                const answerPromise = this.answerPromise = this.renderAnswer();

                this.setState({ ...this.state, answer: undefined });

                const answer = await answerPromise;

                if (this.answerPromise === answerPromise) {
                    this.setState({ ...this.state, answer });
                }
            })();
        }
    }

    render() {
        return (
            <div className={this.taskClassName}>
                {this.renderParameters()}

                {this.checkParameters() && (<>
                    <hr />

                    {this.renderLoading()}
                </>)}
            </div>
        );
    }

    protected abstract checkParameters(): boolean;
    protected abstract renderParameters(): React.ReactNode;
    protected abstract async renderAnswer(): Promise<React.ReactNode>;

    protected renderLoading(): React.ReactNode {
        const { answer } = this.state;

        return (
            <LoadingContainer loading={!answer}>
                {answer}
            </LoadingContainer>
        );
    }
}
