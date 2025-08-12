import { NextResponse } from 'next/server';

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Tentativa ${i + 1} para ${url}`);
            const response = await fetch(url, options);
            if (response.ok) return response;
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        } catch (error) {
            if (i < retries - 1) {
                console.log(`Tentativa ${i + 1} falhou, retrying após ${delay * (i + 1)}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            } else {
                throw error;
            }
        }
    }
}

export async function GET() {
    try {
        console.log('Iniciando requisição ao Reddit');
        const response = await fetchWithRetry('https://www.reddit.com/r/leagueoflegends/new.json?limit=10', {
            headers: {
                'User-Agent': 'LeagueNewsBot/1.0'
            }
        }, 3, 1000);
        console.log('Resposta do Reddit recebida:', response.status);
        const data = await response.json();
        console.log('Dados do Reddit recebidos:', !!data.data);

        if (!data.data || !data.data.children) {
            throw new Error('Formato de dados do Reddit inválido');
        }

        const posts = data.data.children.map(post => {
            const postData = post.data;
            console.log('Processando post:', postData.id);
            let imageUrl = null;
            if (postData.preview?.images?.length > 0) {
                imageUrl = postData.preview.images[0].source.url.replace(/&amp;/g, '&');
            } else if (postData.thumbnail && !['self', 'default', 'nsfw'].includes(postData.thumbnail)) {
                imageUrl = postData.thumbnail;
            } else if (postData.url?.match(/\.(jpg|png|gif)$/)) {
                imageUrl = postData.url;
            }

            return {
                id: postData.id,
                title: postData.title || 'Sem título',
                text: postData.selftext || postData.title || 'Sem conteúdo',
                imageUrl,
                link: `https://reddit.com${postData.permalink}`,
                author: postData.author || 'Anônimo',
                score: postData.score || 0,
                comments: postData.num_comments || 0,
                created: new Date(postData.created_utc * 1000).toISOString(),
                subreddit: postData.subreddit || 'leagueoflegends',
                postHint: postData.post_hint || '',
                isVideo: postData.is_video || false,
                domain: postData.domain || ''
            };
        });

        console.log('Posts processados:', posts.length);
        return NextResponse.json({ success: true, posts, total: posts.length });
    } catch (error) {
        console.error('Erro detalhado na API /news:', error.stack);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
