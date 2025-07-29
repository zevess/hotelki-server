export function cyrillicSlugify(text: string) {
    const cyrillicMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    // 1. Transliterate Cyrillic to Latin
    let transliteratedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        transliteratedText += cyrillicMap[char] || char;
    }

    // 2. Normalize to lowercase
    let slug = transliteratedText.toLowerCase();

    // 3. Sanitize: remove non-alphanumeric (except hyphens)
    slug = slug.replace(/[^a-z0-9\s-]/g, '');

    // 4. Replace whitespace with hyphens
    slug = slug.replace(/\s+/g, '-');

    // 5. Clean up hyphens: remove multiple hyphens and leading/trailing hyphens
    slug = slug.replace(/-+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
}
