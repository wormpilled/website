// /var/www/html/wormpilled/workers/critters.js
export default {
	async fetch(request, env, ctx) {
		// Set CORS headers to allow requests from your blog
		//	'Access-Control-Allow-Origin': 'https://wormpilled.github.io',
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		};
		
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}
		
		const url = new URL(request.url);
		
		// POST: Increment and return new count
		if (request.method === 'POST') {
			let slugFromBody;
			try {
				const body = await request.json();
				slugFromBody = body.slug;
			} catch (e) {
				return new Response('Invalid JSON body', { status: 400, headers: corsHeaders });
			}
			
			if (!slugFromBody) {
				return new Response('Missing slug in request body', {
					status: 400,
					headers: corsHeaders
				});
			}
			
			const key = `hits_${slugFromBody}`;
			let count = await env.WORM_HITS.get(key);
			count = count ? parseInt(count) + 1 : 1;
			await env.WORM_HITS.put(key, count.toString());
			
			const response = { slug: slugFromBody, hits: count };
			return new Response(JSON.stringify(response), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' }
			});
		}
		
		// GET: Retrieve count without incrementing
		if (request.method === 'GET') {
			const slugFromQuery = url.searchParams.get('slug');
			
			if (!slugFromQuery) {
				return new Response('Missing slug parameter in query string', {
					status: 400,
					headers: corsHeaders
				});
			}
			
			const key = `hits_${slugFromQuery}`;
			let count = await env.WORM_HITS.get(key);
			count = count ? parseInt(count) : 0; // Default to 0 if not found
			
			const response = { slug: slugFromQuery, hits: count };
			return new Response(JSON.stringify(response), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' }
			});
		}
		
		return new Response('Method not allowed', { status: 405, headers: corsHeaders });
	}
};
