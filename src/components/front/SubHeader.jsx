
const SubHeader = (props) => {
    return (
        <div className="relative h-48 md:h-64 w-full rounded-lg shadow-lg border-b-4 border-primary-secondary">
            <div className="absolute inset-0 bg-[#061d24] flex items-center">
                <div className="container mx-auto text-white px-8 text-center md:text-start">
                    <h2 className="font-san text-2xl md:text-6xl font-bold capitalize">{props.title}</h2>
                    <p className="mt-2 text-sm md:text-lg">
                        {props.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;