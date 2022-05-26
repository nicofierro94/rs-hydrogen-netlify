import Layout from "../components/Layout.server";

export default function HomeTest() {
    return (
        <Layout>


            <div className="containerHero flex justify-center items-center">
                <div className="containerHero__textArea">
                    <h1 className="containerHero__title text-center text-white">Tots to Teens Furniture</h1>
                    <p className="containerHero__description text-2xl text-center text-white">Raleigh's largest selection of baby & kids furniture!</p>
                </div>
            </div>

            <div className="containerCollection">
                <h2 className="containerCollection__title text-center text-3xl mt-20">BRANDS</h2>
                <div className="containerCollection__grid flex flex-row flex-wrap justify-start gap-4 mt-10 p-8">
                    <div className="containerCollection__item border-2 border-sky-900">
                       <div className="containerCollection__imagen-container flex justify-center items-center">
                        <img className="containerCollection__image" src="https://cdn.shopify.com/s/files/1/0578/0868/3204/collections/458877_2FAlexander_and_James_Logo-600x222_360x.jpg" alt="" />
                       </div>                     
                      <h3 className="containerCollection__name text-center text-2xl text-white bg-sky-900">Glenna Jean</h3>
                    </div>                                    
                </div>   
                             
            </div>

            
        </Layout>
    )
}