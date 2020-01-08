import React from 'react';
import { ProgressBar } from 'primereact/progressbar';

export interface LoadingContainerProps {

    loading: boolean;
    progress?: number;
    minProgress: number;
    maxProgress: number;
}

export class LoadingContainer<P = {}, S = {}> extends React.Component<P & React.PropsWithChildren<LoadingContainerProps>, S> {

    static defaultProps: LoadingContainerProps = {

        loading: false,
        minProgress: 0,
        maxProgress: 100
    };

    render() {
        const { loading } = this.props;

        if (loading) {
            return this.renderLoading();
        } else {
            return this.renderContent();
        }
    }

    protected renderLoading(): React.ReactNode {
        const { progress, minProgress, maxProgress } = this.props;

        return (
            <ProgressBar mode={progress ? 'determinate' : 'indeterminate'} value={typeof progress === 'number' ?
                (progress - minProgress) / (maxProgress - minProgress) : 0} />
        );
    }

    protected renderContent(): React.ReactNode {
        return this.props.children;
    }
}
