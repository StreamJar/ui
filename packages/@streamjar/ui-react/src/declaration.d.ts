declare module '*.scss';
declare module 'react-router-component';

// https://github.com/gilbarbara/react-inlinesvg/issues/98
declare module 'react-inlinesvg' {
    export default class SVG extends React.Component<{
        src: string,
        id?: string,
        preloader?: JSX.Element,
        className?: string
        cacheGetRequests?: boolean,
        onLoad?: (src: string, isCached: boolean) => any,
        onError?: () => any,
    }, any> { }
}
