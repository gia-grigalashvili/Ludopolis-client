import { Footer } from "../footer";
import { Header } from "../header";
import TextType from "../ui/TextType";

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
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <div className=" transition-all  border  border-neutral-600 bg-transparent  backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-[500px] h-[500px] overflow-hidden rounded-lg shadow-lg flex-shrink-0 bg-gray-800">
              <img
                src={board.image}
                alt={board.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{board.name}</h1>
              <p className="text-white text-sm mb-2">
                Category: {board.category}
              </p>

              <div className="mb-6 text-lg text-purple-100 leading-relaxed">
                <TextType
                  text={[board.description]}
                  typingSpeed={25}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>

              <div className="text-3xl font-bold text-[#fff] mb-6">
                ${board.price}
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition w-fit">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
