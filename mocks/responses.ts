import { HttpResponse } from 'msw';

export const notFound = () => HttpResponse.json({ message: 'Not Found' }, { status: 404 });
export const serverError = () => HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
