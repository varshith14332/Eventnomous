import DOMPurify from 'dompurify';

export const sanitize = (input: string): string => {
    return DOMPurify.sanitize(input);
};

export const sanitizeObject = <T>(obj: T): T => {
    if (typeof obj === 'string') {
        return sanitize(obj) as unknown as T;
    }
    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject) as unknown as T;
    }
    if (typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = sanitizeObject((obj as any)[key]);
            }
        }
        return result as T;
    }
    return obj;
};
