const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="text-white font-bold text-3xl md:text-5xl text-center mt-6">
        {title.toUpperCase()}
      </h2>
      <p className="text-center md:text-lg text-white/60 mt-4 mx-auto">
        {description}
      </p>
    </>
  );
};

export default SectionTitle;
