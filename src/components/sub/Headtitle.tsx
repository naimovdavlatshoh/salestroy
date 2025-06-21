interface HeadtitleProps {
    title: string;
    description?: string;
}

const Headtitle = ({ title, description }: HeadtitleProps) => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-700">{title}</h1>

            {/* description faqat mavjud bo‘lsa chiqadi */}
            {description && <p>{description}</p>}
        </div>
    );
};

export default Headtitle;
