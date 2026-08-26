import { createServerFn } from '@tanstack/react-start';
import { getMySqlPool } from '@/lib/mysql';

export interface AIScriptRequest {
  propertyName: string;
  propertyType: string;
  location: string;
  price?: string;
  highlights?: string[];
  tone?: 'luxury' | 'urgent_deal' | 'investor_focus' | 'lifestyle';
  language?: 'hinglish' | 'hindi' | 'english';
  durationSeconds?: 30 | 45 | 60;
  format?: 'reel' | 'landscape';
}

export interface GeneratedScript {
  title: string;
  hook: string;
  scenes: {
    time: string;
    visualDescription: string;
    narrationText: string;
    onScreenCaption: string;
  }[];
  callToAction: string;
  hashtags: string[];
}

export const generateAIScriptFn = createServerFn({ method: 'POST' })
  .validator((data: AIScriptRequest) => data)
  .handler(async ({ data }) => {
    try {
      const {
        propertyName,
        propertyType = 'Luxury Apartment',
        location = 'Ghatkopar East, Mumbai',
        price = 'Price on Request',
        language = 'hinglish',
        format = 'reel'
      } = data;

      // Smart Real Estate Script Generator tailored for Mumbai Real Estate
      let hook = '';
      let cta = '';
      let scenes: GeneratedScript['scenes'] = [];

      if (language === 'hinglish') {
        hook = `Kya aap Ghatkopar East me ek true luxury ${propertyType} dhoondh rahe hain? Dekhiye yeh brand new property!`;
        cta = `Site visit ya exclusive offers ke liye call karein +91 86918 66691 par, ya visit karein saverrarealty.com!`;
        scenes = [
          {
            time: "0:00 - 0:05",
            visualDescription: "Grand elevation / entrance shot with smooth camera pan",
            narrationText: `Welcome to ${propertyName} in the heart of ${location}. Ek aisa project jo luxury aur connectivity dono ko redefine karta hai.`,
            onScreenCaption: `${propertyName} | Prime ${location}`
          },
          {
            time: "0:05 - 0:15",
            visualDescription: "Spacious living room & sunlit balcony view",
            narrationText: `Dekhiye iska ultra-spacious living room with floor-to-ceiling glass windows aur massive carpet area. Natural sunlight and breeze all day long!`,
            onScreenCaption: "Spacious Living Room & Sunlit Deck"
          },
          {
            time: "0:15 - 0:22",
            visualDescription: "Master bedroom suite with premium Italian flooring",
            narrationText: `Master bedroom with premium fittings, attached walk-in wardrobe space aur uninterrupted skyline views.`,
            onScreenCaption: "Luxury Master Suite"
          },
          {
            time: "0:22 - 0:30",
            visualDescription: "Rooftop infinity pool / gym amenities & Saverra Branding Card",
            narrationText: `With world-class amenities like rooftop lounge, fitness centre and EV charging. Price starting at just ${price}. Contact Saverra Realty today!`,
            onScreenCaption: `Starting @ ${price} | Call Saverra Realty`
          }
        ];
      } else if (language === 'hindi') {
        hook = `घाटकोपर ईस्ट के सबसे प्राइम लोकेशन पर लक्ज़री सपनों का घर! देखिए ${propertyName}`;
        cta = `आज ही संपर्क करें सवेरा रियल्टी से +91 86918 66691 पर।`;
        scenes = [
          {
            time: "0:00 - 0:06",
            visualDescription: "मुख्य प्रोजेक्ट का सुंदर एलिवेशन व्यू",
            narrationText: `पेश है ${propertyName}, घाटकोपर ईस्ट मुंबई में प्रीमियम 2 और 3 बीएचके लक्ज़री अपार्टमेंट्स।`,
            onScreenCaption: `${propertyName} - घाटकोपर ईस्ट`
          },
          {
            time: "0:06 - 0:15",
            visualDescription: "विशाल लिविंग हॉल और बालकनी डेक",
            narrationText: `शानदार हवादार लिविंग रूम, बड़ी बालकनी और आधुनिक इंटीरियर फिनिशिंग के साथ।`,
            onScreenCaption: "विशाल लिविंग रूम एवं बालकनी"
          },
          {
            time: "0:15 - 0:23",
            visualDescription: "मास्टर बेडरूम एवं मॉडर्न किचन",
            narrationText: `प्रीमियम इटैलियन फ्लोरिंग, मॉड्यूलर किचन और बेहतरीन सनलाइट वाला मास्टर बेडरूम।`,
            onScreenCaption: "प्रीमियम मास्टर बेडरूम"
          },
          {
            time: "0:23 - 0:30",
            visualDescription: "रूफटॉप क्लबहाउस एवं सवेरा रियल्टी ब्रांडिंग",
            narrationText: `रेरा अप्रूव्ड प्रोजेक्ट, शुरुआती कीमत ${price}। अधिक जानकारी के लिए सवेरा रियल्टी को कॉल करें।`,
            onScreenCaption: `शुरुआती कीमत ${price} | सवेरा रियल्टी`
          }
        ];
      } else {
        hook = `Looking for the most exquisite luxury ${propertyType} in ${location}? Take a tour of ${propertyName}!`;
        cta = `Book your exclusive private walkthrough today. Call +91 86918 66691 or visit saverrarealty.com`;
        scenes = [
          {
            time: "0:00 - 0:06",
            visualDescription: "Cinematic drone shot / Grand building facade",
            narrationText: `Introducing ${propertyName}, a benchmark in ultra-luxury living located in ${location}.`,
            onScreenCaption: `${propertyName} | ${location}`
          },
          {
            time: "0:06 - 0:15",
            visualDescription: "Lavish living room panning into scenic balcony",
            narrationText: `Step into an expansive living area featuring soaring ceilings, panoramic Mumbai skyline views, and bespoke finishes.`,
            onScreenCaption: "Expansive Living & Sunlit Deck"
          },
          {
            time: "0:15 - 0:22",
            visualDescription: "Opulent master bedroom with ensuite bath",
            narrationText: `Retreat into your lavish master suite designed for ultimate comfort and privacy.`,
            onScreenCaption: "Opulent Master Suite"
          },
          {
            time: "0:22 - 0:30",
            visualDescription: "World-class amenities and closing logo card",
            narrationText: `Complete with curated rooftop amenities, seamless metro connectivity, and flexible payment plans. Starting at ${price}.`,
            onScreenCaption: `Price: ${price} | Contact Saverra Realty`
          }
        ];
      }

      const hashtags = [
        `#${propertyName.replace(/\s+/g, '')}`,
        "#SaverraRealty",
        "#MumbaiRealEstate",
        "#GhatkoparEast",
        "#LuxuryFlatsMumbai",
        "#RealEstateReels",
        "#PropertyTour",
        "#MumbaiHomes"
      ];

      return {
        success: true,
        data: {
          title: `${propertyName} — Luxury Real Estate ${format === 'reel' ? 'Shorts / Reel' : 'Walkthrough'}`,
          hook,
          scenes,
          callToAction: cta,
          hashtags
        } as GeneratedScript
      };
    } catch (error: any) {
      console.error('Error generating AI script:', error);
      return { success: false, error: error.message };
    }
  });

export const publishAIVideoToSocialFn = createServerFn({ method: 'POST' })
  .validator((data: { platform: string; url: string; embed_id?: string; title: string }) => data)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      const [result]: any = await pool.query(
        'INSERT INTO social_media_posts (platform, url, embed_id, title) VALUES (?, ?, ?, ?)',
        [data.platform, data.url, data.embed_id || null, data.title]
      );
      return { success: true, id: result.insertId };
    } catch (error: any) {
      console.error('Error publishing to social:', error);
      return { success: false, error: error.message };
    }
  });

export const publishAIVideoToRentalsFn = createServerFn({ method: 'POST' })
  .validator((data: { title: string; youtube_id: string }) => data)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      const [result]: any = await pool.query(
        'INSERT INTO rental_updates (title, youtube_id, is_active) VALUES (?, ?, 1)',
        [data.title, data.youtube_id]
      );
      return { success: true, id: result.insertId };
    } catch (error: any) {
      console.error('Error publishing to rentals:', error);
      return { success: false, error: error.message };
    }
  });
