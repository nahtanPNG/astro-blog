import Fuse from "fuse.js"
import { useState } from "react"

const options = {
    keys: ['data.title', 'data.description'], //Procurando o post pelo objeto data
    minMatchCharLength: 2,
    includeMatches: true,
}

export default function Search({searchList}) {

    const [query, setQuery] = useState('')

    const fuse = new Fuse(searchList, options)

    const posts = fuse.search(query)
    .map(result => result.item)
    .splice(0, 5) //trazer apenas 5 elementos

    function handleOnSearch({target = {}}) {
        const { value } = target //Definindo o valor do campo
        setQuery(() => value)
    }

    return (
        <>
            <label htmlFor="search" className="sr-only">Search Post</label>
            <input 
            className="block w-full p-4 border text-sm text-gray-900 rounded border-gray-300 mb-4"
            id="search" 
            type="text" 
            value={query} 
            onChange={handleOnSearch} 
            placeholder="Search Post"
            />

            {query.length > 1 && (
                <p>
                    Encontrei {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'}
                </p>
            )}

            <ul>
                {posts && posts.map(post => 
                    (<li className="my-5 pl-4 py-4 border rounded bg-white">
                        <a href={`/blog/${post.slug}`} className="text-gray-900">{post.data.title}</a>
                        <p className="text-sm text-gray-700">{post.data.description}</p>
                    </li>)
                )}
            </ul>
        </>
    )
}