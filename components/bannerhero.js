export default function BannerHero({ subtitle, title, description }) {
  return (
    <div className="lg:text-center pb-8">
      <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
        {subtitle}
      </h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </p>
      <p className="mt-4 max-w-2xl text-md text-gray-500 lg:mx-auto">
        {description}
      </p>
    </div>
  );
}
