import clientPromise from "../lib/mongodb";

export default function Movies({movies}){
    return(
        <div>
            <h1>Top 10 Films In 2023</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {
                    movies.map(movie=>(
                        <li>
                            <h2>{movie.title}</h2>
                            <h3>{movie.metacritic}</h3>
                            <p>{movie.plot}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}


export async function getServerSideProps(){
    try{
        const client = await clientPromise;
        const db = await client.db("sample_mflix")

        const movies = await db
            .collection("movies")
            .find({})
            .sort({metacritic:-1})
            .limit(1000)
            .toArray()

            return {
                props:{movies:JSON.parse(JSON.stringify(movies))},
            }
    }catch(err){
        console.error(err )
    }
}