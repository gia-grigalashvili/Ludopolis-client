import { Footer } from "../footer";
import { Header } from "../header";
import { UseGetBoard } from "@/hooks/UseGetBoard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "@tanstack/react-router";
import "swiper/css";
import CarouselSkeelton from "./skeleton/CarouselSkeelton";
import CarouselError from "./skeleton/CarouselError";

interface SingleGamesProps {
  board: {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
  };
}


export default function SingleGames({ board }: SingleGamesProps) {
  const { data: boardData, isLoading, isError, error } = UseGetBoard();
  const navigate = useNavigate();
  if (isLoading) return <CarouselSkeelton />;
  if (isError) return <CarouselError error={error} />;

  const relatedProducts =
    boardData?.data?.filter(
      (item: SingleGamesProps["board"]) => item._id !== board._id
    ) || [];

  return (
    <div className="min-w-0 w-full">
      <Header />
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="transition-all border border-neutral-600 bg-transparent backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              <div className="w-full lg:w-1/2 lg:max-w-[500px] aspect-square lg:aspect-[4/5] overflow-hidden rounded-lg shadow-lg flex-shrink-0 bg-gray-800">
                <img
                  src={board.image}
                  alt={board.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 w-full">
                <h1 className="text-2xl sm:text-4xl font-bold mb-4 break-words">
                  {board.name}
                </h1>
                <p className="text-white text-sm mb-2">
                  Category: {board.category}
                </p>

                <div className="mb-6 text-base sm:text-lg text-purple-100 leading-relaxed break-words">
                  {board.description}
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-[#fff] mb-6">
                  ${board.price}
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition w-fit">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 mt-12 mb-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
            Related Products
          </h2>

          {relatedProducts.length > 0 ? (
            <div className="w-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={16}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {relatedProducts.map((product: SingleGamesProps["board"]) => (
                  <SwiperSlide key={product._id}>
                    <div
                      onClick={() => navigate({ to: `/games/${product._id}` })}
                      className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-4 transition-all hover:border-purple-400 hover:bg-black/60 cursor-pointer group h-[320px] flex flex-col rounded-lg"
                    >
                      <div className="w-full h-44 bg-gradient-to-br from-purple-900 to-purple-700 mb-4 border-2 border-white/30 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex flex-col flex-1 min-h-0">
                        <h4 className="text-lg font-bold text-purple-100 line-clamp-2 leading-tight mb-2 flex-shrink-0">
                          {product.name}
                        </h4>
                        <p className="text-xs text-purple-400 font-medium uppercase tracking-wide mb-4 flex-shrink-0">
                          {product.category}
                        </p>
                        <div className="mt-auto">
                          <div className="text-xl font-bold text-white">
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No related products found
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
