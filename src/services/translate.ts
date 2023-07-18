import { AUTO_LANGUAGE } from "../constants";
import { FromLanguage, Language } from '../types';

export async function translate({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {

    console.log(fromLanguage, toLanguage);

    const url = `https://eliangerardggg.korconnect.io/Microsoft-Translate/translate?to=${toLanguage}&api-version=3.0${fromLanguage === AUTO_LANGUAGE ? '' : `&from=${fromLanguage}`}&profanityAction=NoAction&textType=plain`;

    console.log(url);
    const options = {
        method: 'POST',
        'headers': {
            'x-api-key': 'i6uUBkhT4lKhjzw4ZeWiaES08zfQ5k87Ne6rft4f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([
            {
                Text: text
            }
        ])
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result[0].translations[0].text);
        return result[0].translations[0].text;
    } catch (error) {
        console.error(error);
    }
    return 'Traducido?';
}