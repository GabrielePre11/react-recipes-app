import Container from "../layout/Container";

import CTABanner from "../assets/CTABanner.png";

export default function CTA() {
  return (
    <section className="py-20">
      <Container>
        <figure className="rounded-lg relative">
          <img
            src={CTABanner}
            alt="CTA Banner"
            className="aspect-square md:aspect-auto object-cover"
          />

          <div className="absolute flex flex-col gap-1.5 sm:gap-3 top-1/2 left-1/2 -translate-1/2 z-50">
            <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center">
              Deliciousness to your inbox
            </h3>
            <p className="text-sm md:text-[1rem] lg:text-lg text-gray-500 text-center max-w-md">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad
              minim.
            </p>

            <form
              action="submit"
              className="flex flex-col sm:flex-row items-center relative gap-2 lg:mt-5"
              onClick={(e) => e.preventDefault()}
            >
              <input
                type="text"
                required
                name="email"
                inputMode="email"
                placeholder="Your email address..."
                className="flex-1 py-2 sm:py-4 px-2 outline-0 bg-white rounded-xl"
              />

              <button className="inline-flex items-center justify-center py-3 px-3 text-white bg-black rounded-xl w-full sm:w-max cursor-pointer transition-colors duration-300 hover:bg-black/90">
                Subscribe
              </button>
            </form>
          </div>
        </figure>
      </Container>
    </section>
  );
}
