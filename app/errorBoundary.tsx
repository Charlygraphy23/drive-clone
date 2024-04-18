"use client"

import React, { PropsWithChildren } from "react";

type Props = {
    fallback: React.ComponentType<{ error: Record<string, any> | null }>
} & PropsWithChildren;


type State = {
    hasError: boolean;
    error: Record<string, any> | null
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.error(error);
        this.setState({ error: error })
    }

    render() {

        const Fallback = this.props.fallback

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Fallback error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary