import { formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale'; // Untuk bahasa Indonesia

export default function readableDate(dateString : string){
    const date = parseISO(dateString);

    const readableDate = formatDistanceToNow(date, {
        addSuffix: true, // Menambahkan "yang lalu"
        locale: id, // Menggunakan bahasa Indonesia
    });

    return readableDate
}