import { Amatic_SC, Comfortaa, Merriweather, Montserrat, Nunito, Oswald, Prata, Roboto, Roboto_Serif, Ubuntu } from 'next/font/google'

const roboto = Roboto({
    weight: ['100', '400', '900'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const roboto_serif = Roboto_Serif({
    weight: ['100', '300', '500', '700', '900'],
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

const montserrat = Montserrat({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const oswald = Oswald({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const nunito = Nunito({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const ubuntu = Ubuntu({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const merriweather = Merriweather({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

const amatic_sc = Amatic_SC({
    weight: ['400', '700'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
})

export const fontLibrary = [
    {
        title: 'Roboto',
        set: roboto
    },
    {
        title: 'Roboto Serif',
        set: roboto_serif
    },
    {
        title: 'Comfortaa',
        set: comfortaa
    },
    {
        title: 'Prata',
        set: prata
    },
    {
        title: 'Montserrat',
        set: montserrat
    },
    {
        title: 'Oswald',
        set: oswald
    },
    {
        title: 'Nunito',
        set: nunito
    },
    {
        title: 'Ubuntu',
        set: ubuntu
    },
    {
        title: 'Merriweather',
        set: merriweather
    },
    {
        title: 'Amatic SC',
        set: amatic_sc
    },
]