import React, { useState, useMemo } from 'react';
import Head from 'next/head';

type Profile = { id: number; name: string; avatarColor: string; };
type ContentItem = { id: number; title: string; type: 'movie' | 'tv'; year: number; maturityRating: string; description: string; genres: string[]; rating: number; isHero?: boolean; };

const profiles: Profile[] = [
  { id: 1, name: 'Alex', avatarColor: 'bg-red-500' },
  { id: 2, name: 'Jordan', avatarColor: 'bg-blue-500' },
  { id: 3, name: 'Taylor', avatarColor: 'bg-green-500' },
  { id: 4, name: 'Kids', avatarColor: 'bg-yellow-500' }
];

const content: ContentItem[] = [
  { id: 1, title: 'Quantum Rift', type: 'movie', year: 2023, maturityRating: 'PG-13', description: 'A team of physicists discovers a tear in the fabric of spacetime, leading to unforeseen consequences.', genres: ['Sci-Fi Thrillers', 'Action & Adventure'], rating: 4.8, isHero: true },
  { id: 2, title: 'The Crown', type: 'tv', year: 2016, maturityRating: 'TV-MA', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', genres: ['Critically Acclaimed Dramas'], rating: 4.7 },
  { id: 3, title: 'Stranger Things', type: 'tv', year: 2016, maturityRating: 'TV-14', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.', genres: ['Trending Now', 'Sci-Fi Thrillers'], rating: 4.9, isHero: true },
  { id: 4, title: 'Midnight City', type: 'movie', year: 2022, maturityRating: 'R', description: 'A cynical detective navigates a neon-drenched metropolis to solve a murder that could topple the city\'s elite.', genres: ['Action & Adventure', 'Sci-Fi Thrillers'], rating: 4.3 },
  { id: 5, title: 'Laugh Riot', type: 'tv', year: 2021, maturityRating: 'TV-MA', description: 'A stand-up comedy series featuring the world\'s most hilarious comedians in their element.', genres: ['Comedies'], rating: 4.1 },
  { id: 6, title: 'The Chef\'s Table', type: 'tv', year: 2015, maturityRating: 'TV-PG', description: 'Go on a culinary journey with the world\'s most renowned chefs.', genres: ['Documentaries', 'Trending Now'], rating: 4.6 },
  { id: 7, title: 'Inception', type: 'movie', year: 2010, maturityRating: 'PG-13', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', genres: ['Sci-Fi Thrillers', 'Action & Adventure'], rating: 4.9 },
  { id: 8, title: 'The Good Place', type: 'tv', year: 2016, maturityRating: 'TV-14', description: 'Four people and their otherworldly frienemy struggle in the afterlife to define what it means to be good.', genres: ['Comedies', 'Critically Acclaimed Dramas'], rating: 4.8 },
  { id: 9, title: 'Echoes of the Past', type: 'movie', year: 2020, maturityRating: 'PG-13', description: 'A historian uncovers a diary that reveals a centuries-old conspiracy.', genres: ['Critically Acclaimed Dramas'], rating: 4.0 },
  { id: 10, title: 'Money Heist', type: 'tv', year: 2017, maturityRating: 'TV-MA', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', genres: ['Trending Now', 'Action & Adventure'], rating: 4.7 },
  { id: 11, title: 'Black Mirror', type: 'tv', year: 2011, maturityRating: 'TV-MA', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', genres: ['Sci-Fi Thrillers', 'Critically Acclaimed Dramas'], rating: 4.8 },
  { id: 12, title: 'The Martian', type: 'movie', year: 2015, maturityRating: 'PG-13', description: 'An astronaut becomes stranded on Mars after his team presumes him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.', genres: ['Sci-Fi Thrillers', 'Critically Acclaimed Dramas'], rating: 4.7 },
  { id: 13, title: 'Fleabag', type: 'tv', year: 2016, maturityRating: 'TV-MA', description: 'A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London while trying to cope with tragedy.', genres: ['Comedies', 'Critically Acclaimed Dramas'], rating: 4.9 },
  { id: 14, title: 'Planet Earth II', type: 'tv', year: 2016, maturityRating: 'TV-G', description: 'David Attenborough returns with a new wildlife documentary that shows life in a variety of habitats.', genres: ['Documentaries', 'Trending Now'], rating: 5.0 },
  { id: 15, title: 'Silicon Valley', type: 'tv', year: 2014, maturityRating: 'TV-MA', description: 'Follows the struggle of Richard Hendricks, a Silicon Valley engineer trying to build his own company called Pied Piper.', genres: ['Comedies'], rating: 4.7 },
  { id: 16, title: 'Blade Runner 2049', type: 'movie', year: 2017, maturityRating: 'R', description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.', genres: ['Sci-Fi Thrillers', 'Action & Adventure'], rating: 4.6 },
  { id: 17, title: 'Ozark', type: 'tv', year: 2017, maturityRating: 'TV-MA', description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', genres: ['Critically Acclaimed Dramas', 'Trending Now'], rating: 4.6 },
  { id: 18, title: 'The Witcher', type: 'tv', year: 2019, maturityRating: 'TV-MA', description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', genres: ['Action & Adventure', 'Sci-Fi Thrillers'], rating: 4.5, isHero: true }
];

const genres: string[] = ['Trending Now', 'Sci-Fi Thrillers', 'Action & Adventure', 'Critically Acclaimed Dramas', 'Comedies', 'Documentaries'];

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'profiles' | 'browse' | 'myList' | 'search' | 'watch'>('profiles');
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [myList, setMyList] = useState<number[]>([3, 11, 18]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectProfile = (profile: Profile) => {
    setCurrentProfile(profile);
    setCurrentPage('browse');
  };

  const watchContent = (contentItem: ContentItem) => {
    setSelectedContent(contentItem);
    setCurrentPage('watch');
  };

  const goHome = () => {
    setCurrentPage('browse');
    setSelectedContent(null);
  };

  const toggleMyList = (contentId: number) => {
    setMyList(prevList => {
      const index = prevList.indexOf(contentId);
      if (index > -1) {
        const newList = [...prevList];
        newList.splice(index, 1);
        return newList;
      } else {
        return [...prevList, contentId];
      }
    });
  };

  const isInMyList = (contentId: number) => {
    return myList.includes(contentId);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase();
    return content.filter(item => item.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const heroContent = useMemo(() => {
    return content.find(c => c.isHero) || content[0];
  }, []);

  const myListContent = useMemo(() => {
    return content.filter(c => myList.includes(c.id));
  }, [myList]);

  const filteredContentByGenre = (genre: string) => {
    return content.filter(item => item.genres.includes(genre));
  };

  return (
    <div className="dark bg-ios-bg-dark text-ios-text-primary-dark font-sans min-h-screen">
      <Head>
        <title>Notflix - Next.js & Tailwind CSS</title>
      </Head>

      {/* Main Header (visible on most pages) */}
      {currentPage !== 'profiles' && (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${currentPage === 'myList' || currentPage === 'search' ? 'bg-ios-bg-dark' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left Side */}
              <div className="flex items-center space-x-8">
                {/* Logo */}
                <a href="#" onClick={e => { e.preventDefault(); goHome(); }} className="text-brand-red text-2xl font-extrabold tracking-wider">
                  <svg className="h-8 w-auto" viewBox="0 0 111 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M105.062 14.281L111 30c-1.75-.25-3.499-.5-5.25-.75L99.75 15V30h-7.5V0h8.062l6.75 14.281zM93.75 0V30h-7.5V0h7.5zM81.938 0l-7.5 30h-8.062L74.312 0h7.626zM69.75 0V30h-7.5V0h7.5zM56.25 15L50.25 0h-7.5v30h7.5V15l6 15h7.5l-6.75-15.75L63 0h-6.75l-6 15zM34.312 0L26.25 30h-7.5L26.25 0h8.062zM23.25 0V30h-7.5V0h7.5zM11.25 0v22.5L0 0v30h7.5V7.5L18.75 30V0h-7.5z"/></svg>
                </a>
                {/* Primary Nav */}
                <nav className="hidden md:flex items-center space-x-4">
                  <a href="#" onClick={e => { e.preventDefault(); setCurrentPage('browse'); }} className={`text-white hover:text-ios-text-secondary-dark transition-colors text-sm font-medium ${currentPage === 'browse' ? 'font-bold' : ''}`}>Home</a>
                  <a href="#" onClick={e => { e.preventDefault(); setCurrentPage('browse'); }} className="text-white hover:text-ios-text-secondary-dark transition-colors text-sm font-medium">TV Shows</a>
                  <a href="#" onClick={e => { e.preventDefault(); setCurrentPage('browse'); }} className="text-white hover:text-ios-text-secondary-dark transition-colors text-sm font-medium">Movies</a>
                  <a href="#" onClick={e => { e.preventDefault(); setCurrentPage('myList'); }} className={`text-white hover:text-ios-text-secondary-dark transition-colors text-sm font-medium ${currentPage === 'myList' ? 'font-bold' : ''}`}>My List</a>
                </nav>
              </div>
              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <button onClick={e => { e.preventDefault(); setCurrentPage('search'); setSearchQuery(''); }} aria-label="Search">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                <button aria-label="Notifications">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-6-6v-1a1 1 0 00-2 0v1a6 6 0 00-6 6v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button>
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className={`${currentProfile?.avatarColor || 'bg-gray-500'} w-8 h-8 rounded-md overflow-hidden`}></div>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* PAGE: Profiles */}
      {currentPage === 'profiles' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-10">Who&apos;s Watching?</h1>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {profiles.map(profile => (
              <div key={profile.id} onClick={() => selectProfile(profile)} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden transition-all duration-200 group-hover:border-4 border-white ${profile.avatarColor}`}></div>
                <span className="mt-3 text-lg text-ios-text-secondary-dark group-hover:text-white transition-colors">{profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE: Browse */}
      {currentPage === 'browse' && (
        <main className="overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative h-[56.25vw] max-h-[800px] min-h-[400px] w-full flex flex-col justify-center">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-ios-panel-contrast-dark flex items-center justify-center">
                <span className="text-ios-text-secondary-dark text-2xl font-bold">Hero Image: {heroContent.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ios-bg-dark via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-ios-bg-dark/60 to-transparent"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-2/5">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white text-shadow-lg">{heroContent.title}</h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-white font-medium line-clamp-3">{heroContent.description}</p>
              <div className="mt-6 flex items-center space-x-3">
                <button onClick={() => watchContent(heroContent)} className="flex items-center justify-center bg-white text-black font-bold py-2 px-6 rounded hover:bg-opacity-80 transition">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"></path></svg>
                  Play
                </button>
                <button onClick={() => watchContent(heroContent)} className="flex items-center justify-center bg-gray-500/70 text-white font-bold py-2 px-6 rounded hover:bg-gray-600/70 transition">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  More Info
                </button>
              </div>
            </div>
          </section>

          {/* Content Carousels */}
          <div className="py-8 space-y-10">
            {genres.map(genre => (
              <section key={genre} className="pl-4 sm:pl-6 lg:pl-8">
                <h2 className="text-xl font-bold text-white mb-3">{genre}</h2>
                <div className="relative group">
                  <div className="flex space-x-2 overflow-x-scroll hide-scrollbar scroll-smooth">
                    {filteredContentByGenre(genre).map(item => (
                      <div key={item.id} className="carousel-item p-1 group/item">
                        <div onClick={() => watchContent(item)} className="aspect-[2/3] bg-ios-panel-contrast-dark rounded-md overflow-hidden relative cursor-pointer transform hover:scale-105 hover:z-10 transition-transform duration-300">
                          <div className="w-full h-full flex items-center justify-center text-center p-2"><span className="text-ios-text-secondary-dark text-sm">{item.title}</span></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 p-2 w-full">
                              <div className="flex justify-between items-center">
                                <div className="font-bold text-xs">{item.title}</div>
                                <button onClick={e => { e.stopPropagation(); toggleMyList(item.id); }} className="bg-white/20 hover:bg-white/40 rounded-full p-1">
                                  {!isInMyList(item.id) ? (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                  ) : (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      )}

      {/* PAGE: My List */}
      {currentPage === 'myList' && (
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-6">My List</h1>
            {myListContent.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {myListContent.map(item => (
                  <div key={item.id} className="group/item">
                    <div onClick={() => watchContent(item)} className="aspect-[2/3] bg-ios-panel-contrast-dark rounded-md overflow-hidden relative cursor-pointer transform hover:scale-105 hover:z-10 transition-transform duration-300">
                      <div className="w-full h-full flex items-center justify-center text-center p-2"><span className="text-ios-text-secondary-dark text-sm">{item.title}</span></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 p-2 w-full">
                          <div className="flex justify-between items-center">
                            <div className="font-bold text-xs">{item.title}</div>
                            <button onClick={e => { e.stopPropagation(); toggleMyList(item.id); }} className="bg-white/20 hover:bg-white/40 rounded-full p-1">
                              {!isInMyList(item.id) ? (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                              ) : (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl text-white">Your list is empty.</h2>
                <p className="text-ios-text-secondary-dark mt-2">Add shows and movies to your list to watch them later.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* PAGE: Search */}
      {currentPage === 'search' && (
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-lg mx-auto mb-8">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for titles, people, genres"
                className="w-full bg-ios-panel-dark border border-ios-border-dark text-white pl-10 pr-10 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-ios-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              )}
            </div>

            {!searchQuery ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-white">Find your next favorite.</h2>
                <p className="text-ios-text-secondary-dark mt-2">Search for anything. We&apos;ll find it.</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map(item => (
                  <div key={item.id} onClick={() => watchContent(item)} className="aspect-[2/3] bg-ios-panel-contrast-dark rounded-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center text-center p-2"><span className="text-ios-text-secondary-dark text-sm">{item.title}</span></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl text-white">No results found for &quot;{searchQuery}&quot;.</h2>
                <p className="text-ios-text-secondary-dark mt-2">Try searching for something else.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* PAGE: Watch */}
      {currentPage === 'watch' && selectedContent && (
        <div className="fixed inset-0 bg-ios-bg-dark z-50 overflow-y-auto">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <div className="text-white text-2xl font-bold">Video Player for {selectedContent.title}</div>
            <button onClick={goHome} className="absolute top-5 left-5 bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-extrabold text-white">{selectedContent.title}</h1>
              <div className="flex items-center space-x-4 text-ios-text-secondary-dark mt-2">
                <span>{selectedContent.year}</span>
                <span className="border border-ios-text-secondary-dark px-1 text-xs">{selectedContent.maturityRating}</span>
                <span className="text-green-400 font-bold">{selectedContent.rating * 10}% Match</span>
              </div>
              <p className="mt-4 text-white leading-relaxed">{selectedContent.description}</p>

              <div className="mt-6">
                <button onClick={() => toggleMyList(selectedContent.id)} className="flex flex-col items-center text-ios-text-secondary-dark hover:text-white transition-colors">
                  {!isInMyList(selectedContent.id) ? (
                    <div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      <span className="text-xs mt-1">My List</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className="text-xs mt-1">Added</span>
                    </div>
                  )}
                </button>
              </div>

              {selectedContent.type === 'tv' && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-white mb-4">Episodes</h2>
                  <div className="space-y-4">
                    {/* Mock Episodes */}
                    <div className="flex items-center p-3 bg-ios-panel-contrast-dark rounded-md cursor-pointer hover:bg-ios-panel-dark/50">
                      <span className="text-2xl font-bold text-ios-text-secondary-dark mr-4">1</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">Chapter One: The Vanishing</h3>
                        <p className="text-sm text-ios-text-secondary-dark mt-1">47m</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-ios-panel-contrast-dark rounded-md cursor-pointer hover:bg-ios-panel-dark/50">
                      <span className="text-2xl font-bold text-ios-text-secondary-dark mr-4">2</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">Chapter Two: The Weirdo</h3>
                        <p className="text-sm text-ios-text-secondary-dark mt-1">55m</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer (visible on most pages) */}
      {currentPage !== 'profiles' && currentPage !== 'watch' && (
        <footer className="mt-20 pb-10 text-ios-text-secondary-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="space-y-3">
                <a href="#" className="block hover:underline">FAQ</a>
                <a href="#" className="block hover:underline">Investor Relations</a>
                <a href="#" className="block hover:underline">Privacy</a>
                <a href="#" className="block hover:underline">Speed Test</a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">Help Center</a>
                <a href="#" className="block hover:underline">Jobs</a>
                <a href="#" className="block hover:underline">Cookie Preferences</a>
                <a href="#" className="block hover:underline">Legal Notices</a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">Account</a>
                <a href="#" className="block hover:underline">Ways to Watch</a>
                <a href="#" className="block hover:underline">Corporate Information</a>
                <a href="#" className="block hover:underline">Only on Notflix</a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">Media Center</a>
                <a href="#" className="block hover:underline">Terms of Use</a>
                <a href="#" className="block hover:underline">Contact Us</a>
              </div>
            </div>
            <p className="mt-8 text-xs">&copy; 1997-2023 Notflix, Inc. (Petite-Vue Demo)</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Home;
