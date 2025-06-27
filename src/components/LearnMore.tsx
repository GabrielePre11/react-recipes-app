import Container from "../layout/Container";

import learnMore from "../assets/learnMoreImg.png";

export default function LearnMore() {
  return (
    <section className="pt-20">
      <Container className="grid items-center gap-10 grid-cols-1 md:grid-cols-2">
        {/*========= Left Side =========*/}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            Everyone can be a <br></br> chef in their own kitchen
          </h2>
          <p className="max-w-md text-gray-500 text-sm md:text-lg">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim{" "}
          </p>

          <button className="inline-flex items-center bg-black w-max rounded-lg text-white text-sm lg:text-lg py-3 px-6 lg:px-10 mt-8 cursor-pointer transition-colors duration-300 hover:bg-black/90">
            Learn More
          </button>
        </div>

        {/*========= Right Side =========*/}
        <img src={learnMore} alt="Learn More" />
      </Container>
    </section>
  );
}
