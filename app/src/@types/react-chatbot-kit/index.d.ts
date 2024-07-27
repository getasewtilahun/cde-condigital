
declare module 'react-chatbot-kit' {
    import React from 'react';

    export function createChatBotMessage(message: string, options?: any);

    // export class Chatbot extends React.Component<any, any> {}

    // export default const Chatbot: (props: any) => React.SFC<any>

    export default class Chatbot extends React.Component<any, any> {}
}

// export function createChatBotMessage(message: string, options?: any);

