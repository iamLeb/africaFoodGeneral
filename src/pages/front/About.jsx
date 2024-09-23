import SubHeader from "../../components/front/SubHeader.jsx";

const About = () => {
    return (
        <section>
            <SubHeader
                title="About Us"
                content="Africa Food General Inc. offers a wide range of high-quality products, bringing authentic African flavors to your doorstep."
            />

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Africa Food General Inc. is dedicated to sourcing and distributing a diverse range of authentic African foods and products. From fresh produce to pantry essentials, we aim to bring the rich culinary heritage of Africa closer to your kitchen. Our journey started with a vision to make African cuisine accessible to everyone, both within the diaspora and beyond.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 mb-4">
                            We are committed to delivering top-quality food products, ensuring that you enjoy the authentic taste and flavors of Africa. Our mission is to bridge the gap between African food producers and global consumers, providing a seamless shopping experience and prompt delivery services.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 mb-4">
                            At Africa Food General, we prioritize customer satisfaction by offering a wide selection of premium products, competitive pricing, and exceptional customer service. Our team is passionate about promoting African culture through its cuisine, ensuring that our customers experience the best flavors Africa has to offer.
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://lh3.googleusercontent.com/p/AF1QipMjXAsc6x9T_e8dunMnxxoueCr_7l6as1M5WAtg=s1360-w1360-h1020"
                            alt="About Africa Food General"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-4 mt-8">
                <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 border border-gray-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Quality</h3>
                        <p className="text-gray-600">We source only the finest and freshest products, ensuring that you receive the best African foods on the market.</p>
                    </div>
                    <div className="text-center p-6 border border-gray-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Authenticity</h3>
                        <p className="text-gray-600">Our products are deeply rooted in African tradition, providing you with an authentic taste of home.</p>
                    </div>
                    <div className="text-center p-6 border border-gray-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                        <p className="text-gray-600">We are committed to ethical sourcing and supporting local farmers and suppliers across Africa.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
