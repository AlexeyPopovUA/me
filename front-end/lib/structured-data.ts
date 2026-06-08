import { content } from '@/app/configuration/content';
import { environment } from '@/app/configuration/environment';
import { getOGImageURL } from '@/lib/image';

export function getPublisher() {
    return {
        '@type': 'Person' as const,
        name: content.authorName,
        url: environment.url,
        image: getOGImageURL({ src: '/shared/default_thumbnail_o_p.png' }),
    };
}

export function getBlogReference() {
    return {
        '@type': 'Blog' as const,
        name: `Blog - ${content.authorName}`,
        url: `${environment.url}/blog/`,
    };
}
