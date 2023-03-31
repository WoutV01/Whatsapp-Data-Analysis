import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import * as React from 'react';

export default function Card({ title, children } : {title:string, children:ReactJSXElement}) {
    return (
        <article>
            <header>{title}</header>
            {children}
        </article>
    )
}