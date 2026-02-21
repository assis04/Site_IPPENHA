import { Link } from "react-router-dom";
import { PASTORS } from "../data/constants";

/**
 * Seção "Conheça nossos pastores".
 * Grid 4 colunas responsivo com cards de foto + nome + cargo.
 */
export default function PastorsSection() {
  return (
    <section
      className="w-full bg-[#E0F2CF] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 font-[Poppins,sans-serif]"
      aria-labelledby="pastors-heading"
    >
      <div className="w-full max-w-4xl mx-auto">
        <h2
          id="pastors-heading"
          className="text-xl sm:text-2xl lg:text-[33px] font-semibold text-black text-center leading-[128%] mb-6 sm:mb-8 lg:mb-10"
        >
          Conheça nossos pastores
        </h2>

        <div className="grid grid-cols-4 gap-4 sm:gap-5 lg:gap-8 justify-items-center">
          {PASTORS.map((pastor) => (
            <Link
              key={pastor.slug}
              to={`/pastores/${pastor.slug}`}
              className="flex flex-col items-center w-full rounded-[34%] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2 focus:ring-offset-[#E0F2CF]"
              aria-label={`Ver perfil de ${pastor.name}, ${pastor.role}`}
            >
              <div className="w-full aspect-square rounded-[34%] overflow-hidden shrink-0">
                <img
                  src={pastor.image}
                  alt={`Foto de ${pastor.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base font-normal leading-tight text-center text-black">
                {pastor.name}
              </p>
              <p className="mt-0.5 text-center font-normal leading-tight text-black text-[10px] sm:text-xs lg:text-[13px]">
                {pastor.role}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
