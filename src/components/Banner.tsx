import heroBanner from "../assets/heroBanner.png";
import Container from "../layout/Container";

export default function Banner() {
  return (
    <section className="pt-24 md:pt-32">
      <Container>
        <figure className="grid justify-start items-center">
          <img
            src={heroBanner}
            alt="Banner"
            className="relative aspect-video object-cover rounded-lg sm:aspect-auto"
          />

          <div className="absolute flex flex-col gap-2 p-2.5 sm:p-4">
            <span className="inline-block items-center bg-document py-1 px-3 rounded-full text-lightOrange w-max font-bold text-sm sm:text-xl">
              Trending now 🔥
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl max-w-md sm:max-w-md text-white font-semibold">
              Mike’s famous salad with cheese
            </h2>
          </div>
        </figure>
      </Container>
    </section>
  );
}
