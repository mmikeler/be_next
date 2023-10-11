import { Comfortaa, Prata, Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['100', '400', '900'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const comfortaa = Comfortaa({
    weight: ['400', '700'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const prata = Prata({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

export const fontLibrary = [
    {
        title: 'Roboto',
        set: roboto
    },
    {
        title: 'Comfortaa',
        set: comfortaa
    },
    {
        title: 'Prata',
        set: prata
    },
]