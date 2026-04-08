export type Place = {
  id: string;
  slug: string;
  name: string;
  region: string;
  regionColor: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  altitude?: string;
  bestTime?: string;
  category: string;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  relatedSlugs: string[];
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  location: string;
  height: "tall" | "medium" | "short";
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
};

// ─── PLACES ──────────────────────────────────────────────────────────────────

export const places: Place[] = [
  {
    id: "1",
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Gilgit-Baltistan",
    regionColor: "emerald",
    description:
      "A breathtaking alpine meadow at the base of Nanga Parbat, offering panoramic views of the world's 9th highest peak.",
    longDescription:
      "Fairy Meadows is one of the most stunning natural sites in Pakistan, located at the base of Nanga Parbat — the 9th highest mountain in the world. Surrounded by dense pine forests and wildflower-dotted meadows, it sits at an altitude of 3,300 meters. The journey itself is an adventure — a jeep ride on one of the world's most dangerous roads followed by a 3-hour hike. Sunrises here turn Nanga Parbat golden, a spectacle that leaves every visitor speechless.",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    ],
    rating: 4.9,
    altitude: "3,300m",
    bestTime: "May – September",
    category: "Mountain",
  },
  {
    id: "2",
    slug: "hunza-valley",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    regionColor: "emerald",
    description:
      "A paradise valley surrounded by snow-capped peaks, ancient forts, and apricot orchards that bloom every spring.",
    longDescription:
      "Nestled at the confluence of the Hunza and Nager rivers, Hunza Valley is often described as the closest place to Shangri-La on Earth. The valley is flanked by massive peaks including Rakaposhi and Ultar Sar. Every April, thousands of apricot trees burst into pink and white blossom, creating one of the most magical landscapes in Asia. The ancient Baltit and Altit forts overlook the valley, bearing witness to centuries of history.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80",
    ],
    rating: 4.8,
    altitude: "2,438m",
    bestTime: "April – October",
    category: "Valley",
  },
  {
    id: "3",
    slug: "deosai-plains",
    name: "Deosai Plains",
    region: "Gilgit-Baltistan",
    regionColor: "emerald",
    description:
      "The 'Land of Giants' — the world's second highest plateau, home to Himalayan brown bears and a sea of wildflowers.",
    longDescription:
      "Deosai National Park, meaning 'Land of Giants' in Shina, is one of the highest plateaus in the world, averaging 4,114 meters above sea level. In summer, this vast plateau transforms into a carpet of multi-colored wildflowers — reds, yellows, purples and whites as far as the eye can see. It is home to the Himalayan brown bear, along with snow leopards, golden marmots, and hundreds of bird species. The crystal-clear Sheosar Lake sits in the middle, reflecting the infinite sky.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    ],
    rating: 4.7,
    altitude: "4,114m",
    bestTime: "July – September",
    category: "Plateau",
  },
  {
    id: "4",
    slug: "swat-valley",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    regionColor: "blue",
    description:
      "The 'Switzerland of Pakistan' with emerald rivers, lush forests, ancient Buddhist ruins and snow-capped peaks.",
    longDescription:
      "Swat Valley, known as the 'Switzerland of Pakistan', is a verdant paradise in the Hindu Kush mountains. The Swat River, with its clear emerald waters, flows through the valley flanked by terraced fields and thick pine forests. The valley has a rich Buddhist heritage — the Udegram ruins and Butkara Stupa date back to the Gandhara civilization. In winter, Malam Jabba becomes a premier ski resort, while summer brings cool breezes and trout fishing.",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    ],
    rating: 4.6,
    altitude: "980m",
    bestTime: "April – October",
    category: "Valley",
  },
  {
    id: "5",
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    regionColor: "emerald",
    description:
      "The gateway to K2 and the Karakoram Range — a high-altitude desert town with turquoise lakes and ancient rock carvings.",
    longDescription:
      "Skardu is the nerve center for expeditions to K2, the world's second highest mountain, and other giants of the Karakoram. The town sits in a wide valley carved by the Indus River, surrounded by dramatic desert landscapes and snow-capped peaks. Shangrila Resort, Satpara Lake, and Kachura Lake offer turquoise waters against barren mountains. The ancient Skardu Fort (Kharpocho) overlooks the entire valley, a sentinel from centuries past.",
    image:
      "https://images.unsplash.com/photo-1526749837599-b4eba9fd855e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526749837599-b4eba9fd855e?w=600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    ],
    rating: 4.8,
    altitude: "2,228m",
    bestTime: "May – October",
    category: "Town",
  },
  {
    id: "6",
    slug: "naran-kaghan",
    name: "Naran Kaghan",
    region: "Khyber Pakhtunkhwa",
    regionColor: "blue",
    description:
      "A spectacular valley with rushing rivers, glacial lakes, and alpine meadows — a favorite escape from the plains.",
    longDescription:
      "The Kaghan Valley stretches 155 km from Balakot to Babusar Pass, rising from subtropical forests to Arctic tundra. Naran sits at its heart — a bustling hill town on the banks of the Kunhar River. The jewel of the valley is Saif-ul-Malook Lake, a glacial lake at 3,224m surrounded by snow peaks and steeped in Sufi legend. The drive over Babusar Pass (4,173m) offers some of the most dramatic Himalayan scenery accessible by road.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
    ],
    rating: 4.7,
    altitude: "2,409m",
    bestTime: "June – September",
    category: "Valley",
  },
  {
    id: "7",
    slug: "lahore-old-city",
    name: "Lahore Old City",
    region: "Punjab",
    regionColor: "orange",
    description:
      "The cultural heart of Pakistan — Mughal monuments, ancient bazaars, and street food that has been perfected over centuries.",
    longDescription:
      "Lahore's Walled City is one of the oldest continuously inhabited places in South Asia, a labyrinth of narrow alleys, Mughal-era mosques, and colonial-era buildings. The Badshahi Mosque, built in 1673, is one of the largest in the world. The Lahore Fort houses the stunning Sheesh Mahal (Palace of Mirrors). Every evening, Food Street in the old city comes alive with the aromas of nihari, paya, and seekh kababs. The city breathes history at every turn.",
    image:
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
      "https://images.unsplash.com/photo-1610527500986-6c4de7a54a1b?w=600&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80",
    ],
    rating: 4.7,
    altitude: "217m",
    bestTime: "October – March",
    category: "City",
  },
  {
    id: "8",
    slug: "attabad-lake",
    name: "Attabad Lake",
    region: "Gilgit-Baltistan",
    regionColor: "emerald",
    description:
      "A surreal turquoise lake formed by a landslide in 2010, now one of Pakistan's most stunning and unique destinations.",
    longDescription:
      "Attabad Lake was formed in January 2010 when a massive landslide dammed the Hunza River, displacing thousands and submerging a stretch of the Karakoram Highway. What emerged from the tragedy is one of the most surreal lakes in the world — electric blue-turquoise waters stretching 21 km, flanked by towering mountains. Boat rides on the lake with mountain peaks reflected in the water are nothing short of otherworldly. Today it draws more visitors than any other spot on the KKH.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
    ],
    rating: 4.9,
    altitude: "2,638m",
    bestTime: "May – October",
    category: "Lake",
  },
];

// ─── BLOGS ───────────────────────────────────────────────────────────────────

export const blogs: Blog[] = [
  {
    id: "1",
    slug: "fairy-meadows-guide",
    title: "The Complete Guide to Fairy Meadows: Pakistan's Alpine Paradise",
    excerpt:
      "Everything you need to know to plan your trek to one of Pakistan's most magical destinations — from getting there to where to stay.",
    content: `
Fairy Meadows is not just a destination — it's a pilgrimage for every nature lover who has ever dreamed of standing at the foot of a Himalayan giant. Nanga Parbat (8,126m), the world's ninth highest peak and the "Killer Mountain," towers above this serene alpine meadow in an almost incomprehensible display of scale and beauty.

## Getting There

The journey to Fairy Meadows begins at Raikot Bridge on the Karakoram Highway, about 60 km from Chilas. From the bridge, a notorious jeep track — one of the most dangerous roads in the world — climbs 15 km to Tato village. The road is so steep and narrow that only customized jeeps can navigate it, and even seasoned drivers grip the wheel white-knuckled.

From Tato, it's a 3-5 hour hike (or horse ride) through dense pine forest and across glacial streams to the meadow itself. The trail gains about 800 meters in altitude, passing through rhododendron thickets that bloom red and pink in early summer.

## Best Time to Visit

**May to June:** Wildflowers carpet the meadow, trails are accessible, temperatures are pleasant. Early season means fewer crowds.

**July to August:** Peak season — maximum visitors but also maximum beauty. Clear skies offer the best Nanga Parbat views.

**September:** Autumn colors begin, nights get cold, a magical but quieter time.

## Where to Stay

Camping is the most atmospheric option — pitch your tent on the meadow and wake up to Nanga Parbat glowing in the first light. Several local families rent simple wooden huts with beds and basic meals. The Raikot Sarai guesthouse offers slightly more comfortable accommodation.

## What to Pack

- Warm layers (temperatures drop below freezing at night even in summer)
- Sturdy hiking boots
- Sunscreen and sunglasses (UV intensity is extreme at altitude)
- Cash (no ATMs anywhere near)
- Portable charger
- Altitude sickness medication

## Nanga Parbat Base Camp Trek

If Fairy Meadows whets your appetite, the two-day trek to Nanga Parbat Base Camp is an unmissable extension. The trail climbs through moraines and crosses glacial rivers, delivering you to a raw, windswept camp at 3,900m with Nanga Parbat filling the entire horizon.

Fairy Meadows is one of those places that stays with you forever — the silence, the scale, the simplicity. Pakistan has many wonders, but few match this.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    author: "Ayesha Khan",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    authorBio:
      "Ayesha is a trekking guide and travel writer from Islamabad who has explored every corner of Pakistan's north.",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Trekking",
    tags: ["Fairy Meadows", "Nanga Parbat", "Trekking", "Gilgit-Baltistan"],
    relatedSlugs: ["hunza-valley-spring", "k2-basecamp-journey"],
  },
  {
    id: "2",
    slug: "hunza-valley-spring",
    title: "Hunza in Bloom: Chasing Pakistan's Most Beautiful Spring",
    excerpt:
      "When thousands of apricot trees burst into blossom against a backdrop of snow-capped peaks, Hunza becomes the most beautiful place on Earth.",
    content: `
There is a week — usually in late March or early April — when Hunza Valley becomes the most beautiful place on Earth. Thousands of apricot, cherry, and almond trees simultaneously burst into blossom, painting the terraced hillsides in clouds of white and pink against a backdrop of brown mountains and blue sky.

## The Blossom Window

Timing is everything. The bloom typically arrives in lower Hunza (Karimabad area) in the last week of March, moving up-valley through April. But temperatures, altitude, and annual variation mean the exact dates shift by 1-2 weeks either way.

Following the blossom up the valley is the ideal strategy — spend a few days in Karimabad, then move to Gulmit and Passu as the season progresses. Weather apps and local WhatsApp groups are your best friends for real-time updates.

## Karimabad: The Heart of It All

Karimabad is the main town of upper Hunza, perched on a hillside overlooking the valley with Rakaposhi (7,788m) and Ultar Sar (7,388m) as a permanent backdrop. The view from the rooftop terrace of a local guesthouse during blossom season, with tea in hand as the first light hits the peaks, is one of those moments that redefines what beauty means.

## Baltit Fort

The 700-year-old Baltit Fort looms above Karimabad, the ancestral home of the Mirs of Hunza. Recently restored by the Aga Khan Trust for Culture, the fort offers fascinating insights into the valley's history and panoramic views of the blossom below.

## The Food

Hunza cuisine deserves its own essay. Hunzai bread (chapshuro) stuffed with meat and herbs, apricot oil, locally made cheese, and mulberry jam — all made from ingredients grown in those same orchards that dazzle every spring. Don't leave without trying diram phitti, a traditional Burushaski dish.

## Getting There

Fly from Islamabad to Gilgit (45 minutes, scenic and occasionally cancelled due to weather), then drive 2-3 hours to Karimabad. Alternatively, the 18-hour drive up the Karakoram Highway from Islamabad is one of the world's great road journeys.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    author: "Bilal Mahmood",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    authorBio:
      "Bilal is a photographer and storyteller who has spent 15 years documenting Pakistan's landscapes and people.",
    date: "April 2, 2025",
    readTime: "6 min read",
    category: "Culture",
    tags: ["Hunza", "Spring", "Blossom", "Photography"],
    relatedSlugs: ["fairy-meadows-guide", "karakoram-highway-road-trip"],
  },
  {
    id: "3",
    slug: "k2-basecamp-journey",
    title: "To the Throne of Gods: My Journey to K2 Base Camp",
    excerpt:
      "18 days, 120 kilometers of Karakoram wilderness, and a lifetime of perspective — the K2 Base Camp trek is Pakistan's ultimate adventure.",
    content: `
On day 18, standing at Concordia — the confluence of the Baltoro and Godwin-Austen glaciers — I counted eight peaks above 7,000m visible from a single vantage point. K2 (8,611m) dominated everything, a perfect pyramid of ice and black rock that seemed to belong to another, more severe universe.

The K2 Base Camp trek is not easy to reach. But it is, without question, worth every step.

## The Route

The standard route begins in Askole, a remote village at the end of a rough jeep track from Skardu. From Askole, the trail follows the Braldu River before climbing onto the Baltoro Glacier — 58 km of flowing ice that is one of the longest glaciers outside the polar regions.

**Stages:**
1. Askole → Jhula (5 hrs)
2. Jhula → Paiyu (6 hrs)
3. Paiyu → Khoburtse (7 hrs, onto the glacier)
4. Khoburtse → Urdukas (5 hrs)
5. Urdukas → Gore 1 (5 hrs)
6. Gore 1 → Gore 2 (5 hrs)
7. Gore 2 → Concordia (6 hrs)
8. Concordia → K2 Base Camp (4 hrs)

## Preparation

This is a serious, remote trek at high altitude. Proper preparation is non-negotiable:

- Minimum 4-6 months of physical training
- Experience at altitude (test yourself at 4,000m+ before committing)
- Licensed guide and porters (mandatory — provides livelihoods to local communities)
- Full camping and mountaineering gear
- Comprehensive travel insurance with helicopter evacuation coverage
- Permits from Pakistan Alpine Club

## The Porters of Baltistan

The Balti porters who carry loads across this brutal terrain are among the toughest humans on the planet. Many wear basic sneakers on the glacier, carry 25kg loads, and still maintain a pace that puts trekkers to shame. Their knowledge of the mountain, their warmth at camp, and their quiet dignity leave a deep impression on every visitor.

The K2 Base Camp trek is Pakistan's greatest adventure. Plan carefully, go with humility, and be prepared to have your understanding of human endurance and natural beauty permanently altered.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    author: "Hassan Ali",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    authorBio:
      "Hassan is a mountaineer and adventure photographer who has summited peaks across the Karakoram.",
    date: "February 20, 2025",
    readTime: "10 min read",
    category: "Adventure",
    tags: ["K2", "Trekking", "Karakoram", "Base Camp"],
    relatedSlugs: ["fairy-meadows-guide", "deosai-wildlife"],
  },
  {
    id: "4",
    slug: "karakoram-highway-road-trip",
    title: "The Karakoram Highway: Driving the World's Greatest Road",
    excerpt:
      "From Islamabad to Khunjerab Pass — a journey through five mountain ranges, ancient civilizations, and Pakistan's most dramatic landscapes.",
    content: `
The Karakoram Highway (KKH) is not just a road — it is a 1,300-km thread connecting two civilizations, passing through five mountain ranges, and traversing some of the most dramatic terrain on Earth. Completed in 1978 after 20 years of construction and the deaths of nearly 900 workers, it remains one of humanity's greatest engineering achievements.

## The Route

The KKH begins (or ends) at Islamabad and winds north through the Salt Range and Hazara hills before entering the Hindu Kush at Besham. From there it follows the Indus River through increasingly spectacular gorges to Chilas, then climbs to Gilgit — the northern gateway.

North of Gilgit, the road enters Hunza and the Karakoram proper — a world of 7,000m peaks, hanging glaciers, and electric-blue rivers. The highway reaches its highest point at Khunjerab Pass (4,693m), the border with China.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    author: "Sara Malik",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    authorBio:
      "Sara is a road trip enthusiast and travel blogger who has driven every major mountain road in Pakistan.",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Road Trip",
    tags: ["KKH", "Road Trip", "Karakoram", "Hunza"],
    relatedSlugs: ["hunza-valley-spring", "attabad-lake-story"],
  },
  {
    id: "5",
    slug: "deosai-wildlife",
    title: "Deosai: Pakistan's Magical Plateau and Its Hidden Wildlife",
    excerpt:
      "The world's second-highest plateau is a secret garden of wildflowers, Himalayan brown bears, and infinite silence.",
    content: `
Most people visit Deosai for the scenery. Few realize they are walking through one of Asia's most important wildlife sanctuaries.

Deosai National Park protects the last significant population of the Himalayan brown bear in Pakistan — estimated at 40-50 individuals. These massive creatures, weighing up to 250kg, roam the plateau in summer, fattening on marmots, berries, and roots before the brutal winter descends.

## The Wildlife

Beyond bears, Deosai harbors snow leopards (rarely seen but tracks frequently found), golden marmots that pop up from burrows as you approach, wolves, foxes, and an extraordinary diversity of birds including golden eagles, lammergeiers, and migratory species from as far as Siberia.

## The Wildflowers

From July to August, Deosai erupts in wildflowers. Blue poppies, primulas, anemones, yellow buttercups, and hundreds of other species paint the plateau in every color. Botanical surveys have recorded over 300 plant species here.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    author: "Zara Ahmed",
    authorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    authorBio:
      "Zara is a wildlife biologist and conservation advocate based in Lahore.",
    date: "August 5, 2025",
    readTime: "5 min read",
    category: "Wildlife",
    tags: ["Deosai", "Wildlife", "Brown Bear", "Conservation"],
    relatedSlugs: ["fairy-meadows-guide", "k2-basecamp-journey"],
  },
  {
    id: "6",
    slug: "attabad-lake-story",
    title: "Attabad Lake: Beauty Born from Disaster",
    excerpt:
      "How a devastating 2010 landslide created one of Pakistan's most surreal and stunning destinations.",
    content: `
On January 4, 2010, a massive landslide at Attabad village sent 30 million cubic meters of rock and earth into the Hunza River. Within five months, a 21-km lake had formed behind the natural dam, submerging five villages, 19 km of the Karakoram Highway, and the homes of 6,000 people.

The tragedy was enormous. But so was the accidental beauty.

## The Lake Today

Attabad Lake is now one of Pakistan's most visited destinations — and it's easy to understand why. The water is an almost impossible shade of turquoise-blue, a color that seems digitally enhanced until you're standing beside it. Mountains rise steeply on both sides, their reflections perfect in the still water.
    `,
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    author: "Bilal Mahmood",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    authorBio:
      "Bilal is a photographer and storyteller who has spent 15 years documenting Pakistan's landscapes and people.",
    date: "July 22, 2025",
    readTime: "6 min read",
    category: "Story",
    tags: ["Attabad Lake", "Hunza", "History", "Nature"],
    relatedSlugs: ["hunza-valley-spring", "karakoram-highway-road-trip"],
  },
];

// ─── GALLERY ─────────────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
    alt: "Fairy Meadows with Nanga Parbat",
    location: "Fairy Meadows, Gilgit-Baltistan",
    height: "tall",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
    alt: "Hunza Valley in spring",
    location: "Hunza Valley, Gilgit-Baltistan",
    height: "medium",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountain reflection in lake",
    location: "Sheosar Lake, Deosai",
    height: "short",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    alt: "Attabad Lake turquoise water",
    location: "Attabad Lake, Hunza",
    height: "tall",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    alt: "Mountain peak with clouds",
    location: "Karakoram Range",
    height: "medium",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    alt: "Starry night over mountains",
    location: "Skardu, Gilgit-Baltistan",
    height: "tall",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    alt: "Wildflowers on Deosai Plains",
    location: "Deosai National Park",
    height: "short",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
    alt: "Green valley with river",
    location: "Swat Valley, KPK",
    height: "medium",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    alt: "Golden hour landscape",
    location: "Naran, Kaghan Valley",
    height: "tall",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    alt: "Forest path in mountains",
    location: "Murree Hills, Punjab",
    height: "medium",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
    alt: "Sunrise over valley",
    location: "Gilgit Valley",
    height: "short",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1526749837599-b4eba9fd855e?w=600&q=80",
    alt: "Mountain lake reflection",
    location: "Satpara Lake, Skardu",
    height: "tall",
  },
];

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Worthington",
    location: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "HiddenPak showed me a Pakistan I never knew existed. The guides were incredible, the places were breathtaking, and I came back a completely changed person. Fairy Meadows at sunrise was the single greatest moment of my travelling life.",
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "I've travelled to 40 countries, and I can honestly say the Hunza Valley in blossom season is the most beautiful thing I have ever seen. The blog guides here were so detailed and accurate — everything went perfectly.",
  },
  {
    id: "3",
    name: "Maria Gonzalez",
    location: "Madrid, Spain",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "As a solo female traveller, I was initially nervous about visiting Pakistan. HiddenPak's guides made me feel safe, informed, and excited. The locals I met were the warmest, most hospitable people I have encountered anywhere.",
  },
  {
    id: "4",
    name: "Ahmed Al-Rashid",
    location: "Dubai, UAE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "The K2 Base Camp trek was the hardest and most rewarding thing I have ever done. Standing at Concordia looking at K2 — I had no words. This platform gave me all the information I needed to plan it myself.",
  },
];
