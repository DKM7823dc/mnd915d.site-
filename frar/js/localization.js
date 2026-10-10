(function () {
  'use strict';

  const SUPPORTED_LANGUAGES = ['fr', 'ar', 'en', 'es', 'pt', 'de', 'it', 'ne'];
  const STORAGE_KEY = 'vyro_preferred_language';

  const dictionaries = {
    ne: {
      'Accueil': 'गृहपृष्ठ', 'Catégories': 'श्रेणीहरू', 'Films': 'चलचित्रहरू', 'Séries': 'श्रृंखलाहरू', 'Installation': 'स्थापना',
      'Short dramas': 'छोटा नाटकहरू', 'Nouveaux épisodes': 'नयाँ एपिसोडहरू',
      'Télécharger l’application': 'एप डाउनलोड गर्नुहोस्', 'Téléchargement direct pour Android': 'Android का लागि सीधा डाउनलोड',
      'Vos films, sports et chaînes TV préférés': 'तपाईंका मनपर्ने चलचित्र, खेलकुद र टिभी', 'Gratuit, sans frais': 'पूर्ण निःशुल्क',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': '१३० देशका ३,००० भन्दा बढी लाइभ च्यानल हेर्नुहोस्। फुटबल, चलचित्र, समाचार र अन्य धेरै सामग्री HD मा, विज्ञापन र सदस्यताबिना।',
      'Découvrir le contenu': 'सामग्री हेर्नुहोस्', 'Gratuit': 'निःशुल्क', 'Aucun abonnement mensuel.': 'मासिक सदस्यता छैन।',
      'Sans publicité': 'विज्ञापनरहित', 'Moins d’interruptions, plus de contenu.': 'कम अवरोध, बढी सामग्री।',
      'Tout au même endroit': 'सबै एकै ठाउँमा', 'Sport, films, télévision et séries.': 'खेलकुद, चलचित्र, टिभी र श्रृंखला।',
      'À la une': 'विशेष', 'Football, films et télévision internationale': 'फुटबल, चलचित्र र अन्तर्राष्ट्रिय टिभी',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'एउटै एपमा लाइभ र मागअनुसारको सामग्री हेर्नुहोस्।',
      'Tout': 'सबै', 'Football': 'फुटबल', 'Sport': 'खेलकुद', 'TV': 'टिभी', 'Film': 'चलचित्र', 'Actualités': 'समाचार', 'En direct': 'लाइभ', 'Série': 'श्रृंखला',
      'Contenu disponible': 'उपलब्ध सामग्री', 'Qualité adaptative': 'अनुकूल गुणस्तर', 'Installation directe': 'सीधा स्थापना', 'Une expérience sans interruption': 'अवरोधरहित अनुभव',
      'Toutes les catégories': 'सबै श्रेणीहरू', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'एपमा उपलब्ध सबै सामग्री हेर्न तेर्सो रूपमा स्वाइप गर्नुहोस्।',
      'Football en direct': 'लाइभ फुटबल', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'लिग, चर्चित खेल, विश्लेषण र उत्कृष्ट क्षणहरू।',
      'Championnats': 'लिगहरू', 'Matchs en direct': 'लाइभ खेलहरू', 'Meilleurs moments': 'उत्कृष्ट क्षणहरू',
      'Événements sportifs': 'खेलकुद कार्यक्रमहरू', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'फाइट, दौड, प्रतियोगिता र ठूला पे-पर-भ्यू कार्यक्रमहरू।',
      'Combats': 'फाइटहरू', 'Événements': 'कार्यक्रमहरू', 'Nouveautés': 'नयाँ सामग्री', 'Action': 'एक्सन', 'Drame': 'ड्रामा',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'विशाल पुस्तकालयमा नयाँ सामग्री, एक्सन, ड्रामा र हरर।',
      'Chaînes TV du monde entier': 'विश्वभरका टिभी च्यानलहरू', 'Chaînes internationales': 'अन्तर्राष्ट्रिय च्यानलहरू',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'समाचार, मनोरञ्जन, बाल सामग्री र लाइभ च्यानलहरू।',
      'TV en direct': 'लाइभ टिभी', 'Enfants': 'बालबालिका', 'Actualités en direct': 'लाइभ समाचार', 'Dernières nouvelles': 'ताजा समाचार',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'समाचार च्यानल, ताजा खबर र अन्तर्राष्ट्रिय टिभीका लागि सम्पूर्ण गन्तव्य।',
      'Formats courts': 'छोटो सामग्री', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'मोबाइलमा हेर्न बनाइएका भिडियो, मिनी-श्रृंखला र एपिसोडहरू।',
      'Vidéos': 'भिडियोहरू', 'Mini-séries': 'मिनी-श्रृंखलाहरू', 'Épisodes': 'एपिसोडहरू',
      'Films populaires': 'लोकप्रिय चलचित्रहरू', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'हेर्न तयार पुस्तकालयमा एक्सन, सुपरहिरो, ड्रामा र उत्कृष्ट क्लासिकहरू।',
      'Action · Thriller': 'एक्सन · थ्रिलर', 'Super-héros · Science-fiction': 'सुपरहिरो · विज्ञान कथा', 'Super-héros · Action': 'सुपरहिरो · एक्सन',
      'Drame · Classique': 'ड्रामा · क्लासिक', 'Action · Fantastique': 'एक्सन · फ्यान्टसी', 'Aventure · Fantastique': 'साहसिक · फ्यान्टसी', 'Action · Drame': 'एक्सन · ड्रामा',
      'Films et séries à ne pas manquer': 'छुटाउन नहुने चलचित्र र श्रृंखला', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'मन लागेको बेला एउटै एपमा विज्ञापनबिना लोकप्रिय चलचित्र र श्रृंखला हेर्नुहोस्।',
      'Série · Drame policier': 'श्रृंखला · अपराध ड्रामा', 'Série · Mystère': 'श्रृंखला · रहस्य',
      'Tout dans une seule application': 'सबै एउटै एपमा', 'Vos divertissements, à tout moment.': 'तपाईंको मनोरञ्जन, जुनसुकै बेला।',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'छिटो र विज्ञापनरहित अनुभवमा लाइभ फुटबल, खेलकुद कार्यक्रम, लोकप्रिय चलचित्र, उत्कृष्ट श्रृंखला, अन्तर्राष्ट्रिय च्यानल र छोटो सामग्री।',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'हेर्न तयार एक्सन, ड्रामा, सुपरहिरो, साहसिक र उत्कृष्ट क्लासिकहरू।',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'मोबाइलमा हेर्न उपयुक्त लोकप्रिय चलचित्र, रोमाञ्चक कथा र पूर्ण श्रृंखलाहरू।',
      'Téléchargement direct': 'सीधा डाउनलोड', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'APK स्थापना गरेर विज्ञापनरहित सामग्री निःशुल्क हेर्नुहोस्।',
      'Installation rapide': 'छिटो स्थापना', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'एप डाउनलोड र स्थापना गरेर केही सेकेन्डमै हेर्न सुरु गर्नुहोस्।',
      'Télécharger': 'डाउनलोड', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'APK फाइल सुरक्षित गर्न बटन थिच्नुहोस्।',
      'Installer': 'स्थापना', 'Ouvrez le fichier et autorisez l’installation.': 'फाइल खोलेर स्थापनाको अनुमति दिनुहोस्।',
      'Explorer': 'अन्वेषण', 'Découvrez le football, les films, la télévision et les séries.': 'फुटबल, चलचित्र, टिभी र श्रृंखला हेर्नुहोस्।',
      'Profiter': 'हेर्न सुरु गर्नुहोस्', 'Du contenu sans publicité ni abonnement.': 'विज्ञापन र सदस्यताबिनाको सामग्री।',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Lunelle डाउनलोड गरेर आजै सुरु गर्नुहोस्।',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'तपाईंका सबै मनोरञ्जन एउटै एपमा: चलचित्र, श्रृंखला, फुटबल, खेलकुद कार्यक्रम र अन्तर्राष्ट्रिय टिभी।',
      '© 2026 Application Lunelle': '© २०२६ Lunelle एप',
      'Nouveaux épisodes chaque jour': 'हरेक दिन नयाँ एपिसोड', 'Des short dramas qui vous tiennent': 'तपाईंलाई बाँधिराख्ने छोटा नाटकहरू', 'en haleine.': 'रोमाञ्चक अन्त्यसम्म।',
      'Cinq histoires courtes, intenses et addictives : amour interdit, secrets, trahisons et revanche.': 'पाँच छोटा, तीव्र र लत लाग्ने कथा: निषेधित प्रेम, रहस्य, विश्वासघात र बदला।', 'Découvrir les histoires': 'कथाहरू हेर्नुहोस्',
      'Épisodes courts': 'छोटा एपिसोड', 'Des histoires à regarder en quelques minutes.': 'केही मिनेटमै हेर्न सकिने कथाहरू।', 'De nouveaux rebondissements chaque jour.': 'हरेक दिन नयाँ मोडहरू।',
      'Histoires intenses': 'तीव्र कथाहरू', 'Romance, secrets et revanche.': 'प्रेम, रहस्य र बदला।', 'Derrière le silence': 'मौनतापछाडि', 'Une histoire courte, intense et impossible à quitter.': 'छोटो र तीव्र कथा, बीचमै छोड्नै नसकिने।',
      'Pour vous': 'तपाईंका लागि', 'Romance': 'प्रेमकथा', 'Secrets': 'रहस्यहरू', 'Revanche': 'बदला', 'Histoires interdites': 'निषेधित कथाहरू', 'Le pacte interdit': 'निषेधित सम्झौता', 'Pardon impossible': 'असम्भव क्षमा', 'Suspense': 'सस्पेन्स',
      'Short dramas à découvrir': 'हेर्नुपर्ने छोटा नाटकहरू', 'Par épisode': 'प्रति एपिसोड', 'Chaque jour': 'हरेक दिन', 'De nouveaux épisodes': 'नयाँ एपिसोडहरू', 'Histoires addictives': 'लत लाग्ने कथाहरू',
      'Short drama': 'छोटो नाटक', 'Un secret peut tout changer.': 'एउटा रहस्यले सबै कुरा बदल्न सक्छ।', 'L’amour est interdit, mais le désir est plus fort.': 'प्रेम निषेधित छ, तर चाहना अझ बलियो छ।',
      'Passion': 'आकर्षण', 'Trahison': 'विश्वासघात', 'Tendance': 'ट्रेन्डिङ', 'Chaque épisode révèle une nouvelle vérité.': 'हरेक एपिसोडले नयाँ सत्य खोल्छ।', 'Mystère': 'रहस्य', 'Nouveau': 'नयाँ',
      'Nouvelle vie': 'नयाँ जीवन', 'Un choix peut changer toute une destinée.': 'एउटा निर्णयले पूरै भाग्य बदल्न सक्छ।', 'Après la trahison, la revanche commence.': 'विश्वासघातपछि बदला सुरु हुन्छ।', 'Coup de cœur': 'मनपर्ने',
      'Téléchargez Lunelle et plongez dans les short dramas.': 'Lunelle डाउनलोड गरेर छोटा नाटकहरूको संसारमा डुब्नुहोस्।', 'Retrouvez vos cinq histoires incontournables, épisode après épisode.': 'एपिसोडपछि एपिसोड आफ्ना पाँच उत्कृष्ट कथा हेर्नुहोस्।'
    },
    en: {
      'Accueil': 'Home', 'Catégories': 'Categories', 'Films': 'Movies', 'Séries': 'Series', 'Installation': 'Installation',
      'Télécharger l’application': 'Download the app', 'Téléchargement direct pour Android': 'Direct download for Android',
      'Vos films, sports et chaînes TV préférés': 'Your favourite movies, sports & TV', 'Gratuit, sans frais': 'Free, with no fees',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'Enjoy 3,000+ live channels from 130 countries. Football, movies, news and much more in HD, with no ads or subscriptions.',
      'Découvrir le contenu': 'Explore the content', 'Gratuit': 'Free', 'Aucun abonnement mensuel.': 'No monthly subscription.',
      'Sans publicité': 'Ad-free', 'Moins d’interruptions, plus de contenu.': 'Fewer interruptions, more content.',
      'Tout au même endroit': 'Everything in one place', 'Sport, films, télévision et séries.': 'Sports, movies, TV and series.',
      'À la une': 'Featured', 'Football, films et télévision internationale': 'Football, movies and international TV',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'Discover live and on-demand content in one app.',
      'Tout': 'All', 'Football': 'Football', 'Sport': 'Sports', 'TV': 'TV', 'Film': 'Movie', 'Actualités': 'News', 'En direct': 'Live', 'Série': 'Series',
      'Contenu disponible': 'Content available', 'Qualité adaptative': 'Adaptive quality', 'Installation directe': 'Direct installation', 'Une expérience sans interruption': 'An uninterrupted experience',
      'Toutes les catégories': 'All categories', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'Swipe horizontally to discover all the content available in the app.',
      'Football en direct': 'Live football', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'Leagues, featured matches, analysis and highlights.',
      'Championnats': 'Leagues', 'Matchs en direct': 'Live matches', 'Meilleurs moments': 'Highlights',
      'Événements sportifs': 'Sports events', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'Fights, races, tournaments and major pay-per-view events.',
      'Combats': 'Fights', 'Événements': 'Events', 'Nouveautés': 'New releases', 'Action': 'Action', 'Drame': 'Drama',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'New releases, action, drama and horror in a vast library.',
      'Chaînes TV du monde entier': 'TV channels worldwide', 'Chaînes internationales': 'International channels',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'News, entertainment, children’s content and live channels.',
      'TV en direct': 'Live TV', 'Enfants': 'Kids', 'Actualités en direct': 'Live news', 'Dernières nouvelles': 'Breaking news',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'A complete destination for news channels, breaking stories and international TV.',
      'Formats courts': 'Short-form shows', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'Videos, mini-series and episodes designed for mobile viewing.',
      'Vidéos': 'Videos', 'Mini-séries': 'Mini-series', 'Épisodes': 'Episodes',
      'Films populaires': 'Popular movies', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'Action, superheroes, drama and great classics in a ready-to-watch library.',
      'Action · Thriller': 'Action · Thriller', 'Super-héros · Science-fiction': 'Superhero · Sci-fi', 'Super-héros · Action': 'Superhero · Action',
      'Drame · Classique': 'Drama · Classic', 'Action · Fantastique': 'Action · Fantasy', 'Aventure · Fantastique': 'Adventure · Fantasy', 'Action · Drame': 'Action · Drama',
      'Films et séries à ne pas manquer': 'Must-Watch Movies & Shows', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'Popular movies and shows to watch whenever you want, ad-free, all in one app.',
      'Série · Drame policier': 'Series · Crime drama', 'Série · Mystère': 'Series · Mystery',
      'Tout dans une seule application': 'Everything in one app', 'Vos divertissements, à tout moment.': 'Your entertainment, anytime.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'Live football, sports events, popular movies, must-watch series, international channels and short-form shows in a fast, ad-free experience.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'Action, drama, superheroes, adventure and great classics ready to watch.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'Popular movies, captivating stories and complete series, perfect for mobile viewing.',
      'Téléchargement direct': 'Direct download', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'Install the APK and enjoy ad-free content for free.',
      'Installation rapide': 'Quick installation', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'Download the app, install it and start watching in seconds.',
      'Télécharger': 'Download', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'Tap the button to save the APK file.',
      'Installer': 'Install', 'Ouvrez le fichier et autorisez l’installation.': 'Open the file and allow installation.',
      'Explorer': 'Explore', 'Découvrez le football, les films, la télévision et les séries.': 'Explore football, movies, TV and series.',
      'Profiter': 'Enjoy', 'Du contenu sans publicité ni abonnement.': 'Content without ads or subscriptions.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Download Lunelle and start today.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'All your entertainment in one app: movies, series, football, sports events and international TV.',
      '© 2026 Application Lunelle': '© 2026 Lunelle App',
      'Short dramas · Nouveaux épisodes': 'Short dramas · New episodes',
      'Des histoires qui vous tiennent': 'Stories that keep you', 'en haleine.': 'on the edge of your seat.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'Love, secrets, betrayal and revenge. Short episodes to watch whenever you want, with a new story to discover every day.',
      'Regarder maintenant': 'Watch now', 'Découvrir les histoires': 'Discover the stories',
      '1–3 min par épisode': '1–3 min per episode', ' · gratuit · sur mobile': ' · free · made for mobile',
      'minutes par épisode': 'minutes per episode', 'histoires visuelles': 'visual stories', 'pensé pour le mobile': 'made for mobile', 'de nouveaux rebondissements': 'new twists',
      'Les histoires': 'Stories of the', 'du moment': 'moment', 'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'Pick a mood, start an episode and let the story pull you in.',
      'À la une': 'Featured', 'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'An intense story, impossible choices and an episode that makes you press next.',
      'Regardez à votre rythme.': 'Watch at your pace.', 'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'A focused interface that takes you straight from curiosity to the next episode.',
      'Des épisodes courts': 'Short episodes', 'Parfaits pour une pause ou une soirée entière.': 'Perfect for a quick break or a full evening.', 'Des émotions fortes': 'High-stakes emotions', 'Romance, drame, suspense et revanche.': 'Romance, drama, suspense and revenge.', 'Une histoire chaque jour': 'A story every day', 'Revenez pour découvrir la suite.': 'Come back for what happens next.', 'Sur votre téléphone': 'On your phone', 'Ouvrez l’application et reprenez où vous voulez.': 'Open the app and pick up wherever you are.',
      'L’univers ': 'L’univers ', 'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'Stories of desire, trust, loss and new beginnings, told through striking visuals.',
      'Commencez maintenant': 'Start now', 'Votre prochaine histoire est déjà là.': 'Your next story is already here.', 'Essayez gratuitement.': 'Try it for free.', 'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'Download the app, choose a story and start your first episode in seconds.', 'Android · épisodes courts · nouveaux contenus régulièrement': 'Android · short episodes · fresh stories regularly', 'Short dramas · Romance · Drame · Suspense': 'Short dramas · Romance · Drama · Suspense',
    },
    es: {
      'Accueil': 'Inicio', 'Catégories': 'Categorías', 'Films': 'Películas', 'Séries': 'Series', 'Installation': 'Instalación',
      'Télécharger l’application': 'Descargar la aplicación', 'Téléchargement direct pour Android': 'Descarga directa para Android',
      'Vos films, sports et chaînes TV préférés': 'Tus películas, deportes y canales de TV favoritos', 'Gratuit, sans frais': 'Gratis, sin cuotas',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'Disfruta de más de 3.000 canales en directo de 130 países. Fútbol, películas, noticias y mucho más en HD, sin anuncios ni suscripciones.',
      'Découvrir le contenu': 'Explorar el contenido', 'Gratuit': 'Gratis', 'Aucun abonnement mensuel.': 'Sin suscripción mensual.',
      'Sans publicité': 'Sin anuncios', 'Moins d’interruptions, plus de contenu.': 'Menos interrupciones y más contenido.',
      'Tout au même endroit': 'Todo en un solo lugar', 'Sport, films, télévision et séries.': 'Deportes, películas, televisión y series.',
      'À la une': 'Destacado', 'Football, films et télévision internationale': 'Fútbol, películas y televisión internacional',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'Disfruta del contenido en directo y bajo demanda en una sola aplicación.',
      'Tout': 'Todo', 'Football': 'Fútbol', 'Sport': 'Deportes', 'TV': 'TV', 'Film': 'Película', 'Actualités': 'Noticias', 'En direct': 'En directo', 'Série': 'Serie',
      'Contenu disponible': 'Contenido disponible', 'Qualité adaptative': 'Calidad adaptativa', 'Installation directe': 'Instalación directa', 'Une expérience sans interruption': 'Una experiencia sin interrupciones',
      'Toutes les catégories': 'Todas las categorías', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'Desliza horizontalmente para descubrir todo el contenido disponible en la aplicación.',
      'Football en direct': 'Fútbol en directo', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'Ligas, partidos destacados, análisis y mejores momentos.',
      'Championnats': 'Ligas', 'Matchs en direct': 'Partidos en directo', 'Meilleurs moments': 'Mejores momentos',
      'Événements sportifs': 'Eventos deportivos', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'Combates, carreras, torneos y grandes citas de pago por evento.',
      'Combats': 'Combates', 'Événements': 'Eventos', 'Nouveautés': 'Estrenos', 'Action': 'Acción', 'Drame': 'Drama',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'Estrenos, acción, drama y terror en una amplia biblioteca.',
      'Chaînes TV du monde entier': 'Canales de TV de todo el mundo', 'Chaînes internationales': 'Canales internacionales',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'Noticias, entretenimiento, contenido infantil y canales en directo.',
      'TV en direct': 'TV en directo', 'Enfants': 'Infantil', 'Actualités en direct': 'Noticias en directo', 'Dernières nouvelles': 'Últimas noticias',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'Un destino completo para canales informativos, últimas noticias y televisión internacional.',
      'Formats courts': 'Contenido breve', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'Vídeos, miniseries y episodios pensados para ver en el móvil.',
      'Vidéos': 'Videos', 'Mini-séries': 'Miniseries', 'Épisodes': 'Episodios',
      'Films populaires': 'Películas populares', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'Acción, superhéroes, drama y grandes clásicos en una biblioteca lista para ver.',
      'Action · Thriller': 'Acción · Suspense', 'Super-héros · Science-fiction': 'Superhéroes · Ciencia ficción', 'Super-héros · Action': 'Superhéroes · Acción',
      'Drame · Classique': 'Drama · Clásico', 'Action · Fantastique': 'Acción · Fantasía', 'Aventure · Fantastique': 'Aventura · Fantasía', 'Action · Drame': 'Acción · Drama',
      'Films et séries à ne pas manquer': 'Películas y series imprescindibles', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'Películas y series populares para ver cuando quieras, sin anuncios y en una sola aplicación.',
      'Série · Drame policier': 'Serie · Drama policíaco', 'Série · Mystère': 'Serie · Misterio',
      'Tout dans une seule application': 'Todo en una sola aplicación', 'Vos divertissements, à tout moment.': 'Tu entretenimiento, en cualquier momento.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'Fútbol en directo, eventos deportivos, películas populares, series imprescindibles, canales internacionales y contenido breve en una experiencia rápida y sin anuncios.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'Acción, drama, superhéroes, aventura y grandes clásicos listos para ver.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'Películas populares, historias cautivadoras y series completas, perfectas para ver en el móvil.',
      'Téléchargement direct': 'Descarga directa', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'Instala el APK y disfruta gratis de contenido sin anuncios.',
      'Installation rapide': 'Instalación rápida', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'Descarga la aplicación, instálala y empieza a ver en segundos.',
      'Télécharger': 'Descargar', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'Pulsa el botón para guardar el archivo APK.',
      'Installer': 'Instalar', 'Ouvrez le fichier et autorisez l’installation.': 'Abre el archivo y permite la instalación.',
      'Explorer': 'Explorar', 'Découvrez le football, les films, la télévision et les séries.': 'Descubre fútbol, películas, televisión y series.',
      'Profiter': 'Disfrutar', 'Du contenu sans publicité ni abonnement.': 'Contenido sin anuncios ni suscripción.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Descarga Lunelle y comienza hoy.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'Todo tu entretenimiento en una aplicación: películas, series, fútbol, eventos deportivos y televisión internacional.',
      '© 2026 Application Lunelle': '© 2026 Aplicación Lunelle',
    },
    ar: {
      'Accueil': 'الرئيسية', 'Catégories': 'الفئات', 'Films': 'الأفلام', 'Séries': 'المسلسلات', 'Installation': 'التثبيت',
      'Télécharger l’application': 'تنزيل التطبيق', 'Téléchargement direct pour Android': 'تنزيل مباشر لأندرويد',
      'Vos films, sports et chaînes TV préférés': 'أفلامك ورياضاتك وقنواتك التلفزيونية المفضلة', 'Gratuit, sans frais': 'مجاناً، بلا أي رسوم',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'استمتع بأكثر من 3,000 قناة مباشرة من 130 دولة. كرة القدم والأفلام والأخبار وغير ذلك الكثير بجودة HD، من دون إعلانات أو اشتراكات.',
      'Découvrir le contenu': 'استكشف المحتوى', 'Gratuit': 'مجاني', 'Aucun abonnement mensuel.': 'بدون اشتراك شهري.',
      'Sans publicité': 'بدون إعلانات', 'Moins d’interruptions, plus de contenu.': 'مقاطعات أقل ومحتوى أكثر.',
      'Tout au même endroit': 'كل شيء في مكان واحد', 'Sport, films, télévision et séries.': 'رياضة وأفلام وتلفزيون ومسلسلات.',
      'À la une': 'مميز', 'Football, films et télévision internationale': 'كرة القدم والأفلام والتلفزيون العالمي',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'استمتع بالبث المباشر والمحتوى حسب الطلب في تطبيق واحد.',
      'Tout': 'الكل', 'Football': 'كرة القدم', 'Sport': 'الرياضة', 'TV': 'تلفزيون', 'Film': 'فيلم', 'Actualités': 'الأخبار', 'En direct': 'مباشر', 'Série': 'مسلسل',
      'Contenu disponible': 'محتوى متاح', 'Qualité adaptative': 'جودة متكيفة', 'Installation directe': 'تثبيت مباشر', 'Une expérience sans interruption': 'تجربة بلا انقطاع',
      'Toutes les catégories': 'جميع الفئات', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'مرّر أفقياً لاكتشاف كل المحتوى المتاح في التطبيق.',
      'Football en direct': 'كرة القدم مباشرة', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'بطولات ومباريات بارزة وتحليلات وأفضل اللقطات.',
      'Championnats': 'البطولات', 'Matchs en direct': 'مباريات مباشرة', 'Meilleurs moments': 'أفضل اللقطات',
      'Événements sportifs': 'فعاليات رياضية', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'نزالات وسباقات وبطولات وأحداث كبرى بنظام الدفع مقابل المشاهدة.',
      'Combats': 'نزالات', 'Événements': 'فعاليات', 'Nouveautés': 'أحدث الإصدارات', 'Action': 'أكشن', 'Drame': 'دراما',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'أحدث الأفلام والأكشن والدراما والرعب في مكتبة واسعة.',
      'Chaînes TV du monde entier': 'قنوات تلفزيونية من العالم', 'Chaînes internationales': 'قنوات عالمية',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'أخبار وترفيه ومحتوى للأطفال وقنوات مباشرة.',
      'TV en direct': 'تلفزيون مباشر', 'Enfants': 'أطفال', 'Actualités en direct': 'أخبار مباشرة', 'Dernières nouvelles': 'آخر الأخبار',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'وجهة متكاملة للقنوات الإخبارية وآخر الأخبار والتلفزيون العالمي.',
      'Formats courts': 'محتوى قصير', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'فيديوهات ومسلسلات قصيرة وحلقات مصممة للمشاهدة على الهاتف.',
      'Vidéos': 'فيديوهات', 'Mini-séries': 'مسلسلات قصيرة', 'Épisodes': 'حلقات',
      'Films populaires': 'أفلام شهيرة', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'أكشن وأبطال خارقون ودراما وكلاسيكيات رائعة جاهزة للمشاهدة.',
      'Action · Thriller': 'أكشن · إثارة', 'Super-héros · Science-fiction': 'أبطال خارقون · خيال علمي', 'Super-héros · Action': 'أبطال خارقون · أكشن',
      'Drame · Classique': 'دراما · كلاسيكي', 'Action · Fantastique': 'أكشن · فانتازيا', 'Aventure · Fantastique': 'مغامرة · فانتازيا', 'Action · Drame': 'أكشن · دراما',
      'Films et séries à ne pas manquer': 'أفلام ومسلسلات لا تفوّت', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'أفلام ومسلسلات شهيرة تشاهدها وقتما تشاء، بدون إعلانات وفي تطبيق واحد.',
      'Série · Drame policier': 'مسلسل · دراما جريمة', 'Série · Mystère': 'مسلسل · غموض',
      'Tout dans une seule application': 'كل شيء في تطبيق واحد', 'Vos divertissements, à tout moment.': 'ترفيهك في أي وقت.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'كرة قدم مباشرة وفعاليات رياضية وأفلام شهيرة ومسلسلات مميزة وقنوات عالمية ومحتوى قصير في تجربة سريعة بلا إعلانات.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'أكشن ودراما وأبطال خارقون ومغامرات وكلاسيكيات جاهزة للمشاهدة.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'أفلام شهيرة وقصص مشوقة ومسلسلات كاملة، مثالية للمشاهدة على الهاتف.',
      'Téléchargement direct': 'تنزيل مباشر', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'ثبّت ملف APK واستمتع مجاناً بمحتوى بلا إعلانات.',
      'Installation rapide': 'تثبيت سريع', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'نزّل التطبيق وثبّته وابدأ المشاهدة خلال ثوانٍ.',
      'Télécharger': 'تنزيل', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'اضغط على الزر لحفظ ملف APK.',
      'Installer': 'تثبيت', 'Ouvrez le fichier et autorisez l’installation.': 'افتح الملف واسمح بالتثبيت.',
      'Explorer': 'استكشاف', 'Découvrez le football, les films, la télévision et les séries.': 'اكتشف كرة القدم والأفلام والتلفزيون والمسلسلات.',
      'Profiter': 'استمتع', 'Du contenu sans publicité ni abonnement.': 'محتوى بلا إعلانات أو اشتراك.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'نزّل Lunelle وابدأ اليوم.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'كل ترفيهك في تطبيق واحد: أفلام ومسلسلات وكرة قدم وفعاليات رياضية وتلفزيون عالمي.',
      '© 2026 Application Lunelle': '© 2026 تطبيق Lunelle',
    },
    pt: {
      'Accueil': 'Início', 'Catégories': 'Categorias', 'Films': 'Filmes', 'Séries': 'Séries', 'Installation': 'Instalação',
      'Télécharger l’application': 'Baixar o aplicativo', 'Téléchargement direct pour Android': 'Download direto para Android',
      'Vos films, sports et chaînes TV préférés': 'Seus filmes, esportes e canais de TV favoritos', 'Gratuit, sans frais': 'Grátis, sem nenhuma taxa',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'Aproveite mais de 3.000 canais ao vivo de 130 países. Futebol, filmes, notícias e muito mais em HD, sem anúncios nem assinaturas.',
      'Découvrir le contenu': 'Explorar o conteúdo', 'Gratuit': 'Grátis', 'Aucun abonnement mensuel.': 'Sem assinatura mensal.',
      'Sans publicité': 'Sem anúncios', 'Moins d’interruptions, plus de contenu.': 'Menos interrupções e mais conteúdo.',
      'Tout au même endroit': 'Tudo em um só lugar', 'Sport, films, télévision et séries.': 'Esportes, filmes, TV e séries.',
      'À la une': 'Destaque', 'Football, films et télévision internationale': 'Futebol, filmes e TV internacional',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'Descubra conteúdo ao vivo e sob demanda em um só aplicativo.',
      'Tout': 'Tudo', 'Football': 'Futebol', 'Sport': 'Esportes', 'TV': 'TV', 'Film': 'Filme', 'Actualités': 'Notícias', 'En direct': 'Ao vivo', 'Série': 'Série',
      'Contenu disponible': 'Conteúdo disponível', 'Qualité adaptative': 'Qualidade adaptável', 'Installation directe': 'Instalação direta', 'Une expérience sans interruption': 'Uma experiência sem interrupções',
      'Toutes les catégories': 'Todas as categorias', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'Deslize horizontalmente para descobrir todo o conteúdo disponível no aplicativo.',
      'Football en direct': 'Futebol ao vivo', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'Campeonatos, jogos em destaque, análises e melhores momentos.',
      'Championnats': 'Campeonatos', 'Matchs en direct': 'Jogos ao vivo', 'Meilleurs moments': 'Melhores momentos',
      'Événements sportifs': 'Eventos esportivos', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'Lutas, corridas, torneios e grandes eventos pay-per-view.',
      'Combats': 'Lutas', 'Événements': 'Eventos', 'Nouveautés': 'Lançamentos', 'Action': 'Ação', 'Drame': 'Drama',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'Lançamentos, ação, drama e terror em uma ampla biblioteca.',
      'Chaînes TV du monde entier': 'Canais de TV do mundo inteiro', 'Chaînes internationales': 'Canais internacionais',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'Notícias, entretenimento, conteúdo infantil e canais ao vivo.',
      'TV en direct': 'TV ao vivo', 'Enfants': 'Infantil', 'Actualités en direct': 'Notícias ao vivo', 'Dernières nouvelles': 'Últimas notícias',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'Um destino completo para canais de notícias, últimas informações e TV internacional.',
      'Formats courts': 'Conteúdo curto', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'Vídeos, minisséries e episódios feitos para assistir no celular.',
      'Vidéos': 'Vídeos', 'Mini-séries': 'Minisséries', 'Épisodes': 'Episódios',
      'Films populaires': 'Filmes populares', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'Ação, super-heróis, drama e grandes clássicos prontos para assistir.',
      'Action · Thriller': 'Ação · Suspense', 'Super-héros · Science-fiction': 'Super-heróis · Ficção científica', 'Super-héros · Action': 'Super-heróis · Ação',
      'Drame · Classique': 'Drama · Clássico', 'Action · Fantastique': 'Ação · Fantasia', 'Aventure · Fantastique': 'Aventura · Fantasia', 'Action · Drame': 'Ação · Drama',
      'Films et séries à ne pas manquer': 'Filmes e séries imperdíveis', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'Filmes e séries populares para assistir quando quiser, sem anúncios e em um só aplicativo.',
      'Série · Drame policier': 'Série · Drama policial', 'Série · Mystère': 'Série · Mistério',
      'Tout dans une seule application': 'Tudo em um só aplicativo', 'Vos divertissements, à tout moment.': 'Seu entretenimento a qualquer hora.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'Futebol ao vivo, eventos esportivos, filmes populares, séries imperdíveis, canais internacionais e conteúdo curto em uma experiência rápida e sem anúncios.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'Ação, drama, super-heróis, aventura e grandes clássicos prontos para assistir.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'Filmes populares, histórias envolventes e séries completas, perfeitos para assistir no celular.',
      'Téléchargement direct': 'Download direto', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'Instale o APK e aproveite conteúdo sem anúncios gratuitamente.',
      'Installation rapide': 'Instalação rápida', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'Baixe o aplicativo, instale e comece a assistir em segundos.',
      'Télécharger': 'Baixar', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'Toque no botão para salvar o arquivo APK.',
      'Installer': 'Instalar', 'Ouvrez le fichier et autorisez l’installation.': 'Abra o arquivo e permita a instalação.',
      'Explorer': 'Explorar', 'Découvrez le football, les films, la télévision et les séries.': 'Descubra futebol, filmes, televisão e séries.',
      'Profiter': 'Aproveitar', 'Du contenu sans publicité ni abonnement.': 'Conteúdo sem anúncios ou assinatura.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Baixe o Lunelle e comece hoje.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'Todo o seu entretenimento em um aplicativo: filmes, séries, futebol, eventos esportivos e TV internacional.',
      '© 2026 Application Lunelle': '© 2026 Aplicativo Lunelle',
    },
    de: {
      'Accueil': 'Start', 'Catégories': 'Kategorien', 'Films': 'Filme', 'Séries': 'Serien', 'Installation': 'Installation',
      'Télécharger l’application': 'App herunterladen', 'Téléchargement direct pour Android': 'Direkter Download für Android',
      'Vos films, sports et chaînes TV préférés': 'Deine Lieblingsfilme, Sport & TV', 'Gratuit, sans frais': 'Kostenlos, ohne Gebühren',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'Genieße über 3.000 Live-Sender aus 130 Ländern. Fußball, Filme, Nachrichten und vieles mehr in HD – ohne Werbung oder Abos.',
      'Découvrir le contenu': 'Inhalte entdecken', 'Gratuit': 'Kostenlos', 'Aucun abonnement mensuel.': 'Kein monatliches Abo.',
      'Sans publicité': 'Werbefrei', 'Moins d’interruptions, plus de contenu.': 'Weniger Unterbrechungen, mehr Inhalte.',
      'Tout au même endroit': 'Alles an einem Ort', 'Sport, films, télévision et séries.': 'Sport, Filme, Fernsehen und Serien.',
      'À la une': 'Empfohlen', 'Football, films et télévision internationale': 'Fußball, Filme und internationales TV',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'Live- und On-Demand-Inhalte in einer App entdecken.',
      'Tout': 'Alles', 'Football': 'Fußball', 'Sport': 'Sport', 'TV': 'TV', 'Film': 'Film', 'Actualités': 'Nachrichten', 'En direct': 'Live', 'Série': 'Serie',
      'Contenu disponible': 'Inhalte verfügbar', 'Qualité adaptative': 'Adaptive Qualität', 'Installation directe': 'Direkte Installation', 'Une expérience sans interruption': 'Ein Erlebnis ohne Unterbrechung',
      'Toutes les catégories': 'Alle Kategorien', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'Horizontal wischen, um alle verfügbaren Inhalte zu entdecken.',
      'Football en direct': 'Live-Fußball', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'Ligen, Topspiele, Analysen und Highlights.',
      'Championnats': 'Ligen', 'Matchs en direct': 'Live-Spiele', 'Meilleurs moments': 'Highlights',
      'Événements sportifs': 'Sportevents', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'Kämpfe, Rennen, Turniere und große Pay-per-View-Events.',
      'Combats': 'Kämpfe', 'Événements': 'Events', 'Nouveautés': 'Neuheiten', 'Action': 'Action', 'Drame': 'Drama',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'Neuheiten, Action, Drama und Horror in einer großen Bibliothek.',
      'Chaînes TV du monde entier': 'TV-Sender weltweit', 'Chaînes internationales': 'Internationale Sender',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'Nachrichten, Unterhaltung, Kinderinhalte und Live-Sender.',
      'TV en direct': 'Live-TV', 'Enfants': 'Kinder', 'Actualités en direct': 'Live-Nachrichten', 'Dernières nouvelles': 'Aktuelle Nachrichten',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'Eine komplette Anlaufstelle für Nachrichtensender, aktuelle Meldungen und internationales Fernsehen.',
      'Formats courts': 'Kurzformate', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'Videos, Miniserien und Episoden für die mobile Wiedergabe.',
      'Vidéos': 'Videos', 'Mini-séries': 'Miniserien', 'Épisodes': 'Episoden',
      'Films populaires': 'Beliebte Filme', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'Action, Superhelden, Drama und große Klassiker zum sofortigen Ansehen.',
      'Action · Thriller': 'Action · Thriller', 'Super-héros · Science-fiction': 'Superhelden · Science-Fiction', 'Super-héros · Action': 'Superhelden · Action',
      'Drame · Classique': 'Drama · Klassiker', 'Action · Fantastique': 'Action · Fantasy', 'Aventure · Fantastique': 'Abenteuer · Fantasy', 'Action · Drame': 'Action · Drama',
      'Films et séries à ne pas manquer': 'Film- und Serien-Highlights', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'Beliebte Filme und Serien jederzeit, werbefrei und in einer App ansehen.',
      'Série · Drame policier': 'Serie · Krimidrama', 'Série · Mystère': 'Serie · Mystery',
      'Tout dans une seule application': 'Alles in einer App', 'Vos divertissements, à tout moment.': 'Ihre Unterhaltung, jederzeit.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'Live-Fußball, Sportevents, beliebte Filme, Serien-Highlights, internationale Sender und Kurzformate in einem schnellen, werbefreien Erlebnis.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'Action, Drama, Superhelden, Abenteuer und große Klassiker zum Ansehen.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'Beliebte Filme, fesselnde Geschichten und komplette Serien, ideal für unterwegs.',
      'Téléchargement direct': 'Direkter Download', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'APK installieren und kostenlose, werbefreie Inhalte genießen.',
      'Installation rapide': 'Schnelle Installation', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'App herunterladen, installieren und in Sekunden ansehen.',
      'Télécharger': 'Herunterladen', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'Tippen Sie auf die Schaltfläche, um die APK zu speichern.',
      'Installer': 'Installieren', 'Ouvrez le fichier et autorisez l’installation.': 'Datei öffnen und Installation zulassen.',
      'Explorer': 'Entdecken', 'Découvrez le football, les films, la télévision et les séries.': 'Fußball, Filme, Fernsehen und Serien entdecken.',
      'Profiter': 'Genießen', 'Du contenu sans publicité ni abonnement.': 'Inhalte ohne Werbung oder Abo.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Lunelle herunterladen und noch heute starten.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'Ihre gesamte Unterhaltung in einer App: Filme, Serien, Fußball, Sportevents und internationales TV.',
      '© 2026 Application Lunelle': '© 2026 Lunelle App',
    },
    it: {
      'Accueil': 'Home', 'Catégories': 'Categorie', 'Films': 'Film', 'Séries': 'Serie', 'Installation': 'Installazione',
      'Télécharger l’application': 'Scarica l’app', 'Téléchargement direct pour Android': 'Download diretto per Android',
      'Vos films, sports et chaînes TV préférés': 'I tuoi film, lo sport e la TV preferiti', 'Gratuit, sans frais': 'Gratis, senza costi',
      'Profitez de plus de 3 000 chaînes en direct dans 130 pays. Football, films, actualités et bien plus encore en HD, sans publicité ni abonnement.': 'Guarda oltre 3.000 canali in diretta da 130 Paesi. Calcio, film, notizie e molto altro in HD, senza pubblicità né abbonamenti.',
      'Découvrir le contenu': 'Scopri i contenuti', 'Gratuit': 'Gratis', 'Aucun abonnement mensuel.': 'Nessun abbonamento mensile.',
      'Sans publicité': 'Senza pubblicità', 'Moins d’interruptions, plus de contenu.': 'Meno interruzioni, più contenuti.',
      'Tout au même endroit': 'Tutto in un solo posto', 'Sport, films, télévision et séries.': 'Sport, film, TV e serie.',
      'À la une': 'In primo piano', 'Football, films et télévision internationale': 'Calcio, film e TV internazionale',
      'Découvrez le direct et le contenu à la demande dans une seule application.': 'Scopri contenuti in diretta e on demand in un’unica app.',
      'Tout': 'Tutto', 'Football': 'Calcio', 'Sport': 'Sport', 'TV': 'TV', 'Film': 'Film', 'Actualités': 'Notizie', 'En direct': 'In diretta', 'Série': 'Serie',
      'Contenu disponible': 'Contenuti disponibili', 'Qualité adaptative': 'Qualità adattiva', 'Installation directe': 'Installazione diretta', 'Une expérience sans interruption': 'Un’esperienza senza interruzioni',
      'Toutes les catégories': 'Tutte le categorie', 'Faites défiler horizontalement pour découvrir tous les contenus disponibles dans l’application.': 'Scorri orizzontalmente per scoprire tutti i contenuti disponibili nell’app.',
      'Football en direct': 'Calcio in diretta', 'Championnats, matchs à l’affiche, analyses et meilleurs moments.': 'Campionati, partite in primo piano, analisi e momenti migliori.',
      'Championnats': 'Campionati', 'Matchs en direct': 'Partite in diretta', 'Meilleurs moments': 'Momenti migliori',
      'Événements sportifs': 'Eventi sportivi', 'Combats, courses, tournois et grands événements en paiement à la séance.': 'Combattimenti, gare, tornei e grandi eventi pay-per-view.',
      'Combats': 'Combattimenti', 'Événements': 'Eventi', 'Nouveautés': 'Novità', 'Action': 'Azione', 'Drame': 'Dramma',
      'Nouveautés, action, drame et horreur dans une vaste bibliothèque.': 'Novità, azione, dramma e horror in una vasta libreria.',
      'Chaînes TV du monde entier': 'Canali TV da tutto il mondo', 'Chaînes internationales': 'Canali internazionali',
      'Actualités, divertissement, contenu pour enfants et chaînes en direct.': 'Notizie, intrattenimento, contenuti per bambini e canali in diretta.',
      'TV en direct': 'TV in diretta', 'Enfants': 'Bambini', 'Actualités en direct': 'Notizie in diretta', 'Dernières nouvelles': 'Ultime notizie',
      'Une destination complète pour les chaînes d’information, les dernières nouvelles et la télévision internationale.': 'Una destinazione completa per canali di informazione, ultime notizie e TV internazionale.',
      'Formats courts': 'Contenuti brevi', 'Vidéos, mini-séries et épisodes conçus pour être regardés sur mobile.': 'Video, miniserie ed episodi pensati per la visione su smartphone.',
      'Vidéos': 'Video', 'Mini-séries': 'Miniserie', 'Épisodes': 'Episodi',
      'Films populaires': 'Film popolari', 'Action, super-héros, drame et grands classiques dans une bibliothèque prête à regarder.': 'Azione, supereroi, dramma e grandi classici pronti da guardare.',
      'Action · Thriller': 'Azione · Thriller', 'Super-héros · Science-fiction': 'Supereroi · Fantascienza', 'Super-héros · Action': 'Supereroi · Azione',
      'Drame · Classique': 'Dramma · Classico', 'Action · Fantastique': 'Azione · Fantasy', 'Aventure · Fantastique': 'Avventura · Fantasy', 'Action · Drame': 'Azione · Dramma',
      'Films et séries à ne pas manquer': 'Film e serie da non perdere', 'Des films et des séries populaires à regarder quand vous le souhaitez, sans publicité, dans une seule application.': 'Film e serie popolari da guardare quando vuoi, senza pubblicità e in un’unica app.',
      'Série · Drame policier': 'Serie · Crime drama', 'Série · Mystère': 'Serie · Mistero',
      'Tout dans une seule application': 'Tutto in un’unica app', 'Vos divertissements, à tout moment.': 'Il tuo intrattenimento, in ogni momento.',
      'Football en direct, événements sportifs, films populaires, séries incontournables, chaînes internationales et formats courts, dans une expérience rapide et sans publicité.': 'Calcio in diretta, eventi sportivi, film popolari, serie imperdibili, canali internazionali e contenuti brevi in un’esperienza veloce e senza pubblicità.',
      'Action, drame, super-héros, aventure et grands classiques prêts à regarder.': 'Azione, dramma, supereroi, avventura e grandi classici pronti da guardare.',
      'Des films populaires, des histoires captivantes et des séries complètes, parfaits à regarder sur mobile.': 'Film popolari, storie coinvolgenti e serie complete, perfetti da guardare su smartphone.',
      'Téléchargement direct': 'Download diretto', 'Installez le fichier APK et profitez gratuitement d’un contenu sans publicité.': 'Installa l’APK e goditi gratis contenuti senza pubblicità.',
      'Installation rapide': 'Installazione rapida', 'Téléchargez l’application, installez-la et commencez à regarder en quelques secondes.': 'Scarica l’app, installala e inizia a guardare in pochi secondi.',
      'Télécharger': 'Scarica', 'Appuyez sur le bouton pour enregistrer le fichier APK.': 'Tocca il pulsante per salvare il file APK.',
      'Installer': 'Installa', 'Ouvrez le fichier et autorisez l’installation.': 'Apri il file e consenti l’installazione.',
      'Explorer': 'Esplora', 'Découvrez le football, les films, la télévision et les séries.': 'Scopri calcio, film, televisione e serie.',
      'Profiter': 'Divertiti', 'Du contenu sans publicité ni abonnement.': 'Contenuti senza pubblicità né abbonamento.',
      'Téléchargez Lunelle et commencez dès aujourd’hui.': 'Scarica Lunelle e inizia oggi.',
      'Tous vos divertissements dans une seule application : films, séries, football, événements sportifs et télévision internationale.': 'Tutto il tuo intrattenimento in un’app: film, serie, calcio, eventi sportivi e TV internazionale.',
      '© 2026 Application Lunelle': '© 2026 Applicazione Lunelle',
    }
  };

  const pagePhrases = {
    en: {
      'Histoires': 'Stories',
      'L’univers': 'Universe',
      'Chaque jour': 'Every day',
      '· gratuit · sur mobile': '· free · made for mobile',
      'Romance · Suspense': 'Romance · Suspense',
      'Histoires interdites': 'Forbidden stories',
      'Un secret peut tout changer.': 'A secret can change everything.',
      'Passion · Trahison': 'Passion · Betrayal',
      'Le pacte interdit': 'The forbidden pact',
      'L’amour est interdit, le désir est plus fort.': 'Love is forbidden, desire is stronger.',
      'Mystère · Romance': 'Mystery · Romance',
      'Derrière le silence': 'Behind the silence',
      'Chaque épisode révèle une vérité.': 'Every episode reveals a truth.',
      'Drame · Secrets': 'Drama · Secrets',
      'Nouvelle vie': 'New life',
      'Un choix peut changer toute une destinée.': 'One choice can change an entire destiny.',
      'Revanche · Drame': 'Revenge · Drama',
      'Pardon impossible': 'Impossible forgiveness',
      'Après la trahison, la revanche commence.': 'After the betrayal, revenge begins.'
    },
    es: {
      'Histoires': 'Historias',
      'L’univers': 'Universo',
      'L’univers ': 'El universo ',
      'Chaque jour': 'Cada día',
      'Short dramas · Nouveaux épisodes': 'Short dramas · Nuevos episodios',
      'Des histoires qui vous tiennent': 'Historias que te mantienen',
      'en haleine.': 'en vilo.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'Amor, secretos, traición y venganza. Episodios cortos para ver cuando quieras, con una historia nueva cada día.',
      'Regarder maintenant': 'Ver ahora',
      'Découvrir les histoires': 'Descubrir las historias',
      '1–3 min par épisode': '1–3 min por episodio',
      '· gratuit · sur mobile': '· gratis · en el móvil',
      'minutes par épisode': 'minutos por episodio',
      'histoires visuelles': 'historias visuales',
      'pensé pour le mobile': 'pensado para el móvil',
      'de nouveaux rebondissements': 'nuevos giros',
      'Les histoires': 'Historias del',
      'du moment': 'momento',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'Elige un ambiente, empieza un episodio y deja que la historia te lleve hasta el final.',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'Una historia intensa, decisiones imposibles y un episodio que te hace pulsar siguiente.',
      'Regardez à votre rythme.': 'Mira a tu ritmo.',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'Una interfaz pensada para pasar directo de la curiosidad al siguiente episodio.',
      'Des épisodes courts': 'Episodios cortos',
      'Parfaits pour une pause ou une soirée entière.': 'Perfectos para un descanso o una noche entera.',
      'Des émotions fortes': 'Emociones intensas',
      'Romance, drame, suspense et revanche.': 'Romance, drama, suspenso y venganza.',
      'Une histoire chaque jour': 'Una historia cada día',
      'Revenez pour découvrir la suite.': 'Vuelve para ver qué pasa después.',
      'Sur votre téléphone': 'En tu teléfono',
      'Ouvrez l’application et reprenez où vous voulez.': 'Abre la app y continúa donde estés.',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'Historias de deseo, confianza, pérdida y nuevos comienzos, contadas con imágenes impactantes.',
      'Commencez maintenant': 'Empieza ahora',
      'Votre prochaine histoire est déjà là.': 'Tu próxima historia ya está aquí.',
      'Essayez gratuitement.': 'Pruébalo gratis.',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'Descarga la app, elige una historia y empieza tu primer episodio en segundos.',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'Android · episodios cortos · historias nuevas con frecuencia',
      'Short dramas · Romance · Drame · Suspense': 'Short dramas · Romance · Drama · Suspenso',
      'Romance · Suspense': 'Romance · Suspenso',
      'Histoires interdites': 'Historias prohibidas',
      'Un secret peut tout changer.': 'Un secreto puede cambiarlo todo.',
      'Passion · Trahison': 'Pasión · Traición',
      'Le pacte interdit': 'El pacto prohibido',
      'L’amour est interdit, le désir est plus fort.': 'El amor está prohibido, el deseo es más fuerte.',
      'Mystère · Romance': 'Misterio · Romance',
      'Derrière le silence': 'Detrás del silencio',
      'Chaque épisode révèle une vérité.': 'Cada episodio revela una verdad.',
      'Drame · Secrets': 'Drama · Secretos',
      'Nouvelle vie': 'Nueva vida',
      'Un choix peut changer toute une destinée.': 'Una elección puede cambiar todo un destino.',
      'Revanche · Drame': 'Venganza · Drama',
      'Pardon impossible': 'Perdón imposible',
      'Après la trahison, la revanche commence.': 'Después de la traición, empieza la venganza.'
    },
    pt: {
      'Histoires': 'Histórias',
      'L’univers': 'Universo',
      'L’univers ': 'O universo ',
      'Chaque jour': 'Todo dia',
      'Short dramas · Nouveaux épisodes': 'Short dramas · Novos episódios',
      'Des histoires qui vous tiennent': 'Histórias que te deixam',
      'en haleine.': 'sem fôlego.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'Amor, segredos, traição e vingança. Episódios curtos para ver quando quiser, com uma nova história todos os dias.',
      'Regarder maintenant': 'Assistir agora',
      'Découvrir les histoires': 'Descobrir as histórias',
      '1–3 min par épisode': '1–3 min por episódio',
      '· gratuit · sur mobile': '· grátis · no celular',
      'minutes par épisode': 'minutos por episódio',
      'histoires visuelles': 'histórias visuais',
      'pensé pour le mobile': 'feito para o celular',
      'de nouveaux rebondissements': 'novas reviravoltas',
      'Les histoires': 'Histórias do',
      'du moment': 'momento',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'Escolha um clima, comece um episódio e deixe a história te levar até o fim.',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'Uma história intensa, escolhas impossíveis e um episódio que dá vontade de ver o próximo.',
      'Regardez à votre rythme.': 'Assista no seu ritmo.',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'Uma interface feita para ir direto da curiosidade ao próximo episódio.',
      'Des épisodes courts': 'Episódios curtos',
      'Parfaits pour une pause ou une soirée entière.': 'Perfeitos para uma pausa ou uma noite inteira.',
      'Des émotions fortes': 'Emoções fortes',
      'Romance, drame, suspense et revanche.': 'Romance, drama, suspense e vingança.',
      'Une histoire chaque jour': 'Uma história por dia',
      'Revenez pour découvrir la suite.': 'Volte para ver o que acontece.',
      'Sur votre téléphone': 'No seu celular',
      'Ouvrez l’application et reprenez où vous voulez.': 'Abra o app e continue de onde parou.',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'Histórias de desejo, confiança, perda e recomeços, contadas em imagens marcantes.',
      'Commencez maintenant': 'Comece agora',
      'Votre prochaine histoire est déjà là.': 'Sua próxima história já está aqui.',
      'Essayez gratuitement.': 'Experimente grátis.',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'Baixe o app, escolha uma história e comece seu primeiro episódio em segundos.',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'Android · episódios curtos · histórias novas com frequência',
      'Short dramas · Romance · Drame · Suspense': 'Short dramas · Romance · Drama · Suspense',
      'Romance · Suspense': 'Romance · Suspense',
      'Histoires interdites': 'Histórias proibidas',
      'Un secret peut tout changer.': 'Um segredo pode mudar tudo.',
      'Passion · Trahison': 'Paixão · Traição',
      'Le pacte interdit': 'O pacto proibido',
      'L’amour est interdit, le désir est plus fort.': 'O amor é proibido, o desejo é mais forte.',
      'Mystère · Romance': 'Mistério · Romance',
      'Derrière le silence': 'Por trás do silêncio',
      'Chaque épisode révèle une vérité.': 'Cada episódio revela uma verdade.',
      'Drame · Secrets': 'Drama · Segredos',
      'Nouvelle vie': 'Nova vida',
      'Un choix peut changer toute une destinée.': 'Uma escolha pode mudar um destino inteiro.',
      'Revanche · Drame': 'Vingança · Drama',
      'Pardon impossible': 'Perdão impossível',
      'Après la trahison, la revanche commence.': 'Depois da traição, a vingança começa.'
    },
    de: {
      'Histoires': 'Geschichten',
      'L’univers': 'Universum',
      'L’univers ': 'Das Universum ',
      'Chaque jour': 'Jeden Tag',
      'Short dramas · Nouveaux épisodes': 'Short Dramas · Neue Folgen',
      'Des histoires qui vous tiennent': 'Geschichten, die dich',
      'en haleine.': 'in Atem halten.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'Liebe, Geheimnisse, Verrat und Rache. Kurze Folgen, wann immer du willst, und jeden Tag eine neue Geschichte.',
      'Regarder maintenant': 'Jetzt ansehen',
      'Découvrir les histoires': 'Geschichten entdecken',
      '1–3 min par épisode': '1–3 Min. pro Folge',
      '· gratuit · sur mobile': '· kostenlos · fürs Handy',
      'minutes par épisode': 'Minuten pro Folge',
      'histoires visuelles': 'visuelle Geschichten',
      'pensé pour le mobile': 'fürs Handy gemacht',
      'de nouveaux rebondissements': 'neue Wendungen',
      'Les histoires': 'Geschichten des',
      'du moment': 'Augenblicks',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'Wähle eine Stimmung, starte eine Folge und lass dich von der Geschichte mitreißen.',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'Eine intensive Geschichte, unmögliche Entscheidungen und eine Folge, nach der du sofort die nächste startest.',
      'Regardez à votre rythme.': 'Schau in deinem Tempo.',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'Eine Oberfläche, die dich direkt von der Neugier zur nächsten Folge bringt.',
      'Des épisodes courts': 'Kurze Folgen',
      'Parfaits pour une pause ou une soirée entière.': 'Perfekt für eine Pause oder einen ganzen Abend.',
      'Des émotions fortes': 'Starke Gefühle',
      'Romance, drame, suspense et revanche.': 'Romantik, Drama, Spannung und Rache.',
      'Une histoire chaque jour': 'Jeden Tag eine Geschichte',
      'Revenez pour découvrir la suite.': 'Komm zurück und sieh, wie es weitergeht.',
      'Sur votre téléphone': 'Auf deinem Handy',
      'Ouvrez l’application et reprenez où vous voulez.': 'Öffne die App und mach weiter, wo du bist.',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'Geschichten über Verlangen, Vertrauen, Verlust und Neuanfänge, erzählt in starken Bildern.',
      'Commencez maintenant': 'Jetzt starten',
      'Votre prochaine histoire est déjà là.': 'Deine nächste Geschichte ist schon da.',
      'Essayez gratuitement.': 'Kostenlos testen.',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'Lade die App herunter, wähle eine Geschichte und starte deine erste Folge in Sekunden.',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'Android · kurze Folgen · regelmäßig neue Geschichten',
      'Short dramas · Romance · Drame · Suspense': 'Short Dramas · Romantik · Drama · Spannung',
      'Romance · Suspense': 'Romantik · Spannung',
      'Histoires interdites': 'Verbotene Geschichten',
      'Un secret peut tout changer.': 'Ein Geheimnis kann alles verändern.',
      'Passion · Trahison': 'Leidenschaft · Verrat',
      'Le pacte interdit': 'Der verbotene Pakt',
      'L’amour est interdit, le désir est plus fort.': 'Liebe ist verboten, das Verlangen ist stärker.',
      'Mystère · Romance': 'Geheimnis · Romantik',
      'Derrière le silence': 'Hinter dem Schweigen',
      'Chaque épisode révèle une vérité.': 'Jede Folge enthüllt eine Wahrheit.',
      'Drame · Secrets': 'Drama · Geheimnisse',
      'Nouvelle vie': 'Neues Leben',
      'Un choix peut changer toute une destinée.': 'Eine Entscheidung kann ein ganzes Schicksal ändern.',
      'Revanche · Drame': 'Rache · Drama',
      'Pardon impossible': 'Unmögliche Vergebung',
      'Après la trahison, la revanche commence.': 'Nach dem Verrat beginnt die Rache.'
    },
    it: {
      'Histoires': 'Storie',
      'L’univers': 'Universo',
      'L’univers ': 'L’universo ',
      'Chaque jour': 'Ogni giorno',
      'Short dramas · Nouveaux épisodes': 'Short drama · Nuovi episodi',
      'Des histoires qui vous tiennent': 'Storie che ti tengono',
      'en haleine.': 'col fiato sospeso.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'Amore, segreti, tradimento e vendetta. Episodi brevi da guardare quando vuoi, con una nuova storia ogni giorno.',
      'Regarder maintenant': 'Guarda ora',
      'Découvrir les histoires': 'Scopri le storie',
      '1–3 min par épisode': '1–3 min a episodio',
      '· gratuit · sur mobile': '· gratis · sul cellulare',
      'minutes par épisode': 'minuti a episodio',
      'histoires visuelles': 'storie visive',
      'pensé pour le mobile': 'pensato per il cellulare',
      'de nouveaux rebondissements': 'nuovi colpi di scena',
      'Les histoires': 'Storie del',
      'du moment': 'momento',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'Scegli un’atmosfera, avvia un episodio e lasciati trasportare dalla storia.',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'Una storia intensa, scelte impossibili e un episodio che ti fa premere avanti.',
      'Regardez à votre rythme.': 'Guarda al tuo ritmo.',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'Un’interfaccia pensata per passare subito dalla curiosità all’episodio successivo.',
      'Des épisodes courts': 'Episodi brevi',
      'Parfaits pour une pause ou une soirée entière.': 'Perfetti per una pausa o un’intera serata.',
      'Des émotions fortes': 'Emozioni forti',
      'Romance, drame, suspense et revanche.': 'Romance, dramma, suspense e vendetta.',
      'Une histoire chaque jour': 'Una storia ogni giorno',
      'Revenez pour découvrir la suite.': 'Torna per scoprire il seguito.',
      'Sur votre téléphone': 'Sul tuo telefono',
      'Ouvrez l’application et reprenez où vous voulez.': 'Apri l’app e riprendi da dove vuoi.',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'Storie di desiderio, fiducia, perdita e nuovi inizi, raccontate con immagini intense.',
      'Commencez maintenant': 'Inizia ora',
      'Votre prochaine histoire est déjà là.': 'La tua prossima storia è già qui.',
      'Essayez gratuitement.': 'Provalo gratis.',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'Scarica l’app, scegli una storia e inizia il primo episodio in pochi secondi.',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'Android · episodi brevi · storie nuove di continuo',
      'Short dramas · Romance · Drame · Suspense': 'Short drama · Romance · Dramma · Suspense',
      'Romance · Suspense': 'Romance · Suspense',
      'Histoires interdites': 'Storie proibite',
      'Un secret peut tout changer.': 'Un segreto può cambiare tutto.',
      'Passion · Trahison': 'Passione · Tradimento',
      'Le pacte interdit': 'Il patto proibito',
      'L’amour est interdit, le désir est plus fort.': 'L’amore è proibito, il desiderio è più forte.',
      'Mystère · Romance': 'Mistero · Romance',
      'Derrière le silence': 'Dietro il silenzio',
      'Chaque épisode révèle une vérité.': 'Ogni episodio rivela una verità.',
      'Drame · Secrets': 'Dramma · Segreti',
      'Nouvelle vie': 'Nuova vita',
      'Un choix peut changer toute une destinée.': 'Una scelta può cambiare un intero destino.',
      'Revanche · Drame': 'Vendetta · Dramma',
      'Pardon impossible': 'Perdono impossibile',
      'Après la trahison, la revanche commence.': 'Dopo il tradimento, inizia la vendetta.'
    },
    ar: {
      'Histoires': 'القصص',
      'L’univers': 'العالم',
      'L’univers ': 'عالم ',
      'Chaque jour': 'كل يوم',
      'Short dramas · Nouveaux épisodes': 'دراما قصيرة · حلقات جديدة',
      'Des histoires qui vous tiennent': 'قصص تُبقيك',
      'en haleine.': 'على حافة مقعدك.',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'حب وأسرار وخيانة وانتقام. حلقات قصيرة تشاهدها متى شئت، مع قصة جديدة كل يوم.',
      'Regarder maintenant': 'شاهد الآن',
      'Découvrir les histoires': 'اكتشف القصص',
      '1–3 min par épisode': '١–٣ دقائق لكل حلقة',
      '· gratuit · sur mobile': '· مجاني · على الهاتف',
      'minutes par épisode': 'دقائق لكل حلقة',
      'histoires visuelles': 'قصص مرئية',
      'pensé pour le mobile': 'مصمم للهاتف',
      'de nouveaux rebondissements': 'منعطفات جديدة',
      'Les histoires': 'قصص',
      'du moment': 'اللحظة',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'اختر أجواء، ابدأ حلقة ودع القصة تأخذك حتى النهاية.',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'قصة قوية وخيارات مستحيلة وحلقة تدفعك للتي بعدها.',
      'Regardez à votre rythme.': 'شاهد بالسرعة التي تناسبك.',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'واجهة تأخذك مباشرة من الفضول إلى الحلقة التالية.',
      'Des épisodes courts': 'حلقات قصيرة',
      'Parfaits pour une pause ou une soirée entière.': 'مناسبة لاستراحة سريعة أو لسهرة كاملة.',
      'Des émotions fortes': 'مشاعر قوية',
      'Romance, drame, suspense et revanche.': 'رومانسية ودراما وتشويق وانتقام.',
      'Une histoire chaque jour': 'قصة كل يوم',
      'Revenez pour découvrir la suite.': 'عُد لتعرف ماذا يحدث بعد ذلك.',
      'Sur votre téléphone': 'على هاتفك',
      'Ouvrez l’application et reprenez où vous voulez.': 'افتح التطبيق وتابع من حيث أنت.',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'قصص عن الرغبة والثقة والفقدان والبدايات الجديدة، تُروى بصور لافتة.',
      'Commencez maintenant': 'ابدأ الآن',
      'Votre prochaine histoire est déjà là.': 'قصتك التالية هنا بالفعل.',
      'Essayez gratuitement.': 'جرّبه مجاناً.',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'نزّل التطبيق، اختر قصة وابدأ حلقتك الأولى خلال ثوانٍ.',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'أندرويد · حلقات قصيرة · قصص جديدة باستمرار',
      'Short dramas · Romance · Drame · Suspense': 'دراما قصيرة · رومانسية · دراما · تشويق',
      'Romance · Suspense': 'رومانسية · تشويق',
      'Histoires interdites': 'قصص ممنوعة',
      'Un secret peut tout changer.': 'سرّ واحد قد يغيّر كل شيء.',
      'Passion · Trahison': 'شغف · خيانة',
      'Le pacte interdit': 'العهد الممنوع',
      'L’amour est interdit, le désir est plus fort.': 'الحب ممنوع، والرغبة أقوى.',
      'Mystère · Romance': 'غموض · رومانسية',
      'Derrière le silence': 'خلف الصمت',
      'Chaque épisode révèle une vérité.': 'كل حلقة تكشف حقيقة.',
      'Drame · Secrets': 'دراما · أسرار',
      'Nouvelle vie': 'حياة جديدة',
      'Un choix peut changer toute une destinée.': 'اختيار واحد قد يغيّر مصيراً بأكمله.',
      'Revanche · Drame': 'انتقام · دراما',
      'Pardon impossible': 'غفران مستحيل',
      'Après la trahison, la revanche commence.': 'بعد الخيانة، يبدأ الانتقام.'
    },
    ne: {
      'Histoires': 'कथाहरू',
      'L’univers': 'विश्व',
      'L’univers ': 'विश्व ',
      'Short dramas · Nouveaux épisodes': 'छोटा नाटक · नयाँ एपिसोड',
      'Des histoires qui vous tiennent': 'कथाहरू जसले तपाईंलाई',
      'Amour, secrets, trahisons et revanche. Des épisodes courts à regarder quand l’envie vous prend, avec une nouvelle histoire à découvrir chaque jour.': 'प्रेम, रहस्य, विश्वासघात र बदला। जहिले पनि हेर्न मिल्ने छोटा एपिसोड, र हरेक दिन नयाँ कथा।',
      'Regarder maintenant': 'अहिले हेर्नुहोस्',
      '1–3 min par épisode': 'प्रति एपिसोड १–३ मिनेट',
      '· gratuit · sur mobile': '· निःशुल्क · मोबाइलमा',
      'minutes par épisode': 'मिनेट प्रति एपिसोड',
      'histoires visuelles': 'दृश्य कथाहरू',
      'pensé pour le mobile': 'मोबाइलका लागि',
      'de nouveaux rebondissements': 'नयाँ मोडहरू',
      'Les histoires': 'अहिलेका',
      'du moment': 'कथाहरू',
      'Choisissez une ambiance, lancez un épisode et laissez l’histoire vous emmener jusqu’au bout.': 'मूड छान्नुहोस्, एपिसोड सुरु गर्नुहोस् र कथाले तपाईंलाई अन्त्यसम्म लैजाओस्।',
      'Une histoire intense, des choix impossibles et un épisode qui donne envie de lancer le suivant.': 'तीव्र कथा, असम्भव छनोट र अर्को एपिसोड थिच्न मन लाग्ने क्षण।',
      'Regardez à votre rythme.': 'आफ्नै गतिमा हेर्नुहोस्।',
      'Une interface pensée pour passer directement de l’envie à l’épisode, sans détour.': 'जिज्ञासाबाट सिधै अर्को एपिसोडमा लैजाने इन्टरफेस।',
      'Des épisodes courts': 'छोटा एपिसोड',
      'Parfaits pour une pause ou une soirée entière.': 'छोटो विश्राम वा पूरै साँझका लागि।',
      'Des émotions fortes': 'तीव्र भावना',
      'Romance, drame, suspense et revanche.': 'प्रेम, नाटक, सस्पेन्स र बदला।',
      'Une histoire chaque jour': 'हरेक दिन एउटा कथा',
      'Revenez pour découvrir la suite.': 'अर्को के हुन्छ भनेर फर्कनुहोस्।',
      'Sur votre téléphone': 'तपाईंको फोनमा',
      'Ouvrez l’application et reprenez où vous voulez.': 'एप खोलेर जहाँ छाडेको थियो त्यहीँबाट जारी राख्नुहोस्।',
      'Des histoires de désir, de confiance, de perte et de nouveaux départs, racontées en images.': 'इच्छा, विश्वास, हानि र नयाँ सुरुवातका कथा, प्रभावशाली दृश्यमा।',
      'Commencez maintenant': 'अहिले सुरु गर्नुहोस्',
      'Votre prochaine histoire est déjà là.': 'तपाईंको अर्को कथा पहिले नै यहाँ छ।',
      'Essayez gratuitement.': 'निःशुल्क प्रयास गर्नुहोस्।',
      'Téléchargez l’application, choisissez une histoire et lancez votre premier épisode en quelques secondes.': 'एप डाउनलोड गर्नुहोस्, कथा छान्नुहोस् र केही सेकेन्डमै पहिलो एपिसोड सुरु गर्नुहोस्।',
      'Android · épisodes courts · nouveaux contenus régulièrement': 'एन्ड्रोइड · छोटा एपिसोड · नियमित नयाँ कथा',
      'Short dramas · Romance · Drame · Suspense': 'छोटा नाटक · प्रेम · नाटक · सस्पेन्स',
      'Romance · Suspense': 'प्रेम · सस्पेन्स',
      'Passion · Trahison': 'आकर्षण · विश्वासघात',
      'L’amour est interdit, le désir est plus fort.': 'प्रेम निषेधित छ, चाहना अझ बलियो छ।',
      'Mystère · Romance': 'रहस्य · प्रेमकथा',
      'Chaque épisode révèle une vérité.': 'हरेक एपिसोडले एउटा सत्य खोल्छ।',
      'Drame · Secrets': 'नाटक · रहस्य',
      'Revanche · Drame': 'बदला · नाटक'
    }
  };
  Object.keys(pagePhrases).forEach(function (language) {
    Object.assign(dictionaries[language], pagePhrases[language]);
  });
  const englishToFrench = {};
  Object.keys(dictionaries.en).sort(function (a, b) { return b.length - a.length; }).forEach(function (french) {
    const english = dictionaries.en[french];
    if (typeof english === 'string' && english && !Object.prototype.hasOwnProperty.call(englishToFrench, english)) {
      englishToFrench[english] = french;
    }
  });

  const pageMeta = {
    fr: ['Lunelle | Des short dramas intenses, gratuitement', 'Découvrez des short dramas intenses, de nouveaux épisodes et des histoires à regarder sur mobile.'],
    ar: ['Lunelle | أفلامك ورياضاتك وقنواتك التلفزيونية المفضلة مجاناً', 'استمتع بأكثر من 3,000 قناة مباشرة من 130 دولة. كرة القدم والأفلام والأخبار وغير ذلك الكثير بجودة HD، من دون إعلانات أو اشتراكات.'],
    en: ['Lunelle | Intense short dramas, free to watch', 'Discover intense short dramas, new episodes and stories made for mobile viewing.'],
    es: ['Lunelle | Short dramas intensos, gratis', 'Descubre short dramas intensos, nuevos episodios e historias para ver en tu móvil.'],
    pt: ['Lunelle | Short dramas intensos, grátis', 'Descubra short dramas intensos, novos episódios e histórias para assistir no celular.'],
    de: ['Lunelle | Intensive Short Dramas, kostenlos', 'Entdecke intensive Short Dramas, neue Episoden und Geschichten für dein Smartphone.'],
    it: ['Lunelle | Short drama intensi, gratis', 'Scopri short drama intensi, nuovi episodi e storie da guardare sul tuo smartphone.'],
    ne: ['Lunelle | रोमाञ्चक छोटा नाटकहरू निःशुल्क हेर्नुहोस्', 'पाँच छोटा र रोमाञ्चक कथा हेर्नुहोस्—निषेधित प्रेम, रहस्य, विश्वासघात र बदलाका नयाँ एपिसोडहरू जुनसुकै बेला।']
  };

  const countryNames = {
    fr: {DZ:'Algérie', ES:'Espagne', CI:'Côte d’Ivoire', BO:'Bolivie', MX:'Mexique'},
    ar: {DZ:'الجزائر', ES:'إسبانيا', CI:'ساحل العاج', BO:'بوليفيا', MX:'المكسيك'},
    en: {DZ:'Algeria', ES:'Spain', CI:'Côte d’Ivoire', BO:'Bolivia', MX:'Mexico'},
    es: {DZ:'Argelia', ES:'España', CI:'Costa de Marfil', BO:'Bolivia', MX:'México'},
    pt: {DZ:'Argélia', ES:'Espanha', CI:'Costa do Marfim', BO:'Bolívia', MX:'México'},
    de: {DZ:'Algerien', ES:'Spanien', CI:'Elfenbeinküste', BO:'Bolivien', MX:'Mexiko'},
    it: {DZ:'Algeria', ES:'Spagna', CI:'Costa d’Avorio', BO:'Bolivia', MX:'Messico'},
    ne: {DZ:'अल्जेरिया', ES:'स्पेन', CI:'आइभरी कोस्ट', BO:'बोलिभिया', MX:'मेक्सिको'}
  };

  const marketBadgeTemplates = {
    fr: (name) => name ? `Sélection pour ${name} · Android` : 'Téléchargement direct pour Android',
    ar: (name) => name ? `مختارات ${name} · أندرويد` : 'تنزيل مباشر لأندرويد',
    en: (name) => name ? `Selected for ${name} · Android` : 'Direct download for Android',
    es: (name) => name ? `Selección para ${name} · Android` : 'Descarga directa para Android',
    pt: (name) => name ? `Seleção para ${name} · Android` : 'Download direto para Android',
    de: (name) => name ? `Auswahl für ${name} · Android` : 'Direkter Download für Android',
    it: (name) => name ? `Selezione per ${name} · Android` : 'Download diretto per Android',
    ne: (name) => name ? `${name} का लागि चयन · Android` : 'Android का लागि सीधा डाउनलोड'
  };

  const directCountryLanguage = {
    DZ:'fr', CI:'fr', FR:'fr', SN:'fr', CM:'fr', MA:'fr', TN:'fr', BE:'fr',
    ES:'es', BO:'es', MX:'es', AR:'es', CL:'es', CO:'es', PE:'es', VE:'es', EC:'es', PY:'es', UY:'es', CR:'es', PA:'es', GT:'es', HN:'es', SV:'es', NI:'es', DO:'es', CU:'es',
    BR:'pt', PT:'pt', AO:'pt', MZ:'pt',
    DE:'de', AT:'de', CH:'de',
    IT:'it', NP:'ne',
    US:'en', GB:'en', CA:'en', AU:'en', NZ:'en', IE:'en'
  };

  const arabicCountries = new Set(['AE','BH','DJ','EG','IQ','JO','KW','LB','LY','MR','OM','PS','QA','SA','SD','SO','SY','YE']);
  const targetCountries = new Set(['DZ','ES','CI','BO','MX']);
  let currentLanguage = 'fr';
  let currentCountry = '';
  let manualLanguageSelected = false;

  function normalizeLanguage(value) {
    const language = String(value || '').toLowerCase().split('-')[0];
    return SUPPORTED_LANGUAGES.includes(language) ? language : 'en';
  }

  function rememberOriginalText(node) {
    if (typeof node.__vyroOriginalText !== 'string') node.__vyroOriginalText = node.nodeValue;
    return node.__vyroOriginalText;
  }

  function frenchSource(text) {
    const key = text.trim();
    if (Object.prototype.hasOwnProperty.call(dictionaries.en, key)) return key;
    if (Object.prototype.hasOwnProperty.call(englishToFrench, key)) return englishToFrench[key];
    return key;
  }

  function replaceTextNode(node, language) {
    const original = rememberOriginalText(node);
    const french = frenchSource(original);
    let replacement = french;
    if (language !== 'fr') {
      const dictionary = dictionaries[language] || dictionaries.en;
      if (Object.prototype.hasOwnProperty.call(dictionary, french)) replacement = dictionary[french];
      else if (Object.prototype.hasOwnProperty.call(dictionaries.en, french)) replacement = dictionaries.en[french];
    }
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    node.nodeValue = leading + replacement + trailing;
  }

  function translateVisibleText(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT','STYLE','OPTION'].includes(parent.tagName) || parent.closest('.brand')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => replaceTextNode(node, language));
  }

  function updateMarketBadge() {
    const badge = document.querySelector('.hero-copy .badge');
    if (!badge) return;
    const name = targetCountries.has(currentCountry) ? (countryNames[currentLanguage][currentCountry] || '') : '';
    badge.textContent = marketBadgeTemplates[currentLanguage](name);
  }

  function applyLanguage(language, options = {}) {
    currentLanguage = normalizeLanguage(language);
    document.documentElement.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('is-rtl', currentLanguage === 'ar');
    translateVisibleText(currentLanguage);
    document.title = pageMeta[currentLanguage][0];
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = pageMeta[currentLanguage][1];
    const selector = document.getElementById('language-select');
    if (selector) selector.value = currentLanguage;
    updateMarketBadge();
    if (options.remember) {
      localStorage.setItem(STORAGE_KEY, currentLanguage);
      manualLanguageSelected = true;
    }
  }

  function applyMarketOrder(country) {
    currentCountry = String(country || '').toUpperCase();
    document.body.dataset.country = currentCountry || 'unknown';
    document.querySelectorAll('a[data-download="apk"]').forEach((link) => {
      try {
        const url = new URL(link.href, window.location.href);
        if (/^[A-Z]{2}$/.test(currentCountry)) url.searchParams.set('_country', currentCountry);
        else url.searchParams.delete('_country');
        link.href = url.href;
      } catch (_) {}
    });
    const carousel = document.querySelector('#categories .carousel');
    if (carousel) {
      const latinOrder = ['movies','football','sports','tv','news','shorts'];
      const francophoneOrder = ['football','sports','tv','news','movies','shorts'];
      const order = ['ES','BO','MX'].includes(currentCountry) ? latinOrder : francophoneOrder;
      order.forEach((category) => {
        const card = carousel.querySelector(`[data-category="${category}"]`);
        if (card) carousel.appendChild(card);
      });
    }
    updateMarketBadge();
  }

  function applyMarketGallery(country) {
    const gallery = document.querySelector('[data-market-gallery]');
    if (!gallery) return;
    const code = String(country || '').toUpperCase();
    const market = code === 'NP' ? 'np' : (code === 'DZ' ? 'dz' : 'all');
    gallery.classList.toggle('market-filtered', market !== 'all');
    gallery.querySelectorAll('[data-market]').forEach((card) => {
      card.classList.toggle('market-visible', market === 'all' || card.dataset.market === market);
    });
  }

  function languageForCountry(country) {
    const code = String(country || '').toUpperCase();
    if (arabicCountries.has(code)) return 'ar';
    return directCountryLanguage[code] || '';
  }

  async function fetchJsonWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {signal: controller.signal, cache: 'no-store', credentials: url.startsWith('http') ? 'omit' : 'same-origin'});
      if (!response.ok) return null;
      return await response.json();
    } catch (_) {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function detectCountry() {
    const localGeo = await fetchJsonWithTimeout('geo.php', 1200);
    if (localGeo && /^[A-Z]{2}$/i.test(localGeo.country || '')) return localGeo.country.toUpperCase();
    return '';
  }

  function prepareImages() {
    document.querySelectorAll('img').forEach((image) => {
      if (image.width === 1 || image.height === 1) return;
      image.decoding = 'async';
      if (!image.closest('.hero-img') && !image.closest('.brand')) image.loading = 'lazy';
    });
    const hero = document.querySelector('.hero-img img');
    if (hero) {
      hero.loading = 'eager';
      hero.fetchPriority = 'high';
    }
  }

  function initializeSelector() {
    const selector = document.getElementById('language-select');
    if (!selector) return;
    selector.addEventListener('change', () => applyLanguage(selector.value, {remember: true}));
  }

  async function initializeLocalization() {
    prepareImages();
    initializeSelector();
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      manualLanguageSelected = true;
      applyLanguage(savedLanguage);
    } else {
      applyLanguage(normalizeLanguage(navigator.language || 'en'));
    }

    const country = await detectCountry();
    applyMarketOrder(country);
    applyMarketGallery(country);
    if (!manualLanguageSelected) {
      const countryLanguage = languageForCountry(country);
      if (countryLanguage) applyLanguage(countryLanguage);
    }
  }

  document.addEventListener('DOMContentLoaded', initializeLocalization);
})();
