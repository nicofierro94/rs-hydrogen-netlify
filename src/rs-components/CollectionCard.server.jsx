import { Link, Image } from "@shopify/hydrogen";

export default function CollectionCard({ collection }) {
    const imageLoader = ({ src }) => {
        return `${src}&width=${480}`
    };
    return (
        <div className="containerCollection__item border-2 border-sky-900">
            <Link to={`/collections/${collection.handle}`}>
                <div className="containerCollection__imagen-container flex justify-center items-center">
                    {collection.image
                        ? <Image data={collection.image} loader={imageLoader} />
                        : /*change no image*/ <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg" />
                    }
                </div>
                <h3 className="containerCollection__name text-center text-2xl text-white bg-sky-900">{collection.title}</h3>
            </Link>
        </div>
    )
}