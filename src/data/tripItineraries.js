/**
 * Trip Itineraries Database
 */

export const itineraries = {
    paris: {
        destination: 'Paris, France',
        description: 'The City of Light awaits with romantic streets, world-class museums, and exquisite cuisine.',
        days: [
            {
                day: 1,
                title: 'Arrival & Eiffel Tower',
                activities: [
                    'Arrive at Charles de Gaulle Airport',
                    'Check into hotel',
                    'Visit Eiffel Tower (book tickets in advance)',
                    'Seine River cruise at sunset',
                    'Dinner at a traditional French bistro'
                ]
            },
            {
                day: 2,
                title: 'Art & Culture',
                activities: [
                    'Louvre Museum (arrive early)',
                    'Lunch at Café Marly',
                    'Walk through Tuileries Garden',
                    'Visit Notre-Dame Cathedral',
                    'Explore Latin Quarter'
                ]
            },
            {
                day: 3,
                title: 'Montmartre & Shopping',
                activities: [
                    'Sacré-Cœur Basilica',
                    'Montmartre artists square',
                    'Lunch at local café',
                    'Champs-Élysées shopping',
                    'Arc de Triomphe'
                ]
            }
        ],
        tips: [
            'Buy Paris Museum Pass for skip-the-line access',
            'Use Metro for easy transportation',
            'Learn basic French phrases',
            'Book restaurants in advance'
        ]
    },
    dubai: {
        destination: 'Dubai, UAE',
        description: 'Experience luxury, modern architecture, and Arabian culture in this desert metropolis.',
        days: [
            {
                day: 1,
                title: 'Modern Dubai',
                activities: [
                    'Burj Khalifa observation deck',
                    'Dubai Mall shopping',
                    'Dubai Fountain show',
                    'Dinner at At.mosphere',
                    'Night view from Dubai Marina'
                ]
            },
            {
                day: 2,
                title: 'Desert & Culture',
                activities: [
                    'Dubai Museum',
                    'Gold & Spice Souks',
                    'Lunch at traditional restaurant',
                    'Desert safari with dune bashing',
                    'BBQ dinner under stars'
                ]
            },
            {
                day: 3,
                title: 'Beaches & Entertainment',
                activities: [
                    'Jumeirah Beach morning',
                    'Atlantis The Palm visit',
                    'Aquaventure water park',
                    'Burj Al Arab photo stop',
                    'Dubai Marina dinner cruise'
                ]
            }
        ],
        tips: [
            'Dress modestly in traditional areas',
            'Book desert safari through hotel',
            'Stay hydrated in the heat',
            'Use Dubai Metro for cheap transport'
        ]
    },
    istanbul: {
        destination: 'Istanbul, Turkey',
        description: 'Where East meets West - explore Byzantine and Ottoman heritage.',
        days: [
            {
                day: 1,
                title: 'Historic Peninsula',
                activities: [
                    'Hagia Sophia',
                    'Blue Mosque',
                    'Topkapi Palace',
                    'Basilica Cistern',
                    'Turkish dinner with live music'
                ]
            },
            {
                day: 2,
                title: 'Bazaars & Bosphorus',
                activities: [
                    'Grand Bazaar shopping',
                    'Spice Bazaar',
                    'Lunch at Eminönü',
                    'Bosphorus cruise',
                    'Dinner in Karaköy'
                ]
            },
            {
                day: 3,
                title: 'Asian Side & Modern Istanbul',
                activities: [
                    'Cross to Asian side',
                    'Çamlıca Hill viewpoint',
                    'Kadıköy market exploration',
                    'Istiklal Street',
                    'Galata Tower sunset'
                ]
            }
        ],
        tips: [
            'Get Istanbul Museum Pass',
            'Try Turkish breakfast',
            'Use Istanbulkart for public transport',
            'Bargain at bazaars'
        ]
    },
    lahore: {
        destination: 'Lahore, Pakistan',
        description: 'The cultural heart of Pakistan with Mughal architecture and vibrant food scene.',
        days: [
            {
                day: 1,
                title: 'Mughal Heritage',
                activities: [
                    'Badshahi Mosque',
                    'Lahore Fort',
                    'Shalimar Gardens',
                    'Food Street lunch',
                    'Wagah Border ceremony'
                ]
            },
            {
                day: 2,
                title: 'Old City',
                activities: [
                    'Wazir Khan Mosque',
                    'Delhi Gate walk',
                    'Anarkali Bazaar shopping',
                    'Lahore Museum',
                    'Mall Road evening'
                ]
            },
            {
                day: 3,
                title: 'Modern Lahore',
                activities: [
                    'Minar-e-Pakistan',
                    'Iqbal Park',
                    'Liberty Market',
                    'Packages Mall',
                    'Dinner at Cuckoo\'s Den'
                ]
            }
        ],
        tips: [
            'Best time: October to March',
            'Try local street food',
            'Hire a guide for old city',
            'Dress modestly'
        ]
    },
    london: {
        destination: 'London, UK',
        description: 'Historic capital with royal palaces, world-class museums, and vibrant cultural scene.',
        days: [
            {
                day: 1,
                title: 'Royal & Historic',
                activities: [
                    'Buckingham Palace (Changing of the Guard)',
                    'Westminster Abbey',
                    'Big Ben & Houses of Parliament',
                    'London Eye',
                    'Dinner in Covent Garden'
                ]
            },
            {
                day: 2,
                title: 'Museums & Culture',
                activities: [
                    'British Museum',
                    'National Gallery',
                    'Lunch at Borough Market',
                    'Tower of London & Crown Jewels',
                    'Tower Bridge walk'
                ]
            },
            {
                day: 3,
                title: 'Royal Parks & Shopping',
                activities: [
                    'Hyde Park morning walk',
                    'Kensington Palace',
                    'Harrods shopping',
                    'Piccadilly Circus',
                    'West End show (book in advance)'
                ]
            }
        ],
        tips: [
            'Get an Oyster card for public transport',
            'Book major attractions online in advance',
            'Many museums are free',
            'Pack an umbrella - weather is unpredictable'
        ]
    },
    tokyo: {
        destination: 'Tokyo, Japan',
        description: 'Modern metropolis blending traditional culture with cutting-edge technology.',
        days: [
            {
                day: 1,
                title: 'Traditional Tokyo',
                activities: [
                    'Senso-ji Temple, Asakusa',
                    'Tokyo Skytree observation deck',
                    'Ueno Park & Tokyo National Museum',
                    'Lunch at Tsukiji Outer Market',
                    'Evening in Shibuya (crossing & shopping)'
                ]
            },
            {
                day: 2,
                title: 'Imperial & Modern',
                activities: [
                    'Imperial Palace East Gardens',
                    'Ginza district exploration',
                    'Lunch at traditional izakaya',
                    'Harajuku & Takeshita Street',
                    'Meiji Shrine'
                ]
            },
            {
                day: 3,
                title: 'Pop Culture & Gardens',
                activities: [
                    'TeamLab Borderless (book ahead)',
                    'Odaiba waterfront',
                    'Roppongi Hills',
                    'Sushi dinner in Roppongi',
                    'Tokyo Tower evening view'
                ]
            }
        ],
        tips: [
            'Get a JR Pass if traveling around Japan',
            'Learn basic Japanese phrases',
            'Carry cash - many places don\'t accept cards',
            'Respect quiet on public transport'
        ]
    },
    newyork: {
        destination: 'New York, USA',
        description: 'The city that never sleeps - iconic landmarks, Broadway shows, and diverse neighborhoods.',
        days: [
            {
                day: 1,
                title: 'Midtown & Central Park',
                activities: [
                    'Times Square',
                    'Central Park stroll',
                    'Metropolitan Museum of Art',
                    'Fifth Avenue shopping',
                    'Broadway show (book in advance)'
                ]
            },
            {
                day: 2,
                title: 'Downtown & Statue',
                activities: [
                    'Statue of Liberty & Ellis Island',
                    '9/11 Memorial & Museum',
                    'Lunch in Little Italy',
                    'Brooklyn Bridge walk',
                    'Dinner in Brooklyn'
                ]
            },
            {
                day: 3,
                title: 'Soho & Greenwich',
                activities: [
                    'High Line walk',
                    'Chelsea Market',
                    'Soho shopping',
                    'Greenwich Village exploration',
                    'Empire State Building sunset'
                ]
            }
        ],
        tips: [
            'Get a MetroCard for subway',
            'Book Broadway tickets well in advance',
            'Tip 15-20% at restaurants',
            'Walkable city - comfortable shoes essential'
        ]
    },
    bangkok: {
        destination: 'Bangkok, Thailand',
        description: 'Vibrant capital with ornate temples, floating markets, and incredible street food.',
        days: [
            {
                day: 1,
                title: 'Temples & Royal',
                activities: [
                    'Grand Palace & Wat Phra Kaew',
                    'Wat Pho (Reclining Buddha)',
                    'Lunch at local food stall',
                    'Wat Arun (Temple of Dawn)',
                    'Dinner cruise on Chao Phraya River'
                ]
            },
            {
                day: 2,
                title: 'Markets & Culture',
                activities: [
                    'Damnoen Saduak Floating Market',
                    'Chatuchak Weekend Market',
                    'Jim Thompson House',
                    'Lumpini Park',
                    'Thai massage & street food tour'
                ]
            },
            {
                day: 3,
                title: 'Modern Bangkok',
                activities: [
                    'MBK Center shopping',
                    'Siam Paragon & CentralWorld',
                    'Sky Bar at sunset',
                    'Khao San Road experience',
                    'Traditional Thai dinner'
                ]
            }
        ],
        tips: [
            'Dress modestly at temples (cover shoulders & knees)',
            'Bargain at markets',
            'Use Grab or taxis - negotiate meter',
            'Try street food from busy vendors'
        ]
    },
    sydney: {
        destination: 'Sydney, Australia',
        description: 'Stunning harbor city with iconic opera house, beaches, and laid-back Aussie culture.',
        days: [
            {
                day: 1,
                title: 'Harbor & Opera',
                activities: [
                    'Sydney Opera House tour',
                    'Circular Quay walk',
                    'Royal Botanic Gardens',
                    'Lunch at The Rocks',
                    'Harbor Bridge climb (optional)'
                ]
            },
            {
                day: 2,
                title: 'Beaches & Views',
                activities: [
                    'Bondi Beach morning',
                    'Bondi to Coogee coastal walk',
                    'Lunch at Bondi',
                    'Darling Harbour',
                    'Dinner in Darling Harbour'
                ]
            },
            {
                day: 3,
                title: 'Culture & Markets',
                activities: [
                    'Taronga Zoo',
                    'Ferry to Manly Beach',
                    'Sydney Harbour National Park',
                    'Paddy\'s Markets',
                    'Evening at The Rocks'
                ]
            }
        ],
        tips: [
            'Get Opal card for public transport',
            'Sun protection essential - strong UV',
            'Beach season: Dec-Feb (summer)',
            'Book Opera House tours in advance'
        ]
    },
    karachi: {
        destination: 'Karachi, Pakistan',
        description: 'Pakistan\'s largest city with beautiful beaches, historic sites, and vibrant food culture.',
        days: [
            {
                day: 1,
                title: 'Coastal & Historic',
                activities: [
                    'Clifton Beach morning walk',
                    'Quaid-e-Azam Mausoleum',
                    'National Museum of Pakistan',
                    'Lunch at Burns Road (famous food street)',
                    'Dolmen Mall shopping'
                ]
            },
            {
                day: 2,
                title: 'Cultural Heritage',
                activities: [
                    'Frere Hall',
                    'Empress Market',
                    'St. Patrick\'s Cathedral',
                    'Mohatta Palace Museum',
                    'Dinner at Boat Basin'
                ]
            },
            {
                day: 3,
                title: 'Islands & Modern',
                activities: [
                    'Day trip to Manora Island',
                    'Port Grand waterfront',
                    'Sea View Beach',
                    'Do Darya seafood restaurants',
                    'Karachi Zoo or Safari Park'
                ]
            }
        ],
        tips: [
            'Best time: October to April (winter season)',
            'Try local street food: biryani, nihari, haleem',
            'Use ride-hailing apps (Careem, Uber) for transport',
            'Carry cash as many places don\'t accept cards'
        ]
    },
    islamabad: {
        destination: 'Islamabad, Pakistan',
        description: 'Pakistan\'s modern capital city nestled in the Margalla Hills with pristine nature and cultural sites.',
        days: [
            {
                day: 1,
                title: 'Capital & Monuments',
                activities: [
                    'Faisal Mosque (largest in Pakistan)',
                    'Pakistan Monument Museum',
                    'Daman-e-Koh viewpoint',
                    'Lunch in F-6 or F-7 sector',
                    'Centaurus Mall shopping'
                ]
            },
            {
                day: 2,
                title: 'Nature & Heritage',
                activities: [
                    'Margalla Hills hiking trail',
                    'Lok Virsa Museum (Heritage Museum)',
                    'Rawal Lake boating',
                    'Shakarparian Park',
                    'Dinner at Monal Restaurant (hilltop views)'
                ]
            },
            {
                day: 3,
                title: 'Modern & Day Trip',
                activities: [
                    'Lake View Park',
                    'Pakistan National Council of Arts',
                    'Optional: Taxila archaeological site (45 min drive)',
                    'Blue Area shopping',
                    'Evening at F-7 Markaz'
                ]
            }
        ],
        tips: [
            'Best time: March to May, September to November',
            'Book Monal Restaurant in advance for dinner',
            'Wear comfortable shoes for hiking',
            'Clean, safe, and well-planned city'
        ]
    },
    northernpakistan: {
        destination: 'Northern Pakistan (Hunza Valley)',
        description: 'Breathtaking mountain landscapes, ancient forts, and rich culture in the Karakoram Range.',
        days: [
            {
                day: 1,
                title: 'Arrival & Altit Fort',
                activities: [
                    'Arrive in Hunza via Karakoram Highway',
                    'Altit Fort visit (1000+ years old)',
                    'Baltit Fort exploration',
                    'Lunch with Hunza cuisine',
                    'Sunset at Eagle\'s Nest viewpoint'
                ]
            },
            {
                day: 2,
                title: 'Attabad Lake & Passu',
                activities: [
                    'Attabad Lake boat ride',
                    'Passu Cones viewpoint',
                    'Hussaini Suspension Bridge',
                    'Local village visit',
                    'Traditional dinner'
                ]
            },
            {
                day: 3,
                title: 'Khunjerab Pass',
                activities: [
                    'Day trip to Khunjerab Pass (China border)',
                    'Wildlife spotting (Marco Polo sheep)',
                    'Return to Hunza',
                    'Shopping for local handicrafts',
                    'Farewell dinner'
                ]
            }
        ],
        tips: [
            'Best time: April to October (check road conditions)',
            'Altitude: 2500m+ - stay hydrated',
            'Bring warm clothing even in summer',
            'Respect local customs and traditions',
            'Travel with guide for safety'
        ]
    },
    mumbai: {
        destination: 'Mumbai, India',
        description: 'India\'s financial capital with colonial architecture, Bollywood, and vibrant street life.',
        days: [
            {
                day: 1,
                title: 'Gateway & Harbor',
                activities: [
                    'Gateway of India',
                    'Taj Mahal Palace Hotel (photo stop)',
                    'Elephanta Caves (ferry ride)',
                    'Lunch at Colaba Causeway',
                    'Marine Drive evening walk'
                ]
            },
            {
                day: 2,
                title: 'Bollywood & Markets',
                activities: [
                    'Bollywood studio tour (optional)',
                    'Juhu Beach',
                    'Crawford Market shopping',
                    'Chhatrapati Shivaji Terminus (CST)',
                    'Dinner at Bade Miya (street food)'
                ]
            },
            {
                day: 3,
                title: 'Culture & Temples',
                activities: [
                    'Haji Ali Dargah',
                    'Siddhivinayak Temple',
                    'Dhobi Ghat (world\'s largest open-air laundry)',
                    'High Tea at Taj Mahal Palace',
                    'Dharavi slum tour (if interested)'
                ]
            }
        ],
        tips: [
            'Best time: November to February',
            'Use local trains for authentic experience',
            'Bargain at markets',
            'Try vada pav, pav bhaji, and seafood',
            'Book Bollywood tours in advance'
        ]
    },
    delhi: {
        destination: 'Delhi, India',
        description: 'India\'s historic capital blending Mughal heritage, colonial architecture, and modern culture.',
        days: [
            {
                day: 1,
                title: 'Mughal Heritage',
                activities: [
                    'Red Fort (Lal Qila)',
                    'Jama Masjid',
                    'Chandni Chowk walk',
                    'Lunch at Karim\'s',
                    'Raj Ghat (Gandhi Memorial)'
                ]
            },
            {
                day: 2,
                title: 'New Delhi',
                activities: [
                    'India Gate',
                    'Rashtrapati Bhavan (Presidential Palace)',
                    'Humayun\'s Tomb',
                    'Lotus Temple',
                    'Dinner in Connaught Place'
                ]
            },
            {
                day: 3,
                title: 'Temples & Markets',
                activities: [
                    'Akshardham Temple',
                    'Lodi Gardens',
                    'Dilli Haat shopping',
                    'Qutub Minar',
                    'Evening at Hauz Khas Village'
                ]
            }
        ],
        tips: [
            'Best time: October to March',
            'Use Metro for convenient transport',
            'Try street food at Chandni Chowk',
            'Book monuments online to skip queues',
            'Stay hydrated - carry water'
        ]
    },
    goa: {
        destination: 'Goa, India',
        description: 'Tropical paradise with pristine beaches, Portuguese heritage, and vibrant nightlife.',
        days: [
            {
                day: 1,
                title: 'Beaches & Old Goa',
                activities: [
                    'Calangute Beach',
                    'Basilica of Bom Jesus',
                    'Se Cathedral',
                    'Lunch at local Goan restaurant',
                    'Anjuna Beach sunset'
                ]
            },
            {
                day: 2,
                title: 'Water Sports & Markets',
                activities: [
                    'Water sports at Baga Beach',
                    'Aguada Fort',
                    'Anjuna Flea Market',
                    'Chapora Fort (Dil Chahta Hai spot)',
                    'Beachside dinner'
                ]
            },
            {
                day: 3,
                title: 'Spice & Nature',
                activities: [
                    'Spice plantation tour',
                    'Dudhsagar Falls (seasonal)',
                    'Palolem Beach',
                    'Goan cuisine cooking class',
                    'Nightlife at Tito\'s Lane'
                ]
            }
        ],
        tips: [
            'Best time: November to February',
            'Rent a scooter for beach hopping',
            'Try Goan fish curry and vindaloo',
            'Respect beach safety warnings',
            'Book water sports in advance during peak season'
        ]
    },
    rome: {
        destination: 'Rome, Italy',
        description: 'Eternal City with ancient ruins, Renaissance art, and world-class cuisine.',
        days: [
            {
                day: 1,
                title: 'Ancient Rome',
                activities: [
                    'Colosseum (book skip-the-line)',
                    'Roman Forum',
                    'Palatine Hill',
                    'Lunch in Trastevere',
                    'Trevi Fountain & Spanish Steps'
                ]
            },
            {
                day: 2,
                title: 'Vatican City',
                activities: [
                    'Vatican Museums & Sistine Chapel',
                    'St. Peter\'s Basilica',
                    'Castel Sant\'Angelo',
                    'Lunch near Vatican',
                    'Piazza Navona evening'
                ]
            },
            {
                day: 3,
                title: 'Renaissance & Food',
                activities: [
                    'Pantheon',
                    'Campo de\' Fiori market',
                    'Trastevere neighborhood',
                    'Gelato & espresso stops',
                    'Traditional Roman dinner'
                ]
            }
        ],
        tips: [
            'Book Colosseum & Vatican tickets in advance',
            'Comfortable walking shoes essential',
            'Try pasta carbonara, cacio e pepe, gelato',
            'Use Roma Pass for transport & attractions',
            'Beware of pickpockets in crowded areas'
        ]
    },
    barcelona: {
        destination: 'Barcelona, Spain',
        description: 'Artistic capital with Gaudí architecture, Mediterranean beaches, and vibrant culture.',
        days: [
            {
                day: 1,
                title: 'Gaudí & Modernisme',
                activities: [
                    'Sagrada Família (book ahead)',
                    'Park Güell',
                    'Casa Batlló',
                    'Lunch on Passeig de Gràcia',
                    'Evening at Las Ramblas'
                ]
            },
            {
                day: 2,
                title: 'Gothic Quarter & Beaches',
                activities: [
                    'Barcelona Cathedral',
                    'Gothic Quarter walk',
                    'La Boqueria Market',
                    'Barceloneta Beach',
                    'Tapas dinner in El Born'
                ]
            },
            {
                day: 3,
                title: 'Mountains & Culture',
                activities: [
                    'Montjuïc Hill & Magic Fountain',
                    'Picasso Museum',
                    'Parc de la Ciutadella',
                    'Shopping on Portal de l\'Àngel',
                    'Flamenco show (optional)'
                ]
            }
        ],
        tips: [
            'Book Sagrada Família tickets weeks in advance',
            'Get Hola BCN card for public transport',
            'Try tapas, paella, sangria',
            'Pickpocket awareness on Las Ramblas',
            'Many attractions closed Mondays - check schedules'
        ]
    },
    amsterdam: {
        destination: 'Amsterdam, Netherlands',
        description: 'Charming canal city with world-class museums, historic architecture, and vibrant culture.',
        days: [
            {
                day: 1,
                title: 'Canals & Museums',
                activities: [
                    'Anne Frank House (book in advance)',
                    'Canal boat cruise',
                    'Rijksmuseum',
                    'Lunch at Jordaan district',
                    'Evening walk through Red Light District'
                ]
            },
            {
                day: 2,
                title: 'Art & Culture',
                activities: [
                    'Van Gogh Museum',
                    'Vondelpark',
                    'Dam Square & Royal Palace',
                    'Lunch at local café',
                    'Evening at Leidseplein'
                ]
            },
            {
                day: 3,
                title: 'Markets & Windmills',
                activities: [
                    'Albert Cuyp Market',
                    'Zaanse Schans windmills (day trip)',
                    'Rembrandt House Museum',
                    'Dinner in De Pijp',
                    'Canal-side evening stroll'
                ]
            }
        ],
        tips: [
            'Book Anne Frank House tickets months in advance',
            'Use trams or bikes for transport',
            'Try stroopwafels, Dutch cheese, and herring',
            'Respect local customs and bike lanes',
            'Purchase Amsterdam City Card for discounts'
        ]
    },
    berlin: {
        destination: 'Berlin, Germany',
        description: 'Dynamic capital with rich history, vibrant arts scene, and cutting-edge architecture.',
        days: [
            {
                day: 1,
                title: 'Historic Berlin',
                activities: [
                    'Brandenburg Gate',
                    'Reichstag Building (book dome visit)',
                    'Holocaust Memorial',
                    'Checkpoint Charlie',
                    'Evening at Potsdamer Platz'
                ]
            },
            {
                day: 2,
                title: 'Museums & Culture',
                activities: [
                    'Museum Island (choose 2-3 museums)',
                    'Berlin Cathedral',
                    'East Side Gallery (Berlin Wall)',
                    'Lunch at Hackescher Markt',
                    'Evening in Prenzlauer Berg'
                ]
            },
            {
                day: 3,
                title: 'Modern Berlin',
                activities: [
                    'Pergamon Museum or DDR Museum',
                    'Alexanderplatz & TV Tower',
                    'Kreuzberg neighborhood',
                    'Street art tour',
                    'Nightlife in Friedrichshain'
                ]
            }
        ],
        tips: [
            'Get Berlin WelcomeCard for transport and discounts',
            'Book Reichstag dome visit online (free)',
            'Try currywurst, schnitzel, and beer',
            'Many museums closed Mondays',
            'Public transport is efficient and affordable'
        ]
    },
    prague: {
        destination: 'Prague, Czech Republic',
        description: 'Fairytale city with stunning architecture, medieval charm, and rich history.',
        days: [
            {
                day: 1,
                title: 'Old Town & Castle',
                activities: [
                    'Prague Castle complex',
                    'St. Vitus Cathedral',
                    'Charles Bridge walk',
                    'Lunch in Old Town Square',
                    'Astronomical Clock show'
                ]
            },
            {
                day: 2,
                title: 'Historic Quarters',
                activities: [
                    'Jewish Quarter (Josefov)',
                    'Old Town exploration',
                    'Lunch at local Czech restaurant',
                    'Vltava River cruise',
                    'Evening at Wenceslas Square'
                ]
            },
            {
                day: 3,
                title: 'Culture & Views',
                activities: [
                    'Prague National Museum',
                    'Petřín Hill & Observation Tower',
                    'Lennon Wall',
                    'Dinner in Malá Strana',
                    'Traditional Czech beer tasting'
                ]
            }
        ],
        tips: [
            'Buy Prague Card for discounts',
            'Try traditional Czech food: goulash, dumplings, trdelník',
            'Charles Bridge is less crowded early morning',
            'Use public transport or walk (city is walkable)',
            'Book castle tickets online to skip queues'
        ]
    },
    vienna: {
        destination: 'Vienna, Austria',
        description: 'Imperial capital with baroque palaces, classical music heritage, and coffeehouse culture.',
        days: [
            {
                day: 1,
                title: 'Imperial Vienna',
                activities: [
                    'Schönbrunn Palace',
                    'Belvedere Palace',
                    'St. Stephen\'s Cathedral',
                    'Lunch at traditional café',
                    'Evening opera or concert'
                ]
            },
            {
                day: 2,
                title: 'Historic Center',
                activities: [
                    'Hofburg Palace',
                    'Spanish Riding School (if scheduled)',
                    'Vienna State Opera exterior',
                    'Lunch at Naschmarkt',
                    'Ringstrasse tram ride'
                ]
            },
            {
                day: 3,
                title: 'Museums & Culture',
                activities: [
                    'Kunsthistorisches Museum',
                    'Mozart House',
                    'Prater amusement park',
                    'Coffeehouse experience',
                    'Traditional Viennese dinner'
                ]
            }
        ],
        tips: [
            'Get Vienna Pass for attractions',
            'Experience traditional coffeehouse culture',
            'Try Wiener Schnitzel, Sachertorte, Apfelstrudel',
            'Book concerts/opera in advance',
            'Public transport is excellent'
        ]
    },
    athens: {
        destination: 'Athens, Greece',
        description: 'Ancient capital where history comes alive with iconic ruins and vibrant modern culture.',
        days: [
            {
                day: 1,
                title: 'Acropolis & Ancient Sites',
                activities: [
                    'Acropolis & Parthenon (early morning)',
                    'Acropolis Museum',
                    'Ancient Agora',
                    'Lunch in Plaka district',
                    'Evening in Monastiraki'
                ]
            },
            {
                day: 2,
                title: 'History & Culture',
                activities: [
                    'National Archaeological Museum',
                    'Temple of Olympian Zeus',
                    'Panathenaic Stadium',
                    'Lunch at traditional taverna',
                    'Evening walk in Plaka'
                ]
            },
            {
                day: 3,
                title: 'Modern Athens & Views',
                activities: [
                    'Mount Lycabettus for views',
                    'National Garden',
                    'Syntagma Square & Changing of Guard',
                    'Shopping in Ermou Street',
                    'Traditional Greek dinner with music'
                ]
            }
        ],
        tips: [
            'Visit Acropolis early to avoid crowds and heat',
            'Buy combined ticket for archaeological sites',
            'Try Greek food: moussaka, souvlaki, Greek salad',
            'Use Metro for efficient transport',
            'Carry water and sun protection in summer'
        ]
    },
    losangeles: {
        destination: 'Los Angeles, USA',
        description: 'Entertainment capital with beaches, Hollywood glamour, and diverse neighborhoods.',
        days: [
            {
                day: 1,
                title: 'Hollywood & Beverly Hills',
                activities: [
                    'Hollywood Walk of Fame',
                    'TCL Chinese Theatre',
                    'Beverly Hills & Rodeo Drive',
                    'Lunch in West Hollywood',
                    'Griffith Observatory sunset'
                ]
            },
            {
                day: 2,
                title: 'Beaches & Coastal',
                activities: [
                    'Santa Monica Pier',
                    'Venice Beach boardwalk',
                    'Lunch at beachfront restaurant',
                    'Getty Villa or Getty Center',
                    'Dinner in Santa Monica'
                ]
            },
            {
                day: 3,
                title: 'Culture & Downtown',
                activities: [
                    'Universal Studios or Warner Bros Studio Tour',
                    'LACMA or The Broad museum',
                    'Downtown LA exploration',
                    'Grand Central Market',
                    'Evening in downtown'
                ]
            }
        ],
        tips: [
            'Rent a car or use Uber - city is spread out',
            'Book studio tours in advance',
            'Try diverse cuisines: Korean BBQ, Mexican, food trucks',
            'Traffic is heavy - plan accordingly',
            'Parking can be expensive - research options'
        ]
    },
    toronto: {
        destination: 'Toronto, Canada',
        description: 'Cosmopolitan city with diverse culture, iconic CN Tower, and vibrant neighborhoods.',
        days: [
            {
                day: 1,
                title: 'Downtown & Tower',
                activities: [
                    'CN Tower',
                    'Ripley\'s Aquarium',
                    'Harbourfront Centre',
                    'Lunch in St. Lawrence Market',
                    'Evening at Distillery District'
                ]
            },
            {
                day: 2,
                title: 'Culture & Islands',
                activities: [
                    'Royal Ontario Museum',
                    'Art Gallery of Ontario',
                    'Toronto Islands ferry ride',
                    'Lunch on the islands',
                    'Evening in Kensington Market'
                ]
            },
            {
                day: 3,
                title: 'Neighborhoods & Views',
                activities: [
                    'Casa Loma',
                    'Chinatown exploration',
                    'University of Toronto campus',
                    'Lunch in Little Italy',
                    'Evening at Entertainment District'
                ]
            }
        ],
        tips: [
            'Get Toronto CityPASS for discounts',
            'Try diverse cuisines reflecting multicultural city',
            'Use TTC (public transit) - efficient',
            'CN Tower views best on clear days',
            'Toronto Islands great for escaping city'
        ]
    },
    mexicocity: {
        destination: 'Mexico City, Mexico',
        description: 'Vibrant capital with Aztec heritage, colonial architecture, and world-class cuisine.',
        days: [
            {
                day: 1,
                title: 'Historic Center',
                activities: [
                    'Zócalo (main square)',
                    'Metropolitan Cathedral',
                    'Templo Mayor ruins',
                    'Lunch at traditional restaurant',
                    'Palace of Fine Arts'
                ]
            },
            {
                day: 2,
                title: 'Museums & Xochimilco',
                activities: [
                    'National Museum of Anthropology',
                    'Xochimilco floating gardens',
                    'Frida Kahlo Museum (Casa Azul)',
                    'Lunch in Coyoacán',
                    'Evening in Roma or Condesa'
                ]
            },
            {
                day: 3,
                title: 'Pyramids & Markets',
                activities: [
                    'Teotihuacán pyramids (day trip)',
                    'Basilica of Our Lady of Guadalupe',
                    'San Juan Market',
                    'Street food tour',
                    'Traditional dinner'
                ]
            }
        ],
        tips: [
            'Try authentic Mexican food: tacos, mole, chilaquiles',
            'Use Uber or Metro for transport',
            'Book Frida Kahlo Museum in advance',
            'Drink bottled water',
            'Bargain at markets'
        ]
    },
    riodejaneiro: {
        destination: 'Rio de Janeiro, Brazil',
        description: 'Iconic beach city with stunning landscapes, samba culture, and vibrant energy.',
        days: [
            {
                day: 1,
                title: 'Christ & Views',
                activities: [
                    'Christ the Redeemer (Corcovado)',
                    'Santa Teresa neighborhood',
                    'Selarón Steps',
                    'Lunch at traditional churrascaria',
                    'Evening in Lapa'
                ]
            },
            {
                day: 2,
                title: 'Beaches & Culture',
                activities: [
                    'Copacabana Beach morning',
                    'Ipanema Beach',
                    'Sugar Loaf Mountain',
                    'Lunch at beachfront',
                    'Samba show (optional)'
                ]
            },
            {
                day: 3,
                title: 'Historic & Markets',
                activities: [
                    'Historic Center',
                    'Confeitaria Colombo',
                    'Tijuca National Park',
                    'Feira Hippie market',
                    'Traditional Brazilian dinner'
                ]
            }
        ],
        tips: [
            'Book Corcovado and Sugar Loaf tickets in advance',
            'Try Brazilian food: feijoada, pão de açúcar, caipirinhas',
            'Beach safety - use lockers for valuables',
            'Use Uber for safe transport',
            'Learn basic Portuguese phrases'
        ]
    },
    buenosaires: {
        destination: 'Buenos Aires, Argentina',
        description: 'Paris of South America with tango culture, European architecture, and world-class steaks.',
        days: [
            {
                day: 1,
                title: 'Historic Center',
                activities: [
                    'Plaza de Mayo',
                    'Casa Rosada',
                    'San Telmo Market',
                    'Lunch at traditional parilla',
                    'Evening tango show'
                ]
            },
            {
                day: 2,
                title: 'Culture & Neighborhoods',
                activities: [
                    'La Recoleta Cemetery',
                    'Palermo neighborhood',
                    'El Caminito in La Boca',
                    'Lunch in Palermo',
                    'Evening in Puerto Madero'
                ]
            },
            {
                day: 3,
                title: 'Arts & Markets',
                activities: [
                    'MALBA museum',
                    'Recoleta Cultural Center',
                    'San Telmo antiques',
                    'Tango lesson (optional)',
                    'Traditional asado dinner'
                ]
            }
        ],
        tips: [
            'Try Argentine steak (asado) and Malbec wine',
            'Tango shows - book in advance',
            'Use Uber or Subte (metro)',
            'Bargain at markets',
            'Best time: March to May, September to November'
        ]
    },
    melbourne: {
        destination: 'Melbourne, Australia',
        description: 'Cultural capital with laneways, coffee culture, and vibrant arts scene.',
        days: [
            {
                day: 1,
                title: 'City Center & Laneways',
                activities: [
                    'Federation Square',
                    'Flinders Street Station',
                    'Laneway exploration (Hosier, AC/DC)',
                    'Lunch in Chinatown',
                    'Evening at Southbank'
                ]
            },
            {
                day: 2,
                title: 'Culture & Markets',
                activities: [
                    'Queen Victoria Market',
                    'National Gallery of Victoria',
                    'St Kilda Beach',
                    'Lunch in St Kilda',
                    'Evening at Crown Casino or bars'
                ]
            },
            {
                day: 3,
                title: 'Gardens & Views',
                activities: [
                    'Royal Botanic Gardens',
                    'Shrine of Remembrance',
                    'Brighton Beach (colorful huts)',
                    'Lunch in Fitzroy',
                    'Coffee culture experience'
                ]
            }
        ],
        tips: [
            'Excellent coffee culture - try local cafés',
            'Use trams (free in city center)',
            'Weather can change quickly - layer clothing',
            'Try diverse cuisines in multicultural city',
            'Laneways are hidden gems - explore'
        ]
    },
    auckland: {
        destination: 'Auckland, New Zealand',
        description: 'City of Sails with harbors, volcanoes, and stunning natural beauty.',
        days: [
            {
                day: 1,
                title: 'Harbor & Views',
                activities: [
                    'Sky Tower',
                    'Auckland Harbour Bridge',
                    'Viaduct Harbour',
                    'Lunch at waterfront',
                    'Evening walk in CBD'
                ]
            },
            {
                day: 2,
                title: 'Islands & Volcanos',
                activities: [
                    'Waiheke Island day trip',
                    'Wine tasting on Waiheke',
                    'Beach time',
                    'Return to Auckland',
                    'Dinner in Ponsonby'
                ]
            },
            {
                day: 3,
                title: 'Culture & Nature',
                activities: [
                    'Auckland Museum',
                    'Mount Eden (Maungawhau)',
                    'Parnell village',
                    'Lunch in Parnell',
                    'Auckland Art Gallery'
                ]
            }
        ],
        tips: [
            'Try New Zealand wines and lamb',
            'Waiheke Island - allow full day',
            'Weather can be changeable',
            'Friendly locals - don\'t hesitate to ask',
            'Beautiful harbor views throughout city'
        ]
    },
    cairo: {
        destination: 'Cairo, Egypt',
        description: 'Ancient capital with pyramids, pharaonic history, and vibrant bazaars.',
        days: [
            {
                day: 1,
                title: 'Pyramids & Sphinx',
                activities: [
                    'Giza Pyramids (arrive early)',
                    'Great Sphinx',
                    'Camel ride (optional)',
                    'Lunch near pyramids',
                    'Sound and Light show (evening)'
                ]
            },
            {
                day: 2,
                title: 'Museums & Bazaars',
                activities: [
                    'Egyptian Museum',
                    'Khan el-Khalili Bazaar',
                    'Al-Azhar Mosque',
                    'Lunch in Islamic Cairo',
                    'Evening Nile cruise'
                ]
            },
            {
                day: 3,
                title: 'Historic Cairo',
                activities: [
                    'Coptic Cairo',
                    'Hanging Church',
                    'Sultan Hassan Mosque',
                    'Lunch at traditional restaurant',
                    'Shopping for souvenirs'
                ]
            }
        ],
        tips: [
            'Visit pyramids early to avoid crowds and heat',
            'Bargain aggressively at bazaars',
            'Respect local customs and dress modestly',
            'Drink bottled water only',
            'Hire guide for pyramids - recommended'
        ]
    },
    capetown: {
        destination: 'Cape Town, South Africa',
        description: 'Stunning coastal city with Table Mountain, wine regions, and rich culture.',
        days: [
            {
                day: 1,
                title: 'Table Mountain & Waterfront',
                activities: [
                    'Table Mountain (weather dependent)',
                    'V&A Waterfront',
                    'Lunch at waterfront',
                    'Two Oceans Aquarium',
                    'Evening at waterfront'
                ]
            },
            {
                day: 2,
                title: 'Peninsula & Penguins',
                activities: [
                    'Cape of Good Hope',
                    'Boulders Beach penguins',
                    'Chapman\'s Peak Drive',
                    'Lunch in Hout Bay',
                    'Return to Cape Town'
                ]
            },
            {
                day: 3,
                title: 'Culture & Wine',
                activities: [
                    'Robben Island tour (book in advance)',
                    'Bo-Kaap colorful houses',
                    'Kirstenbosch Gardens',
                    'Wine tasting in Constantia',
                    'Dinner in Camps Bay'
                ]
            }
        ],
        tips: [
            'Book Table Mountain and Robben Island in advance',
            'Weather changes quickly - check forecasts',
            'Try local wines and braai (BBQ)',
            'Use Uber for safe transport',
            'Safety awareness in certain areas'
        ]
    },
    marrakech: {
        destination: 'Marrakech, Morocco',
        description: 'Exotic city with souks, palaces, and vibrant medina life.',
        days: [
            {
                day: 1,
                title: 'Medina & Souks',
                activities: [
                    'Jemaa el-Fnaa square',
                    'Bahia Palace',
                    'Saadian Tombs',
                    'Lunch in medina',
                    'Evening at Djemaa el-Fna (night market)'
                ]
            },
            {
                day: 2,
                title: 'Palaces & Gardens',
                activities: [
                    'Majorelle Garden',
                    'Koutoubia Mosque',
                    'El Badi Palace',
                    'Lunch at rooftop restaurant',
                    'Hammam spa experience'
                ]
            },
            {
                day: 3,
                title: 'Atlas & Culture',
                activities: [
                    'Atlas Mountains day trip (optional)',
                    'Medersa Ben Youssef',
                    'Souk exploration and shopping',
                    'Traditional Moroccan dinner',
                    'Riad experience'
                ]
            }
        ],
        tips: [
            'Bargain at souks (start at 30% of asking price)',
            'Dress modestly - respect local customs',
            'Try tagine, couscous, mint tea',
            'Get lost in medina - part of experience',
            'Stay in riad for authentic experience'
        ]
    },
    hongkong: {
        destination: 'Hong Kong',
        description: 'Dynamic metropolis with stunning skyline, dim sum, and vibrant culture.',
        days: [
            {
                day: 1,
                title: 'Victoria Peak & Central',
                activities: [
                    'Victoria Peak (The Peak)',
                    'Peak Tram ride',
                    'Central district',
                    'Lunch with dim sum',
                    'Evening Symphony of Lights'
                ]
            },
            {
                day: 2,
                title: 'Islands & Markets',
                activities: [
                    'Star Ferry to Tsim Sha Tsui',
                    'Temple Street Night Market',
                    'Wong Tai Sin Temple',
                    'Lunch at local cha chaan teng',
                    'Evening in Mong Kok'
                ]
            },
            {
                day: 3,
                title: 'Culture & Views',
                activities: [
                    'Lantau Island & Big Buddha',
                    'Ngong Ping 360 cable car',
                    'Tai O fishing village',
                    'Return to Hong Kong',
                    'Dinner at traditional restaurant'
                ]
            }
        ],
        tips: [
            'Get Octopus card for transport',
            'Try dim sum, roast duck, egg tarts',
            'English widely spoken',
            'Best views from The Peak',
            'Weather can be humid - dress accordingly'
        ]
    },
    singapore: {
        destination: 'Singapore',
        description: 'Modern city-state with diverse culture, stunning architecture, and world-class cuisine.',
        days: [
            {
                day: 1,
                title: 'Marina Bay & Gardens',
                activities: [
                    'Gardens by the Bay',
                    'Marina Bay Sands',
                    'Merlion Park',
                    'Lunch in Chinatown',
                    'Evening light show'
                ]
            },
            {
                day: 2,
                title: 'Culture & Food',
                activities: [
                    'Little India',
                    'Arab Street & Haji Lane',
                    'Singapore Botanic Gardens',
                    'Lunch at hawker center',
                    'Evening at Clarke Quay'
                ]
            },
            {
                day: 3,
                title: 'Sentosa & Shopping',
                activities: [
                    'Sentosa Island',
                    'Universal Studios or beaches',
                    'Orchard Road shopping',
                    'Lunch at Sentosa',
                    'Dinner at Marina Bay'
                ]
            }
        ],
        tips: [
            'Try food at hawker centers - affordable and delicious',
            'Public transport is excellent',
            'Strict laws - no gum, no littering',
            'Many indoor attractions (good for rainy days)',
            'Garden Rhapsody light show is free'
        ]
    },
    seoul: {
        destination: 'Seoul, South Korea',
        description: 'Dynamic capital blending traditional palaces with cutting-edge technology.',
        days: [
            {
                day: 1,
                title: 'Palaces & Traditional',
                activities: [
                    'Gyeongbokgung Palace',
                    'Bukchon Hanok Village',
                    'Insadong street',
                    'Lunch with Korean BBQ',
                    'Evening in Myeongdong'
                ]
            },
            {
                day: 2,
                title: 'Modern Seoul',
                activities: [
                    'N Seoul Tower',
                    'Gangnam district',
                    'COEX Mall',
                    'Lunch in Gangnam',
                    'Evening in Hongdae'
                ]
            },
            {
                day: 3,
                title: 'Markets & Culture',
                activities: [
                    'Gwangjang Market',
                    'Dongdaemun Design Plaza',
                    'Cheonggyecheon Stream',
                    'Lunch at market',
                    'Korean spa (jjimjilbang) experience'
                ]
            }
        ],
        tips: [
            'Try Korean food: BBQ, kimchi, bibimbap, Korean fried chicken',
            'Get T-money card for transport',
            'Learn basic Korean phrases',
            'Many places accept cards',
            'Palace changing of guard ceremony is free'
        ]
    },
    bali: {
        destination: 'Bali, Indonesia',
        description: 'Tropical paradise with stunning temples, rice terraces, and beautiful beaches.',
        days: [
            {
                day: 1,
                title: 'Temples & Rice Terraces',
                activities: [
                    'Tanah Lot Temple',
                    'Tegalalang Rice Terraces',
                    'Ubud Monkey Forest',
                    'Lunch in Ubud',
                    'Evening in Seminyak'
                ]
            },
            {
                day: 2,
                title: 'Beaches & Culture',
                activities: [
                    'Uluwatu Temple & Kecak dance',
                    'Beach time (Padang Padang or Dreamland)',
                    'Lunch at beach club',
                    'Spa treatment',
                    'Sunset dinner'
                ]
            },
            {
                day: 3,
                title: 'Nature & Markets',
                activities: [
                    'Mount Batur sunrise (early start) or Waterfall tour',
                    'Ubud Art Market',
                    'Traditional Balinese cooking class',
                    'Lunch with local cuisine',
                    'Traditional dance performance'
                ]
            }
        ],
        tips: [
            'Try Balinese food: nasi goreng, satay, babi guling',
            'Rent scooter for flexibility (if comfortable)',
            'Dress modestly for temples (sarong provided)',
            'Bargain at markets',
            'Respect local customs and temples'
        ]
    }
};

/**
 * Search itinerary by destination - Simple and reliable
 */
export function searchItinerary(destination) {
    if (!destination || typeof destination !== 'string') {
        return null;
    }
    
    const searchInput = destination.trim();
    if (!searchInput) {
        return null;
    }
    
    // Exact match (case-sensitive)
    for (const key in itineraries) {
        if (itineraries[key].destination === searchInput) {
            return itineraries[key];
        }
    }
    
    // Case-insensitive exact match
    const searchLower = searchInput.toLowerCase();
    for (const key in itineraries) {
        if (itineraries[key].destination.toLowerCase() === searchLower) {
            return itineraries[key];
        }
    }
    
    // Try matching by city name (before comma)
    const cityName = searchInput.split(',')[0].trim().toLowerCase();
    for (const key in itineraries) {
        const destCity = itineraries[key].destination.toLowerCase().split(',')[0].trim();
        if (destCity === cityName) {
            return itineraries[key];
        }
    }
    
    // Normalize to key format and try direct key lookup
    let keyName = searchLower.replace(/[^a-z0-9]/g, '');
    
    // Handle special cases
    if (keyName.includes('hunza') || (keyName.includes('northern') && keyName.includes('pakistan'))) {
        keyName = 'northernpakistan';
    } else if (keyName.includes('newyork') || keyName === 'newyorkcity' || keyName === 'nyc') {
        keyName = 'newyork';
    } else if (keyName.includes('losangeles') || keyName === 'la') {
        keyName = 'losangeles';
    } else if (keyName.includes('mexicocity') || keyName === 'mexico') {
        keyName = 'mexicocity';
    } else if (keyName.includes('riodejaneiro') || keyName === 'rio') {
        keyName = 'riodejaneiro';
    } else if (keyName.includes('buenosaires') || keyName === 'buenos') {
        keyName = 'buenosaires';
    } else if (keyName.includes('capetown') || keyName === 'cape') {
        keyName = 'capetown';
    } else if (keyName.includes('hongkong') || keyName === 'hk') {
        keyName = 'hongkong';
    } else if (keyName.includes('unitedarabemirates') || keyName.includes('uae')) {
        keyName = 'dubai';
    } else if (keyName.includes('unitedkingdom') || keyName.includes('uk') || keyName.includes('england')) {
        keyName = 'london';
    }
    
    if (itineraries[keyName]) {
        return itineraries[keyName];
    }
    
    // Try city-only key
    const cityKey = cityName.replace(/[^a-z0-9]/g, '');
    if (itineraries[cityKey]) {
        return itineraries[cityKey];
    }
    
    return null;
}

/**
 * Get all destinations
 */
export function getAllDestinations() {
    return Object.values(itineraries).map(i => i.destination);
}

/**
 * Generate custom itinerary based on days
 */
export function generateCustomItinerary(destination, days) {
    const baseItinerary = searchItinerary(destination);
    if (!baseItinerary) return null;

    if (days <= baseItinerary.days.length) {
        return {
            ...baseItinerary,
            days: baseItinerary.days.slice(0, days)
        };
    } else {
        // If more days requested, suggest nearby destinations
        return {
            ...baseItinerary,
            suggestion: `We have a ${baseItinerary.days.length}-day itinerary for ${baseItinerary.destination}. For ${days} days, consider adding nearby destinations.`
        };
    }
}
