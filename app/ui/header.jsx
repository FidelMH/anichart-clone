import Link from "next/link";
import { CalendarIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { capitalise } from "../utils/utilis";

// Define the seasons
const seasons = ["spring", "summer", "fall", "winter"];


// Header component
export default async function Header() {
  
  const thisSeason = "summer";
  let thisYear = 2025;
  let seasonIndex = seasons.indexOf(thisSeason);
  let links = [];

  // Generate links for the next 4 seasons
for(let i = 0; i < 4; i++) {
  if(i === 3 && seasons[seasonIndex] === "fall") {
    thisYear--;
  }
  if(seasonIndex === 3) {
    
    thisYear++
  }
  let season = seasons[seasonIndex];
  let year = thisYear;
  
  // Push the link to the array
  links.push(
    <Link href={`/${capitalise(season)}-${year}`} className="flex flex-col capitalize">
       
      <div className="font-semibold">{season}</div>
      <div className="text-xs">{year}</div>
    </Link>
  );
  seasonIndex++;
  if(seasonIndex > 3){
    seasonIndex = 0;
  }
}
    return (
        <header className="bg-gray-800 w-full h-60 pt-10 text-center font-mono">
          <div className="flex items-start justify-evenly h-10 bg-gray-800 text-white">
            {/* Logo or title */}
            <Link href="/" className="text-4xl font-extrabold font-mono">AC</Link>
            {/* Navigation menu */}
            <div>
              <nav className="text-gray-400 text-base">
                <ul className="flex space-x-8">

                  {
                    links.map((link, index) => {
                      return (
                        <li key={index}>{link}</li>
                      );
                    })
                  }

                </ul>
              </nav>
            </div>
            {/* Additional links */}
            <div>
              <ul className="flex space-x-4 text-gray-400 text-center text-xs">
                <li>
                  <Link href="/airing">
                    <div className="flex flex-col items-center justify-start">
                      <CalendarIcon className="w-5" />
                      <div>Airing</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/tba">
                    <div className="flex flex-col items-center justify-between">
                      <ChevronDoubleRightIcon className="w-5" />
                      <div>TBA</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
    );
}