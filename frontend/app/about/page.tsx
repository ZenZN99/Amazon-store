"use client";
const About = () => {
  return (
    <div className="py-20">
      <div className="about container flex items-center justify-between gap-7">
        <div>
          <h2 className="font-bold text-[40px]">
            About US-<span className="text-[orange]">Amazon</span>
          </h2>
          <h3 className="font-semibold text-[20px] py-4">Who We Are</h3>
          <p>
            Amazon is more than just an online store – it is a global innovation
            leader and a customer-centric company committed to making people’s
            lives easier. Founded in 1994 by Jeff Bezos as a small online
            bookstore, Amazon has grown into one of the world’s largest
            e-commerce platforms, offering millions of products across
            categories such as electronics, fashion, books, groceries, cloud
            services, and entertainment. Our mission is simple yet powerful: “To
            be Earth’s most customer-centric company, where people can find and
            discover anything they might want to buy online, and to strive to
            offer customers the lowest possible prices.”
          </p>

          <h3 className="font-semibold text-[20px] py-4">Our Vision</h3>
          <p>
            At Amazon, we believe in long-term thinking. Our vision is to create
            a place where shopping is effortless, safe, and enjoyable – whether
            you are ordering a book from your laptop, streaming a movie on Prime
            Video, or managing your business through Amazon Web Services (AWS).
            We imagine a world where technology and innovation empower people,
            businesses, and communities to grow beyond limits.
          </p>
          <h3 className="font-semibold text-[20px] py-4">What We Do</h3>
          <p>
            Customer Obsession – we put customers first, always. Passion for
            Innovation – constantly inventing and improving. Operational
            Excellence – striving for speed, efficiency, and reliability.
            Long-Term Commitment – decisions made for sustainability and the
            future.
          </p>
        </div>
        <div className="image-about bg-white h-125 flex items-center justify-center px-10 rounded-[30px]">
          <img src="/images/logo2.png" alt="img" />
        </div>
      </div>
    </div>
  );
};

export default About;
